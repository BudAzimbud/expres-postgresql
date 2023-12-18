import Joi from "joi";

export const validateUserDTO = (req, res, next) => {
  const schema = Joi.object({
    phone: Joi.string().min(11).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(4).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateResetPasswordDTO = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string()
      .min(4).required(),
    token: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

