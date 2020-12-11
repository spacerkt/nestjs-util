export class SuccessResponse<T = unknown> {
  readonly success = true;
  constructor(readonly data?: T) {}
}
