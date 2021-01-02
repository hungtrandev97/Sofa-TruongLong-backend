const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/contact.controller');
const {
  sendContact,
} = require('../../validations/contact.validation');

const router = express.Router();

router.route('/sendContact')
  .post(validate(sendContact),controller.sendContact);
router.route('/getAllContact')
  .get(controller.getAllContact);
module.exports = router;