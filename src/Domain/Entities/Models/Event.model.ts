import Base from './Base.model';
import User from './User.model';

interface Event extends Base {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user: User;
}

export default Event;
