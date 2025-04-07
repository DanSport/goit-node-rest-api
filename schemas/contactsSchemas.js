import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
    "string.base": "Name must be a string",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
    "string.base": "Phone must be a string",
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "Name must be a string",
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string().messages({
    "string.base": "Phone must be a string",
  }),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });
