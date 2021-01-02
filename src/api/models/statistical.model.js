const mongoose = require('mongoose');

const statisticalSchema = new mongoose.Schema({
  year: {
    type: Number,
    trim: true,
    default: 1
  },
  totalnumber: {
    type: Number
  },
})

statisticalSchema.method({
  transform() {
    const transformed = {};
    const fields = ['_id','year','totalnumber']
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  }
})

module.exports = mongoose.model('Statistical', statisticalSchema)