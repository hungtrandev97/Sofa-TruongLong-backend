const Joi = require('joi');

module.exports = {
  CreateCategory: {
    body: {
      category_title: Joi.string().required()
    }
  },

  EditCategory: {
    query: {
      id_category: Joi.string().required()
    },
    body: {
      category_title: Joi.string(),
    }
  },
  RemoveCategory: {
    query: {
      id_category: Joi.string().required()
    }
  }

}