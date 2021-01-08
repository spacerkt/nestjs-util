export function delay<T = unknown>(
  timeout: number,
  promise: () => Promise<T>,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      promise()
        .then(value => resolve(value))
        .catch(err => reject(err));
    }, timeout);
  });
}
