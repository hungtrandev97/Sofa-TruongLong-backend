const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/setting.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
const {
  updateSetting,
} = require('../../validations/setting.validation');

const router = express.Router();

router.route('/updateSlider')
  .post(authorize(ADMIN),validate(updateSetting), controller.UpdateSetting);
module.exports = router;