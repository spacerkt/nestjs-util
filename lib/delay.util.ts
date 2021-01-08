export function delay<T = unknown>(
  promise: () => Promise<T>,
  timeout: number,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      promise()
        .then(value => resolve(value))
        .catch(err => reject(err));
    }, timeout);
  });
}
