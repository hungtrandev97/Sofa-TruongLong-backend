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

/**
 * Methods
 */
categorySchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'category_title', 'category_icon'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  }
})

module.exports = mongoose.model('Category', categorySchema)