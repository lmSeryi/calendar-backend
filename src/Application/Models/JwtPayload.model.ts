import { ObjectID } from 'typeorm';

interface JwtPayload {
  uid: string | ObjectID;
  name: string;
}

export default JwtPayload;
