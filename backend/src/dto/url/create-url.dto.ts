import * as Joi from 'joi';

export class CreateUrlDto {
  customUrl?: string;
  originalUrl: string;
  password?: string;
  email?: string;
}

export const createUrlSchema = Joi.object({
  customUrl: Joi.string().min(1).max(10),
  originalUrl: Joi.string().uri().required(),
  password: Joi.string().min(5),
});
