export interface NativeFraction {
  numerator: string;
  denominator: string;
}

export interface Result {
  value: NativeFraction,
  solution: NativeFraction[],
  vars: string[];
  certificate: NativeFraction[],
  type: 'ILIMITED' | 'LIMITED' | 'INFEASIBLE',
  state: Tabloid
}

export interface Tabloid {
  certificate: NativeFraction[];
  certificateMatrix: NativeFraction[][];
  A: NativeFraction[][];
  B: NativeFraction[];
  C: NativeFraction[];
  v: NativeFraction
  base: { [key: number]: number };
}

export declare class SimplexNativeModule {

  simplex: (a: NativeFraction[][], b: NativeFraction[], c: NativeFraction[]) => Result;

}

declare function Module(module: any): {
  then: (callback: (mod: SimplexNativeModule) => void) => void;
};

export default Module;
