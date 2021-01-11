/**
 * Just a wrapper to return value as promise
 */
export async function getValueAsPromise<T>(value: T): Promise<T> {
  return value;
}
