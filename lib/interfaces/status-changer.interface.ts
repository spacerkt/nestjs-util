export interface IStatusChanger<T> {
  change(
    oldStatus: T,
    newStatus: T,
  ): void | Promise<void> | boolean | Promise<boolean>;
}

export interface IStatusGraph {
  [key: string]: { [key: string]: boolean };
}
