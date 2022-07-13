import { Column, Entity, Index } from 'typeorm';

import { User as UserModel } from './Models';
import Base from './Base.entity';

@Entity()
export default class User extends Base implements UserModel {
  @Column()
    name!: string;

  @Index({ unique: true })
  @Column()
    email!: string;

  @Column()
    password!: string;
}
