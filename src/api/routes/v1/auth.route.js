const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
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
  .post(authorize(ADMIN),validate(register), controller.registerAdmin);
router.route('/loginAcount')
  .post(validate(login), controller.login);
router.route('/refresh-token')
  .post(validate(refresh), controller.refresh);
router.route('/send-password-reset')
  .post(validate(sendPasswordReset), controller.sendPasswordReset);
router.route('/getAllAcountAdmin')
  .get(authorize(ADMIN), controller.getAllAcountAdmin);
router.route('/getAllAcountUser')
  .get(authorize(ADMIN), controller.getAllAcountUser);
router.route('/getOneAcount')
  .get(authorize(ADMIN),validate(getOneAcount), controller.getOneAcount);
router.route('/removeAcount')
  .get(authorize(ADMIN),validate(removeAcount), controller.removeAcount);
router.route('/editAcount')
  .put(validate(editAcount), controller.editAcount);
module.exports = router;
