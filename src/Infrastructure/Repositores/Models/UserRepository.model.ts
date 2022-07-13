import { ObjectID } from 'typeorm';
import { User } from '../../../Domain/Entities/Models';

interface UserRepository {

  getUser(email: string): Promise<User | null>;

  getUserById(id: ObjectID): Promise<User | null>;

  signUp(email: string, password: string, name: string): Promise<User>;

}

export default UserRepository;
