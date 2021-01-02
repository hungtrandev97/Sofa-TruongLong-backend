const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/cart.controller');
const {
  CreateProduct,
} = require('../../validations/cart.validation');

const router = express.Router();
router.route('/getAllCart')
  .get(controller.getAllCart);
router.route('/getAllCartIdUser')
  .get(controller.getAllCartIdUser);
router.route('/getAllCartDetail')
  .get(controller.getAllCartDetail);
router.route('/createCart')
  .post(controller.createCart);
router.route('/updateCart')
  .post(controller.updateCart);
router.route('/updateCartStatus')
  .post(controller.updateCartStatus);
router.route('/removeCart')
  .get(controller.removeCart);
router.route('/statistical')
  .get(controller.statistical);
module.exports = router;