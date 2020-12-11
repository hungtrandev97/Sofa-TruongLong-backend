const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartDetailSchema = new mongoose.Schema({
  _product:{type:Schema.Types.ObjectId,ref:'Product',autopopulate: true},
  quantity: {
    type: Number,
    trim: true,
    default: 1
  },
  priceProduct: {
    type: Number
  },
})

cartDetailSchema.method({
  transform() {
    const transformed = {};
    const fields = ['_id','_product', 'quantity', 'priceProduct']
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  }
})

module.exports = mongoose.model('CartDetail', cartDetailSchema)