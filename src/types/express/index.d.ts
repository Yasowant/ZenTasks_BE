import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: { userId: string };
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: { userId: string };
  }
}