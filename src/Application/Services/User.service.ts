import { inject, injectable } from 'inversify';
import { ObjectID } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../Domain/Entities/Models';
import TYPES from '../../types';

import type { UserService as UserServiceModel } from './Model';
import type { UserRepository } from '../../Infrastructure/Repositores/Models';
import { SECRET_JWT_SEED } from '../../libs/config';
import { JwtPayload } from '../Models';
import { LoginResponsePayload } from './Model/UserService.model';

@injectable()
export default class UserService implements UserServiceModel {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
  ) {}

  public getUser(email: string): Promise<User | null> {
    return this.userRepository.getUser(email);
  }

  public getUserById(id: ObjectID): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  public async signUp(
    email: string,
    password: string,
    name: string,
  ): Promise<LoginResponsePayload> {
    const user = await this.getUser(email);
    if (user) {
      throw new Error('User already exists');
    }
    const encryptedPassword = this.encryptPassword(password);

    const createdUser = await this.userRepository.signUp(email, encryptedPassword, name);
    const token = await this.generateToken({ uid: createdUser._id, name: createdUser.name });

    if (!token) {
      throw new Error('Internal server error');
    }

    return {
      token,
      uid: createdUser._id.toString(),
    };
  }

  public async signIn(email: string, password: string): Promise<LoginResponsePayload> {
    const user = await this.getUser(email);
    if (!user) {
      throw new Error('Credentials not valid');
    }
    if (!this.decryptPassword(password, user.password)) {
      throw new Error('Credentials not valid');
    }

    const token = await this.generateToken({ uid: user._id, name: user.name });
    if (!token) {
      throw new Error('Internal server error');
    }

    return {
      token,
      uid: user._id.toString(),
      name: user.name,
    };
  }

  public generateToken(payload: JwtPayload): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, SECRET_JWT_SEED!, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  }

  private encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  private decryptPassword(password: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
