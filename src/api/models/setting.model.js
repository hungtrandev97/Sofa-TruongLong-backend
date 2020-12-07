const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  imageSlider1 : {type: String, trim: true},
  imageSlider1Url : {type: String, trim: true},
  imageSlider2 : {type: String, trim: true},
  imageSlider2Url : {type: String, trim: true},
  imageSlider3 : {type: String, trim: true},
  imageSlider3Url : {type: String, trim: true},
  address: {type: String, trim: true},
  numberPhone: {type: String, trim: true},
  numberPhone1: {type: String, trim: true},
  email: {type: String, match: /^\S+@\S+\.\S+$/},
  linkFB: {type: String},
  numberPhoneZallo: {type:String},
  CountPoint: {type: Number}
})

settingSchema.method({
  transform() {
    const transformed = {};
    const fields = ['_id','imageSlider1', 'imageSlider1Url', 'imageSlider2', 'imageSlider2Url', 'imageSlider3','imageSlider3Url','address', 'numberPhone', 'numberPhone1', 'email', 'linkFB', 'numberPhoneZallo', 'CountPoint']
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  }
})

module.exports = mongoose.model('Setting', settingSchema)