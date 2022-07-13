import {
  CreateDateColumn, Index, ObjectID, ObjectIdColumn, UpdateDateColumn,
} from 'typeorm';

export default class Base {
  @ObjectIdColumn()
    _id!: ObjectID;

  @CreateDateColumn()
  @Index('created_at')
    createdAt!: Date;

  @UpdateDateColumn()
  @Index('updated_at')
    updatedAt!: Date;
}
