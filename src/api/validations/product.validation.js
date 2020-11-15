const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  CreateProduct: {
    body: {
      _category: Joi.string()
        .required(),
      _manager: Joi.string()
        .required(),
      product_title: Joi.string()
        .required(),
      product_code: Joi.number()
        .required(),
      product_discript: Joi.string()
        .required(),
      // product_image: Joi.object()
      //   .required(),
      product_price: Joi.number().required(),
      product_price_sale: Joi.number().required(),
      product_new: Joi.boolean().required(),
      product_size: Joi.string().required(),
      product_gurantee: Joi.string(),
      product_donate: Joi.string()
    },
  },
  GetOneProduct: {
    query: {
      id_product: Joi.string().required()
    }
  },
  EditProduct: {
    query: {
      id_product: Joi.string().required()
    },
    body: {
      body: {
        _category: Joi.string(),
        _manager: Joi.string(),
        product_title: Joi.string(),
        product_code: Joi.number(),
        product_discript: Joi.string(),
        product_price: Joi.number(),
        product_price_sale: Joi.number(),
        product_new: Joi.boolean(),
        product_size: Joi.string(),
        product_gurantee: Joi.string(),
        product_donate: Joi.string()
      },
    }
  },
  RemoveProduct: {
    query: {
      id_product: Joi.string().required()
    },
  }
}
