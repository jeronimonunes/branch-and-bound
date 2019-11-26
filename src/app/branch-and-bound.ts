import { ParserOutput } from './parser/parser-output';
import { Edge, Node, Network, DataSet } from 'vis-network';
import { interval, animationFrameScheduler, of, forkJoin, Observable, throwError } from 'rxjs';
import { map, switchMap, mapTo, finalize } from 'rxjs/operators';
import { getSpinnerImageOnTime } from './spinner';
import { evaluate } from './simplex';
import { Result } from 'src/native/simplex';
import { createSolutionElement, ZERO, ONE, cnf, genVar, NEG, never } from './util';

declare var BigInt: (v: string | number) => bigint;
if (typeof (BigInt) === undefined) {
  BigInt = (v) => parseInt(v as string, 10) as any as bigint;
}

export function branchAndBound(problem: ParserOutput, network: Network) {
  const nodes = new DataSet<Node>([{
    id: '1',
    label: 'Subproblem #1'
  }]);
  const edges = new DataSet<Edge>();
  network.setData({ nodes, edges });
  const animating = interval(0, animationFrameScheduler).pipe(
    map(() => animationFrameScheduler.now()),
    map(getSpinnerImageOnTime)
  ).subscribe(svg => {
    nodes.forEach(item => {
      item.image = svg;
      nodes.update(item);
    });
  });
  if (problem.annotations || problem.error) {
    animating.unsubscribe();
    return of(problem);
  } else {
    return evaluate(problem).pipe(
      switchMap(res => whenResult(problem, res, nodes, edges, '1')),
      finalize(() => animating.unsubscribe())
    );
  }
}

function whenResult(problem: ParserOutput, res: Result, nodes: DataSet<Node>, edges: DataSet<Edge>, id: string): Observable<null> {
  switch (res.type) {
    case 'ILIMITED':
    case 'INFEASIBLE':
      nodes.update({
        id,
        label: 'Subproblem #' + id + '\n' + res.type,
        shape: 'circle'
      });
      return of(null);
    case 'LIMITED':
      const fracIdx = res.solution.findIndex(({ denominator }) => denominator !== '1');
      const value = res.value.denominator === '1' ? res.value.numerator : (res.value.numerator + '/' + res.value.denominator);
      nodes.update({
        id,
        label: 'Subproblem #' + id + '\n' +
          (fracIdx !== -1 ? 'fractional' : 'integer') +
          '\nvalue: ' + value,
        shape: 'circle',
        title: createSolutionElement(res.solution) as any
      });
      if (fracIdx !== -1) {
        return addSubproblems(problem, res, nodes, edges, id, fracIdx);
      }
      return of(null);
    default:
      try {
        never(res.type);
        return of(null);
      } catch (e) {
        return throwError(e);
      }
  }
}

// tslint:disable-next-line: max-line-length
function addSubproblems(problem: ParserOutput, pres: Result, nodes: DataSet<Node>, edges: DataSet<Edge>, parentId: string, fracIdx: number): Observable<null> {
  const numerator = BigInt(pres.solution[fracIdx].numerator);
  const denominator = BigInt(pres.solution[fracIdx].denominator);
  let integer = numerator / denominator;
  if (typeof (integer) === 'number') { // for browsers without bigint
    integer = Math.floor(integer) as any;
  }
  const left = (() => {
    const id = parentId + '.1';
    nodes.add({
      id,
      label: 'Subproblem #' + id,
      title: 'Subproblem #' + id
    });
    edges.add({
      from: parentId,
      label: problem.vars[fracIdx] + ' <= ' + integer,
      to: id
    });

    // construct subproblem
    const A = [
      ...pres.state.A.map(line => [...line, ZERO]),
      [...pres.state.C.map((_, idx) => idx === fracIdx ? ONE : ZERO), ONE],
    ];
    const B = [
      ...pres.state.B,
      cnf('' + integer, '1')
    ];
    const C = [
      ...pres.state.C,
      ZERO
    ];
    const vars = [
      ...problem.vars,
      genVar(problem)
    ];
    return evaluate({ A, B, C, vars }).pipe(
      switchMap(res => whenResult(problem, res, nodes, edges, id))
    );
  })();
  const right = (() => {
    const id = parentId + '.2';
    nodes.add({
      id,
      label: 'Subproblem #' + id,
      title: 'Subproblem #' + id
    });
    edges.add({
      from: parentId,
      label: problem.vars[fracIdx] + ' >= ' + integer,
      to: id
    });

    // construct subproblem
    const A = [
      ...pres.state.A.map(line => [...line, ZERO]),
      [...pres.state.C.map((_, idx) => idx === fracIdx ? ONE : ZERO), NEG],
    ];
    const B = [
      ...pres.state.B,
      cnf('' + (integer + BigInt(1)), '1')
    ];
    const C = [
      ...pres.state.C,
      ZERO
    ];
    const vars = [
      ...problem.vars,
      genVar(problem)
    ];
    return evaluate({ A, B, C, vars }).pipe(
      switchMap(res => whenResult(problem, res, nodes, edges, id))
    );
  })();
  return forkJoin([
    left,
    right
  ]).pipe(mapTo(null));
}
