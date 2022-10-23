import { Response, NextFunction } from 'express';
import { Role } from 'src/models/user.model';
import { AuthRequest } from 'src/util/auth';

export function verifyRoles(permittedRoles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    console.log('checking role:', user);
    if (user && permittedRoles.includes(user.role)) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
}
