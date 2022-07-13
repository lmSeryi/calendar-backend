import Joi from 'joi';
import { requiredString } from '.';
import { SignIn } from '../Models';

const signInValidator = Joi.object<SignIn>({
  email: requiredString.email(),
  password: requiredString,
});

export default signInValidator;
