const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/category.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const { 
  CreateCategory,
  getAllCategory,
  EditCategory
} = require('../../validations/category.validation');

const router = express.Router();
router.route('/CreateCategory')
  .post(controller.CreateCategory);
router.route('/GetAllCategory')
  .get(controller.GetAllCategory);
router.route('/EditCategory')
  .put(controller.EditCategory);
router.route('/RemoveCategory')
  .put(controller.RemoveCategory);

  module.exports = router;