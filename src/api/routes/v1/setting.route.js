const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/setting.controller');
const {
  updatePoind,
  updateSetting,
} = require('../../validations/setting.validation');

const router = express.Router();

router.route('/getAllSetting')
  .get(controller.getAllSetting);
router.route('/updatePoind')
  .post(validate(updatePoind),controller.updatePoind);
router.route('/updateSetting')
  .post(validate(updateSetting), controller.UpdateSetting);
module.exports = router;