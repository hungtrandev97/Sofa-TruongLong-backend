const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/product.controler');
const oAuthLogin = require('../../middlewares/auth').oAuth;
const {
  CreateProduct,
  GetOneProduct,
  EditProduct,
  RemoveProduct
} = require('../../validations/product.validation');

const router = express.Router();
router.route('/CreateProduct')
  .post(validate(CreateProduct), controller.CreateProduct);
router.route('/GetAllProduct')
  .get(controller.GetAllProduct);
router.route('/GetOneProduct')
  .get(validate(GetOneProduct),controller.GetOneProduct);
router.route('/EditProduct')
  .get(validate(EditProduct),controller.EditProduct);
router.route('/RemoveProduct')
  .get(validate(RemoveProduct),controller.RemoveProduct);

module.exports = router;
