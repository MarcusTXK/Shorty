import * as Joi from 'joi';

export class UpdateUrlDto {
  customUrl?: string;
  originalUrl?: string;
  password?: string;
}

export const updateUrlSchema = Joi.object({
  customUrl: Joi.string().min(1).max(10),
  originalUrl: Joi.string().uri(),
  password: Joi.string().min(5),
});
