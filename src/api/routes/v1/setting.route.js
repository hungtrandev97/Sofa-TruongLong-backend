const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/setting.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
const {
  updatePoind,
  updateSetting,
} = require('../../validations/setting.validation');

const router = express.Router();

router.route('/updatePoind')
  .post(validate(updatePoind),controller.updatePoind);
router.route('/updateSetting')
  .post(authorize(ADMIN),validate(updateSetting), controller.UpdateSetting);
module.exports = router;