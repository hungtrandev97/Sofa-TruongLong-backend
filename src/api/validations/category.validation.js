const Joi = require('joi');

module.exports = {
  CreateCategory: {
    body: {
      category_title: Joi.string().required()
    }
  },

  getAllCategory: {
    query: {
      id_category: Joi.string().required()
    }
  }
}