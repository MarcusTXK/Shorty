import * as Joi from 'joi';

export class UpdateUrlDto {
  customUrl?: string;
  originalUrl?: string;
  password?: string;
}

export const updateUrlSchema = Joi.object({
  customUrl: Joi.string().uri(),
  originalUrl: Joi.string().uri(),
  password: Joi.string(),
});
