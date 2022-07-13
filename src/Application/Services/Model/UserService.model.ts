import { ObjectID } from 'typeorm';
import { User } from '../../Entities/Models';
import { JwtPayload } from '../../Models';

interface UserService {

  getUser(email: string): Promise<User | null>;

  getUserById(id: ObjectID): Promise<User | null>;

  signUp(email: string, password: string, name: string): Promise<string | undefined>;

  signIn(email: string, password: string): Promise<string | undefined>;

  generateToken(payload: JwtPayload): Promise<string | undefined>;

}

export default UserService;
