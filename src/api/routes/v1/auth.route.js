const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const {
  login,
  register,
  refresh,
  sendPasswordReset,
  getOneAcount,
  removeAcount,
  editAcount
} = require('../../validations/auth.validation');

const router = express.Router();
router.route('/register')
  .post(validate(register), controller.register);
router.route('/registerAdmin')
  .post(validate(register), controller.registerAdmin);
router.route('/loginAcount')
  .post(validate(login), controller.login);
router.route('/refresh-token')
  .post(validate(refresh), controller.refresh);
router.route('/send-password-reset')
  .post(validate(sendPasswordReset), controller.sendPasswordReset);
router.route('/getAllAcountAdmin')
  .get(controller.getAllAcountAdmin);
router.route('/getAllAcountUser')
  .get(controller.getAllAcountUser);
router.route('/getOneAcount')
  .get(validate(getOneAcount), controller.getOneAcount);
router.route('/removeAcount')
  .get(validate(removeAcount), controller.removeAcount);
router.route('/editAcount')
  .put(validate(editAcount), controller.editAcount);
module.exports = router;
