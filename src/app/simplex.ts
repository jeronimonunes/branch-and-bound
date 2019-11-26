import { MatricialForm } from './parser/matricial-form';

import { Observable } from 'rxjs';

import { Result } from 'src/native/simplex';

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
