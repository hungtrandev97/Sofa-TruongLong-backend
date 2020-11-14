const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  CreateProduct: {
    body: {
      userName: Joi.string()
        .required(),
      password: Joi.string()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      gender: Joi.number()
        .required(),
        address: Joi.string()
        .required(),
      numberPhone: Joi.number()
        .required(),
      role: Joi.number()
    },
  },
}
