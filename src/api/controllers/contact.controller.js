const { omit } = require('lodash');
const Contact = require('../models/contact.model');

exports.sendContact = async (req, res, next) => {
  try {
    const contactData = omit(req.body);
    const contact = await new Contact(contactData).save();
    if(contact){
      const contactAll = await Contact.find();
      res.status(200);
      return res.json({data: contactAll });
    }
    return res.json({ data: settingTransformed });
  } catch (error) {
    return next(error);
  }
};

exports.getAllContact = async (req, res, next) => {
  try {
    const contactAll = await Contact.find();
    res.status(200);
    return res.json({data: contactAll });
  } catch (error) {
    return next(error);
  }
}