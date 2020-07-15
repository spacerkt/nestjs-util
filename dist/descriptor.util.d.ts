export declare function descriptor<T, S>(data: T, context: S): {
    type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    value: T;
    context: S;
};
