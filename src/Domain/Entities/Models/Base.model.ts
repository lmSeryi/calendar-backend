import { ObjectID } from 'typeorm';

interface Base {
  _id: ObjectID;
  createdAt: Date;
  updatedAt: Date;
}

export default Base;
