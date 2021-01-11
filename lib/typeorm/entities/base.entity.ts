import { PrimaryGeneratedColumn } from 'typeorm';
import { SoftDeleteEntity } from './soft-delete.entity';

/**
 * Override BaseEntity from typeorm package, providing createdAt, updatedAt and deletedAt properties
 */
export abstract class BaseEntity extends SoftDeleteEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
