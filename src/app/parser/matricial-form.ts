import { NativeFraction } from 'src/native/simplex';

export interface MatricialForm {
    A: NativeFraction[][];
    B: NativeFraction[];
    C: NativeFraction[];
    vars: string[];
}
