import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

/**
 * Combine Expose from 'class-transformer' and ApiProperty from '@nestjs/swagger'
 */
export function ExposeProperty(options?: ApiPropertyOptions) {
  return applyDecorators(Expose(), ApiProperty(options));
}
