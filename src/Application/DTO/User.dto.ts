import { ObjectID } from 'typeorm';

interface UserDto {
  _id: ObjectID;
  name: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default UserDto;
