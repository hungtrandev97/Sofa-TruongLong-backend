const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  login,
  register,
  refresh,
  sendPasswordReset,
} = require('../../validations/auth.validation');

const router = express.Router();
router.route('/register')
  .post(validate(register), controller.register);
router.route('/loginAcount')
  .post(validate(login), controller.login);
router.route('/refresh-token')
  .post(validate(refresh), controller.refresh);
router.route('/send-password-reset')
  .post(validate(sendPasswordReset), controller.sendPasswordReset);

module.exports = router;
