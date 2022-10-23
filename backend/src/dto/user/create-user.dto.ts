import * as Joi from 'joi';
import { Role } from 'src/models/user.model';

export class CreateUserDto {
  email: string;
  password: string;
  role: Role;
}

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  role: Joi.string().valid(...Object.values(Role)),
});
