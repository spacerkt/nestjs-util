import { PrimaryGeneratedColumn } from 'typeorm';
import { SoftDeleteEntity } from './soft-delete.entity';

export abstract class BaseEntity extends SoftDeleteEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
