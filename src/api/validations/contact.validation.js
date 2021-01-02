const Joi = require('joi');

module.exports = {
  sendContact: {
    body: {
      name: Joi.string().required(),
      numberPhone: Joi.string().required(),
      email: Joi.string().required(),
      address: Joi.string().required(),
      content: Joi.string().required()
    }
  },
}