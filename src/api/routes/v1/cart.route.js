const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/cart.controller');
const {
  CreateProduct,
} = require('../../validations/cart.validation');

const router = express.Router();
router.route('/createCart')
  .post(controller.createCart);
router.route('/updateCart')
  .post(controller.updateCart);
router.route('/updateCartStatus')
  .post(controller.updateCartStatus);
module.exports = router;