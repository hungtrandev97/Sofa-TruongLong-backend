const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  updateSetting: {
    body: {
      imageSlider1: Joi.string(),
      imageSlider1Url: Joi.string(),
      imageSlider2: Joi.string(),
      imageSlider2Url: Joi.string(),
      imageSlider3: Joi.string(),
      imageSlider3Url: Joi.string(),
      address: Joi.string(),
      numberPhone: Joi.string(),
      numberPhone1: Joi.string(),
      email: Joi.string().email(),
      linkFB: Joi.string(),
      numberPhoneZallo: Joi.string(),
      CountPoint: Joi.number()
    },
  },
}