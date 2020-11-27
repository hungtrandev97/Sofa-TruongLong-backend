const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_title: {
    type: String,
    trim: true
  },
  date_create: {
    type: Date,
    default: Date.now
  },
  checkProduct: {
    type: Number,
    default: 2
  }
})

/**
 * Methods
 */
categorySchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'category_title', 'date_create', 'checkProduct'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  }
})

module.exports = mongoose.model('Category', categorySchema)