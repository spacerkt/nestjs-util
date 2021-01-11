/**
 * Random number of length 3
 *  ```typescript
 * console.log(randomNumber(3)) // outputs a number between [0, 999]
 * ```
 */
export function randomNumber(length: number): string {
  return (
    Math.pow(10, length)
      .toString()
      .slice(length - 1) +
    Math.floor(Math.random() * Math.pow(10, length) + 1).toString()
  ).slice(-length);
}
