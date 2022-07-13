import { Request } from 'express';
import * as core from 'express-serve-static-core';

interface SignInRequestPayload {
  email: string;
  password: string;
  name: string;
}

/* interface SignInSuccessResponse {
 ok: true;
 token: string;
 }

 interface SignInErrorResponse {
 ok: false;
 message: string;
 }

 type SignInResponse = SignInSuccessResponse | SignInErrorResponse; */

type SignInRequest = Request<core.ParamsDictionary, any, SignInRequestPayload>;

export default SignInRequest;
