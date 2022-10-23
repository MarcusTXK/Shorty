import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { User } from 'src/models/user.model';

export function generateAccessToken(user: User) {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      // For actual production, should be lower
      expiresIn: '180s',
    },
  );
}

export interface AuthRequest extends Request {
  user: User;
  accessToken: string;
}
