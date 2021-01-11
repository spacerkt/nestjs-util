import { IsOptional, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

enum SQLOrder {
  DESC = 'DESC',
  ASC = 'ASC',
}

/**
 * Common dto for GET routes
 */
export abstract class GetAllDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: String })
  search?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Order by which column', type: String })
  orderBy?: string;

  @IsOptional()
  @IsEnum(SQLOrder)
  @ApiPropertyOptional({ enum: SQLOrder, type: String })
  order?: 'DESC' | 'ASC';
}
