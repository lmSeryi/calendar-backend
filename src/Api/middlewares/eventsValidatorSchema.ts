import { NextFunction, Response } from 'express';
import { createEventValidator } from '../../Application/Validators';
import { SignInRequest } from '../../Application/Models';

export const validateEvent = async (req: SignInRequest, res: Response, next: NextFunction) => {
  try {
    await createEventValidator.validateAsync(req.body);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid data';
    return res.status(400).json({ error: message });
  }

  return next();
};
