/// <reference lib="webworker" />
import { default as Module } from '../native/simplex';
import { MatricialForm } from './parser/matricial-form';


addEventListener('message', ({ data }: { data: MatricialForm }) => {
  Module({ locateFile: (path: string) => `native/${path}` }).then(mod => {
    postMessage(mod.simplex(data.A, data.B, data.C));
  });
});
