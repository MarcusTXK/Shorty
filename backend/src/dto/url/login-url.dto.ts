import * as Joi from 'joi';

export class LoginUrlDto {
  password: string;
}

export const loginUrlSchema = Joi.object({
  password: Joi.string().required(),
});
