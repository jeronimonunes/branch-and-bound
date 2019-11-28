import { of, Observable, throwError, merge } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { evaluate, toMatricialForm } from './simplex';
import { Result } from 'src/native/simplex';
import { ZERO, ONE, cnf, genVar, NEG, never, isInteger, toFraction } from './util';
import { parse, SyntaxError, ProgLinType } from 'linear-program-parser';
import { MatricialForm } from './matricial-form';
import { BranchAndBoundEvent } from './branch-and-bound-event';
import { NEG as fNEG } from 'linear-program-parser';

declare var BigInt: (v: string | number) => bigint;
if (typeof (BigInt) === undefined) {
  BigInt = (v) => parseInt(v as string, 10) as any as bigint;
}

export function branchAndBound(problem: string): Observable<BranchAndBoundEvent> {
  try {
    // solve the first linear relaxation
    const opl = parse(problem);
    const fpi = opl.toFPI();
    const ovars = opl.objective.getVars();
    const mat = toMatricialForm(fpi);
    const optimal = {
      node: '',
      value: Number.NEGATIVE_INFINITY
    };
    return evaluate(mat).pipe(
      switchMap(res => whenResult(optimal, opl.type, mat, ovars, res, '1')),
      startWith({ type: 'subproblem', id: '1', mat, parentId: undefined, edgeLabel: undefined } as BranchAndBoundEvent),
      startWith({ type: 'start' } as BranchAndBoundEvent)
    );
  } catch (e) {
    if (e instanceof SyntaxError) {
      return of({
        type: 'parserError',
        annotations: [{
          column: e.location.start.column - 1,
          row: e.location.start.line - 1,
          text: e.message,
          type: 'error'
        }]
      });
    } else {
      return of({
        type: 'error',
        message: e.message
      });
    }
  }
}

function whenResult(
  optimal: { value: number, node: string },
  type: ProgLinType,
  original: MatricialForm,
  ovars: Set<string>,
  res: Result,
  id: string
): Observable<BranchAndBoundEvent> {
  // if (id.length > 10) {
  //   return of(null);
  // }
  switch (res.type) {
    case 'ILIMITED':
    case 'INFEASIBLE':
      return of({
        type: 'subresult',
        id,
        res,
        fracIdx: -1,
        value: type === 'max' ? toFraction(res.value) : toFraction(res.value).multiply(fNEG)
      });
    case 'LIMITED':
      const fracIdx = res.solution.findIndex((frac, idx) => ovars.has(res.vars[idx]) && !isInteger(frac));
      const nvalue = Number(res.value.numerator) / Number(res.value.denominator);
      const evt: BranchAndBoundEvent = {
        type: 'subresult',
        id,
        res,
        fracIdx,
        value: type === 'max' ? toFraction(res.value) : toFraction(res.value).multiply(fNEG)
      };
      if (fracIdx !== -1 && nvalue > optimal.value) {
        return addSubproblems(optimal, type, original, ovars, res, id, fracIdx).pipe(
          startWith(evt)
        );
      } else if (nvalue > optimal.value) {
        optimal.node = id;
        optimal.value = nvalue;
        const optEvt: BranchAndBoundEvent = {
          type: 'optimal',
          value: evt.value,
          id: evt.id
        };
        return of(optEvt, evt);
      } else {
        return of(evt);
      }
    default:
      return never(res.type);
  }
}

function addSubproblems(
  optimal: { value: number, node: string },
  type: ProgLinType,
  original: MatricialForm,
  pvars: Set<string>,
  pres: Result,
  parentId: string,
  fracIdx: number
): Observable<BranchAndBoundEvent> {
  const numerator = BigInt(pres.solution[fracIdx].numerator);
  const denominator = BigInt(pres.solution[fracIdx].denominator);
  let integer = numerator / denominator;
  if (typeof (integer) === 'number') { // for browsers without bigint
    integer = Math.floor(integer) as any;
  }
  const left = (() => {
    const id = parentId + '.1';
    const edgeLabel = pres.vars[fracIdx] + ' <= ' + integer;

    // construct subproblem
    const A = [
      ...pres.state.A.map(line => [...line, ZERO]),
      [...pres.state.C.map((_, idx) => idx === fracIdx ? ONE : ZERO), ONE],
    ];
    const B = [
      ...pres.state.B,
      cnf('' + integer, '1')
    ];
    const C = original.C.slice();
    while (C.length <= pres.state.C.length) {
      C.push(ZERO);
    }
    const vars = [
      ...pres.vars,
      genVar(pres.vars)
    ];
    const mat: MatricialForm = { A, B, C, vars };
    return evaluate(mat).pipe(
      switchMap(res => whenResult(optimal, type, original, pvars, res, id)),
      startWith({ type: 'subproblem', id, mat, parentId, edgeLabel } as BranchAndBoundEvent)
    );
  })();
  const right = (() => {
    const id = parentId + '.2';
    const edgeLabel = pres.vars[fracIdx] + ' >= ' + (integer + BigInt(1));

    // construct subproblem
    const A = [
      ...pres.state.A.map(line => [...line, ZERO]),
      [...pres.state.C.map((_, idx) => idx === fracIdx ? ONE : ZERO), NEG],
    ];
    const B = [
      ...pres.state.B,
      cnf('' + (integer + BigInt(1)), '1')
    ];
    const C = original.C.slice();
    while (C.length <= pres.state.C.length) {
      C.push(ZERO);
    }
    const vars = [
      ...pres.vars,
      genVar(pres.vars)
    ];
    const mat: MatricialForm = { A, B, C, vars };
    return evaluate(mat).pipe(
      switchMap(res => whenResult(optimal, type, original, pvars, res, id)),
      startWith({ type: 'subproblem', id, mat, parentId, edgeLabel } as BranchAndBoundEvent)
    );
  })();
  return merge(left, right);
}
