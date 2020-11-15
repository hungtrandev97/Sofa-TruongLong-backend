const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/category.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const { 
  CreateCategory,
  getAllCategory
} = require('../../validations/category.validation');

const router = express.Router();
router.route('/CreateCategory')
  .post(controller.CreateCategory);
router.route('/GetAllCategory')
  .get(controller.GetAllCategory);

  module.exports = router;