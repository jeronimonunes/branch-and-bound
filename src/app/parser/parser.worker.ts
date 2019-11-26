/// <reference lib="webworker" />

import { ParserOutput } from './parser-output';
import { parse, SyntaxError } from 'linear-program-parser';
import { MatricialForm } from './matricial-form';

const toNativeFraction = (f: any) => ({
  numerator: '' + f.numerator,
  denominator: '' + f.denominator,
});

addEventListener('message', ({ data }) => {
  try {
    const val = parse(data || '');
    const fpi = val.toFPI();
    const { a, b, c, vars } = fpi.toMatrix();
    const matricialForm: MatricialForm = {
      A: a.map(row => row.map(toNativeFraction)),
      B: b.map(toNativeFraction),
      C: c.map(toNativeFraction),
      vars
    };
    postMessage(matricialForm);
  } catch (e) {
    if (e instanceof SyntaxError) {
      postMessage({
        annotations: [{
          column: e.location.start.column - 1,
          row: e.location.start.line - 1,
          text: e.message,
          type: 'error'
        }]
      } as ParserOutput);
    } else {
      postMessage({ error: e.message } as ParserOutput);
    }
  }
});
