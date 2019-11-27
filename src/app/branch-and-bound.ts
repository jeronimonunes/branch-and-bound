import { Edge, Node, Network, DataSet } from 'vis-network';
import { interval, animationFrameScheduler, of, forkJoin, Observable, throwError } from 'rxjs';
import { map, switchMap, mapTo, finalize } from 'rxjs/operators';
import { getSpinnerImageOnTime } from './spinner';
import { evaluate, evaluatePL } from './simplex';
import { Result } from 'src/native/simplex';
import { createSolutionElement, ZERO, ONE, cnf, genVar, NEG, never } from './util';
import { parse, SyntaxError, ProgLin } from 'linear-program-parser';

declare var BigInt: (v: string | number) => bigint;
if (typeof (BigInt) === undefined) {
  BigInt = (v) => parseInt(v as string, 10) as any as bigint;
}

export function branchAndBound(problem: string, network: Network) {
  const optimal = {
    node: '',
    value: Number.NEGATIVE_INFINITY
  };
  // creates a new graph
  const nodes = new DataSet<Node>([{
    id: '1',
    label: 'Subproblem #1'
  }]);
  const edges = new DataSet<Edge>();
  network.setData({ nodes, edges });

  // focus on the first node
  setTimeout(() => {
    const vrect = ((network as any).body.container as HTMLDivElement).getBoundingClientRect();
    network.focus('1', {
      scale: 1,
      locked: true,
      offset: {
        x: 0,
        y: 83 - vrect.height / 2
      }
    });
  });

  // shows a loading animation if the PL is slow to compute
  const animating = interval(0, animationFrameScheduler).pipe(
    map(() => animationFrameScheduler.now()),
    map(getSpinnerImageOnTime)
  ).subscribe(svg => {
    nodes.forEach(item => {
      item.image = svg;
      nodes.update(item);
    });
  });


  try {
    // solve the first linear relaxation
    const opl = parse(problem);
    const fpi = opl.toFPI();
    const ovars = fpi.objective.getVars();

    return evaluatePL(fpi).pipe(
      switchMap(res => whenResult(optimal, opl, ovars, res, nodes, edges, '1')),
      finalize(() => animating.unsubscribe()),
      mapTo({ optimal, annotations: undefined, error: undefined })
    );
  } catch (e) {
    animating.unsubscribe();
    if (e instanceof SyntaxError) {
      return of({
        error: undefined,
        optimal,
        annotations: [{
          column: e.location.start.column - 1,
          row: e.location.start.line - 1,
          text: e.message,
          type: 'error'
        }]
      });
    } else {
      return of({ error: e.message, annotations: undefined, optimal });
    }
  }
}

function whenResult(
  optimal: { value: number, node: string },
  pl: ProgLin,
  ovars: Set<string>,
  res: Result,
  nodes: DataSet<Node>,
  edges: DataSet<Edge>,
  id: string
): Observable<null> {
  // if (id.length > 10) {
  //   return of(null);
  // }
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
      const fracIdx = res.solution.findIndex(({ denominator }, idx) => ovars.has(res.vars[idx]) && denominator !== '1');
      const value = res.value.denominator === '1' ? res.value.numerator : (res.value.numerator + '/' + res.value.denominator);
      const nvalue = Number(res.value.numerator) / Number(res.value.denominator);
      nodes.update({
        id,
        label: 'Subproblem #' + id + '\n' +
          (fracIdx !== -1 ? 'fractional' : 'integer') +
          '\nvalue: ' + value,
        shape: 'circle',
        title: createSolutionElement(res.solution, res.vars) as any
      });
      if (fracIdx !== -1 && nvalue > optimal.value) {
        return addSubproblems(optimal, pl, ovars, res, nodes, edges, id, fracIdx);
      } else if (nvalue > optimal.value) {
        optimal.node = id;
        optimal.value = nvalue;
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

function addSubproblems(
  optimal: { value: number, node: string },
  pl: ProgLin,
  pvars: Set<string>,
  pres: Result,
  nodes: DataSet<Node>,
  edges: DataSet<Edge>,
  parentId: string,
  fracIdx: number
): Observable<null> {
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
      label: 'Subproblem #' + id
    });
    edges.add({
      from: parentId,
      label: pres.vars[fracIdx] + ' <= ' + integer,
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
      ...pres.vars,
      genVar(pres.vars)
    ];
    return evaluate({ A, B, C, vars }).pipe(
      switchMap(res => whenResult(optimal, pl, pvars, res, nodes, edges, id))
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
      label: pres.vars[fracIdx] + ' >= ' + (integer + BigInt(1)),
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
      ...pres.vars,
      genVar(pres.vars)
    ];
    return evaluate({ A, B, C, vars }).pipe(
      switchMap(res => whenResult(optimal, pl, pvars, res, nodes, edges, id))
    );
  })();
  return forkJoin([
    left,
    right
  ]).pipe(mapTo(null));
}
