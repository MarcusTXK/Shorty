import * as Joi from 'joi';

export class LoginUserDto {
  email: string;
  password: string;
}

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
