import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../config/auth';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new Error('Invalid token');
  }
}
