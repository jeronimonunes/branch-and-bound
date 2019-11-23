export interface NativeFraction {
    numerator: string;
    denominator: string;
}

export interface Result {
    value: NativeFraction,
    solution: NativeFraction[],
    certificate: NativeFraction[],
    type: 'ILIMITED' | 'LIMITED' | 'UNFEASEABLE'
}

export interface Tabloid {
    name: string;
    certificate: NativeFraction[];
    certificateMatrix: NativeFraction[][];
    A: NativeFraction[][];
    B: NativeFraction[];
    C: NativeFraction[];
    v: NativeFraction
    base: { [key: number]: number };
}

export declare class SimplexNativeModule {

    simplex: (...args: any[]) => any;

}

declare function Module(module: any): {
    then: (callback: (mod: SimplexNativeModule) => void) => void;
};

export default Module;