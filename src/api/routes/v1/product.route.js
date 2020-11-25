const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/product.controler');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  CreateProduct,
  GetOneProduct,
  EditProduct,
  RemoveProduct
} = require('../../validations/product.validation');

const router = express.Router();
router.route('/CreateProduct')
  .post(authorize(ADMIN),validate(CreateProduct), controller.CreateProduct);
router.route('/GetAllProduct')
  .get(controller.GetAllProduct);
router.route('/GetOneProduct')
  .get(validate(GetOneProduct),controller.GetOneProduct);
router.route('/EditProduct')
  .get(authorize(ADMIN),validate(EditProduct),controller.EditProduct);
router.route('/RemoveProduct')
  .get(authorize(ADMIN),validate(RemoveProduct),controller.RemoveProduct);

module.exports = router;
