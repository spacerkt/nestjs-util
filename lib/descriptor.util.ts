export function descriptor<T, S>(data: T, context: S) {
  return {
    type: typeof data,
    value: data,
    context,
  };
}

