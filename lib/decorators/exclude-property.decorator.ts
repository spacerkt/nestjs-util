import { applyDecorators } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export function ExcludeProperty() {
  return applyDecorators(Exclude({ toPlainOnly: true }), ApiHideProperty());
}
