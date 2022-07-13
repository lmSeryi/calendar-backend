import { MongoEntityManager, ObjectID } from 'typeorm';
import { inject, injectable } from 'inversify';

import { UserRepository as UserRepositoryModel } from './Models';
import { User } from '../../Domain/Entities';
import Types from '../../types';
import { DbManager } from '../DbManager/Model';

@injectable()
export default class UserRepository implements UserRepositoryModel {
  readonly #mongoManager: MongoEntityManager;

  constructor(
    @inject(Types.DbManager) private dbManager: DbManager,
  ) {
    this.#mongoManager = new MongoEntityManager(dbManager.getDataSource());
  }

  getUser(email: string): Promise<User | null> {
    return this.#mongoManager.findOneBy(User, { email });
  }

  getUserById(id: ObjectID): Promise<User | null> {
    return this.#mongoManager.findOneBy(User, { _id: id });
  }

  signUp(email: string, password: string, name: string): Promise<User> {
    return this.#mongoManager.save(User, { email, password, name });
  }
}
