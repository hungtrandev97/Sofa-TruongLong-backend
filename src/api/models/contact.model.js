const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: ""
  },
  date_create: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
  },
  numberPhone: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
  }
})

/**
 * Methods
 */
contactSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'date_create', 'email', 'numberPhone', 'content'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  }
})

module.exports = mongoose.model('Contact', contactSchema)