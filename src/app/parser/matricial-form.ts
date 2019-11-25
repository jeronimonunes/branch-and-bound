import { NativeFraction } from 'src/native/simplex';

export interface MatricialForm {
    a: NativeFraction[][];
    b: NativeFraction[];
    c: NativeFraction[];
    vars: string[];
}
