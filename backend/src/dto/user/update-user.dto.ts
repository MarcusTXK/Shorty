import * as Joi from 'joi';
import { Role } from 'src/models/user.model';

export class UpdateUserDto {
  email?: string;
  password?: string;
  role?: Role;
}

export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(5),
  role: Joi.string().valid(...Object.values(Role)),
});
