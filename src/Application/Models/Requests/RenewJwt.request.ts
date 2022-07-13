import { Request } from 'express';

interface RenewJwtRequest extends Request {
  name?: string;
  uid?: string;
}

export default RenewJwtRequest;
