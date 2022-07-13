import Joi from 'joi';
import { requiredString } from '.';
import { SignUp } from '../Models';

const signUpValidator = Joi.object<SignUp>({
  email: requiredString.email(),
  password: requiredString.min(8),
  name: requiredString.min(2),
});

export default signUpValidator;
