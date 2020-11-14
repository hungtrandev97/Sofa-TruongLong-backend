const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_title: {
    type: String,
    trim: true
  },
  category_icon: {
    type: String,
    trim: true
  }
})

module.exports = mongoose.model('Category', categorySchema)