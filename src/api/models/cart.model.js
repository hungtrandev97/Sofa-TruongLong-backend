const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  _id_user: {type:Schema.Types.ObjectId,ref:'Product',autopopulate: true},
  name: {
    type: String,
  },
  address: {
    type: String,
    default: ""
  },
  numberPhone: {
    type: String,
    default: ""
  },
  totalMoney: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 1
  },
  dateOder: {
    type: Date,
    default: Date.now
  }
})

/**
 * Methods
 */
cartSchema.method({
  transform() {
    const transformed = {};
    const fields = ['_id','_id_user','name', 'address', 'numberPhone', 'totalMoney', 'status','dateOder']
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  }
})

module.exports = mongoose.model('Cart', cartSchema)