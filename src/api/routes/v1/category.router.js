const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/category.controller');
const { 
  CreateCategory,
  EditCategory,
  RemoveCategory
} = require('../../validations/category.validation');

const router = express.Router();
router.route('/CreateCategory')
  .post(validate(CreateCategory),controller.CreateCategory);
router.route('/GetAllCategory')
  .get(controller.GetAllCategory);
router.route('/GetOneCategory')
  .get(validate(EditCategory), controller.GetOneCategory);
router.route('/EditCategory')
  .put(validate(EditCategory),controller.EditCategory);
router.route('/RemoveCategory')
  .put(validate(RemoveCategory),controller.RemoveCategory);

  module.exports = router;