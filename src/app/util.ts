import { NativeFraction } from 'src/native/simplex';
import { ParserOptions } from 'pegjs';
import { ParserOutput } from './parser/parser-output';

export function never(n: never): never {
  console.error(n);
  throw new Error('The thread got into a path that it wasn\'t supposed to, check the console');
}

export function createSolutionElement(solution: NativeFraction[]) {
  const parent = document.createElement('div');
  parent.style.display = 'grid';
  parent.style.gridTemplateColumns = '';
  parent.style.gridColumnGap = '1em';
  for (const { numerator, denominator } of solution) {
    const val = document.createElement('div');
    if (denominator === '1') {
      val.innerText = numerator;
    } else {
      const num = document.createElement('div');
      num.innerText = numerator;
      const den = document.createElement('div');
      den.style.borderTop = '1px solid';
      den.innerText = denominator;
      val.appendChild(num);
      val.appendChild(den);
    }
    parent.appendChild(val);
    parent.style.gridTemplateColumns += ' auto';
  }
  return parent;
}

let last = 0;
export function genVar(problem: ParserOutput) {

  let v = 'gen_' + (last++);
  while (problem.vars.indexOf(v) !== -1) {
    v = 'gen_' + (last++);
  }
  return v;

}

/**
 * Create Native Fraction
 */
export function cnf(numerator: string, denominator: string): NativeFraction {
  return { numerator, denominator };
}

export const ZERO = cnf('0', '1');
export const ONE = cnf('1', '1');
export const NEG = cnf('-1', '1');
