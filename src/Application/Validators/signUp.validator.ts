import Joi from 'joi';
import { requiredString } from '.';
import { SignUp } from '../Models';

const signUpValidator = Joi.object<SignUp>({
  email: requiredString.email(),
  name: requiredString.min(2),
  password: requiredString.min(8),
  confirmPassword: requiredString.min(8).valid(Joi.ref('password')),
});

export default signUpValidator;
