const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/product.controler');
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
  .post(validate(EditProduct),controller.EditProduct);
router.route('/RemoveProduct')
  .get(validate(RemoveProduct),controller.RemoveProduct);
router.route('/GetAllProductNew')
  .get(controller.GetAllProductNew);
router.route('/GetAllProductIndex')
  .get(controller.GetAllProductIndex);
router.route('/GetAllProductPrice')
  .get(controller.GetAllProductPrice);
router.route('/GetAllProductNew')
  .get(controller.GetAllProductNew);
router.route('/GetAllProductPriceSale')
  .get(controller.GetAllProductPriceSale);
router.route('/GetAllProductCategory')
  .get(controller.GetAllProductCategory);
router.route('/SearchProduct')
  .get(controller.SearchProduct);
module.exports = router;