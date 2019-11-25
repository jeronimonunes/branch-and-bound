export interface NativeFraction {
  numerator: string;
  denominator: string;
}

export interface Result {
  value: NativeFraction,
  solution: NativeFraction[],
  certificate: NativeFraction[],
  type: 'ILIMITED' | 'LIMITED' | 'INFEASIBLE'
}

export declare class SimplexNativeModule {

  simplex: (a: NativeFraction[][], b: NativeFraction[], c: NativeFraction[]) => Result;

}

declare function Module(module: any): {
  then: (callback: (mod: SimplexNativeModule) => void) => void;
};

export default Module;
