const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const oAuthLogin = require('../../middlewares/auth').oAuth;
const {
  CreateProduct,
} = require('../../validations/product.validation');

const router = express.Router();
router.route('/CreateProduct')
  .post(validate(CreateProduct), controller.CreateProduct);

module.exports = router;
