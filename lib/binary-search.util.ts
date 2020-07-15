export function binarySearch<T>(
  arr: T[],
  value: T,
  compare: (a: T, b: T) => number,
): number {
  let min = 0;
  let max = arr.length;
  while (min < max) {
    const mid = min + ((max - min) >> 1);
    const element = arr[mid];
    const comp = compare(element, value);
    if (comp == 0) {
      return mid;
    }
    if (comp < 0) {
      min = mid + 1;
    } else {
      max = mid;
    }
  }
  return -1;
}
