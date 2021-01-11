type Order = 'DESC' | 'ASC';

/**
 * Generic compare function
 */
export function compare<T extends { id: number }>(
  a: T,
  b: T,
  order: Order = 'ASC',
): number {
  return order === 'ASC' ? a.id - b.id : b.id - a.id;
}
