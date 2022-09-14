import * as Joi from 'joi';

export class CreateUrlDto {
  customUrl?: string;
  originalUrl: string;
  password: string;
}

export const createUrlSchema = Joi.object({
  customUrl: Joi.string().uri(),
  originalUrl: Joi.string().uri().required(),
  password: Joi.string(),
});
