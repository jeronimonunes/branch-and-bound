/// <reference lib="webworker" />
import { default as Module } from '../../native/simplex';
import { MatricialForm } from './matricial-form';


addEventListener('message', ({ data }: { data: MatricialForm }) => {
  Module({ locateFile: (path: string) => `native/${path}` }).then(mod => {
    const res = mod.simplex(data.A, data.B, data.C);
    const vars = data.vars;
    postMessage({ ...res, vars });
  });
});
