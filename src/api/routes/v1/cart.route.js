const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/cart.controller');
const {
  CreateProduct,
} = require('../../validations/cart.validation');

const router = express.Router();
router.route('/createCart')
  .post(controller.createCart);

module.exports = router;