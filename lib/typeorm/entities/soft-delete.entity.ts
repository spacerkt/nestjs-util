import {
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Exclude } from 'class-transformer';

/**
 * Override BaseEntity from typeorm package with
 * createdAt, updatedAt and deletedAt
 */
export abstract class SoftDeleteEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
