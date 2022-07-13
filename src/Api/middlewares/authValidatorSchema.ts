import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// @ts-ignore
import { ObjectID } from 'mongodb';
import { signInValidator, signUpValidator } from '../../Application/Validators';
import { SECRET_JWT_SEED } from '../../libs/config';
import { JwtPayload, SignInRequest } from '../../Application/Models';
import RenewJwtRequest from '../../Application/Models/Requests/RenewJwt.request';

export const validateSignIn = async (req: SignInRequest, res: Response, next: NextFunction) => {
  try {
    await signInValidator.validateAsync(req.body);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid data';
    return res.status(400).json({
      ok: false,
      message,
    });
  }

  return next();
};

export const validateSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await signUpValidator.validateAsync(req.body);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid data';
    return res.status(400).json({
      message,
    });
  }

  return next();
};

export const validateJWT = async (req: RenewJwtRequest, res: Response, next: NextFunction) => {
  const token = req.headers['x-token'] as string;
  if (!token) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }

  try {
    const { uid, name } = await jwt.verify(token, SECRET_JWT_SEED!) as JwtPayload;
    req.uid = new ObjectID(uid);
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }

  return next();
};
