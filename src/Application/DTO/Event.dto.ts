import UserDto from './User.dto';

interface EventDto {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: UserDto;
  bgColor?: string;
}

export default EventDto;
