import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Missing required password field",
    "string.min": "Password must be at least 6 characters",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().required().messages({
    "any.required": "Missing required password field",
  }),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Missing field subscription",
      "any.only": 'Subscription must be one of ["starter","pro","business"]',
    }),
});

export const updateSubscription = async (userId, subscription) => {
  const user = await User.findByPk(userId);
  if (!user) return null;
  user.subscription = subscription;
  await user.save();
  return user;
};
export const resendVerifyEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required field email",
    "string.email": "Email must be a valid email",
  }),
});
