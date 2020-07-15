import { BaseEntity } from 'typeorm';
export declare abstract class SoftDeleteEntity extends BaseEntity {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
