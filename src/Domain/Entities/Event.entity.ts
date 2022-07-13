import { Column, Entity } from 'typeorm';
import Base from './Base.entity';

import User from './User.entity';
import { Event as EventModel, User as UserModel } from './Models';

@Entity()
export default class Event extends Base implements EventModel {
  @Column()
    title!: string;

  @Column()
    notes!: string;

  @Column()
    start!: Date;

  @Column()
    end!: Date;

  @Column({ default: '#fafafa' })
    bgColor?: string;

  @Column(() => User)
    user!: UserModel;
}
