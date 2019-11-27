import { MatricialForm } from './matricial-form';

import { Observable } from 'rxjs';

import { Result } from 'src/native/simplex';
import { Fpi } from 'linear-program-parser';

const toNativeFraction = (f: any) => ({
  numerator: '' + f.numerator,
  denominator: '' + f.denominator,
});

export function toMatricialForm(fpi: Fpi): MatricialForm {
  const { a, b, c, vars } = fpi.toMatrix();
  return {
    A: a.map(row => row.map(toNativeFraction)),
    B: b.map(toNativeFraction),
    C: c.map(toNativeFraction),
    vars
  };
}

export function evaluate(mat: MatricialForm) {
  return new Observable<Result>(observer => {
    const worker = new Worker('./simplex.worker', { type: 'module' });
    worker.onmessage = ({ data }) => {
      observer.next(data);
      observer.complete();
      worker.terminate();
    };
    worker.postMessage(mat);
    return () => {
      worker.terminate();
    };
  });
}
