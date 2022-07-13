import Joi from 'joi';

export const requiredString = Joi.string().required();
export const requiredNumber = Joi.number().required();
export const requiredBoolean = Joi.boolean().required();

export const optionalString = Joi.string().optional().allow('', null);
export const optionalNumber = Joi.number().optional();
export const optionalBoolean = Joi.boolean().optional();
