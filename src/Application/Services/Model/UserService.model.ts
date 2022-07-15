import { ObjectID } from 'typeorm';
import { User } from '../../../Domain/Entities/Models';
import { JwtPayload } from '../../Models';

export interface LoginResponsePayload {
  token: string;
  uid: string;
  name?: string;
}

interface UserService {

  getUser(email: string): Promise<User | null>;

  getUserById(id: ObjectID): Promise<User | null>;

  signUp(email: string, password: string, name: string): Promise<LoginResponsePayload>;

  signIn(email: string, password: string): Promise<LoginResponsePayload>;

  generateToken(payload: JwtPayload): Promise<string | undefined>;

}

export default UserService;
