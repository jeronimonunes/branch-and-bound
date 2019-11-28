import { NativeFraction } from 'src/native/simplex';
import { throwError } from 'rxjs';
import { Fraction } from 'linear-program-parser';

export function never(n: never) {
  console.error(n);
  return throwError('The code reached an unexpected path');
}

declare const BigInt: (v: number | string) => bigint;

const bigOne = BigInt(1);

export function toFraction(frac: NativeFraction) {
  return new Fraction(BigInt(frac.numerator), BigInt(frac.denominator));
}

export function isInteger(frac: NativeFraction) {
  return toFraction(frac).denominator === bigOne;
}

export function createSolutionElement(solution: NativeFraction[], vars: string[]) {
  const parent = document.createElement('div');
  parent.style.display = 'grid';
  parent.style.gridTemplateColumns = '';
  for (let i = 0; i < vars.length; i++) {
    const { numerator, denominator } = solution[i];
    const label = document.createElement('div');
    label.style.marginLeft = '1em';
    label.style.marginRight = '.5em';
    label.innerText = vars[i] + ':';
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
    parent.append(label);
    parent.appendChild(val);
    parent.style.gridTemplateColumns += ' auto auto';
  }
  return parent;
}

let last = 0;
export function genVar(vars: string[]) {
  let v: string;

  do {
    v = 'g_' + (last++);
  } while (vars.indexOf(v) !== -1);
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
