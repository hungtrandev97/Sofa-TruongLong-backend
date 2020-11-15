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
})

/**
 * Methods
 */
categorySchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'category_title', 'date_create'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  }
})

module.exports = mongoose.model('Category', categorySchema)