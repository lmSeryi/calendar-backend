// ** Controller for route /api/auth
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import container from '../../inversify.config';
import { UserService } from '../../Application/Services/Model';
import TYPES from '../../types';
import RenewJwtRequest from '../../Application/Models/Requests/RenewJwt.request';

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userService = container.get<UserService>(TYPES.UserService);
  const token = await userService.signIn(email, password);

  return res.status(201).json({
    token,
  });
};

export const signUp = async (
  req: Request<core.ParamsDictionary, any, { email: string, password: string, name: string; }>,
  res: Response,
) => {
  const { email, password, name } = req.body;
  const userService = container.get<UserService>(TYPES.UserService);

  try {
    const token = await userService.signUp(email, password, name);
    return res.status(200).json({
      message: 'User created',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const renewToken = async (req: RenewJwtRequest, res: Response) => {
  const { uid, name } = req;
  const userService = container.get<UserService>(TYPES.UserService);
  const token = await userService.generateToken({ uid: uid!, name: name! });

  res.status(200).json({
    token,
  });
};
