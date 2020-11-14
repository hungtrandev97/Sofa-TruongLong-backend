const { bool, string } = require('joi');
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  _category:{type:Schema.Types.ObjectId,ref:'Infomation',autopopulate: true},
  _manager: {type:mongoose.Schema.Types.ObjectId,ref:'Customer'},
  product_title: {
    type: String,
    trim: true,
  },
  product_code: {
    type: String,
    trim: true,
  },
  product_discript: {
    type: String,
    trim: true
  },
  product_image: {type: Object},
  product_price: {type: Number},
  product_price_sale: {type: Number},
  product_date_added: {type: Date, default: Date.now},
  product_date_last_modified: {type: Date, default: Date.now},
  product_quantity_order: {type: Number},
  product_new: {type: Boolean, default: false},
  product_inventory: {type: Number},
  product_size: {type: String},
  product_gurantee: {type: String},
  product_donate: {type: String}
})

module.exports = mongoose.model('Product', productSchema)