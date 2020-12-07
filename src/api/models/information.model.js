const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
  image_logo: {
    type: String,
    trim: true,
  },
  name_Shop: {
    type: String,
    trim: true,
  },
  descript_name: {
    type: String,
    trim: true,
  },
  hosting: { 
    type: String,
    trim: true,
  },
  email: {
    match: /^\S+@\S+\.\S+$/,
    unique: true,
    trim: true,
    lowercase: true
  },
  number_phone_shop: {
    type: Number,
    trim: true
  },
  number_phone_Zalo: {
    type: Number,
    trim: true,
  },
  link_FB: {
    type: String,
  },
  address_shop: {
    type: String,
  },
  about_shop: {
    type: String,
  },
  name_atm: {
    type: String,
  },
  number_atm: {
    type: Number,
  },
  branch_atm: {
    type: String
  }
})

module.exports = mongoose.model('Infomation', informationSchema)