const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new mongoose.Schema({
  _category:{type:Schema.Types.ObjectId,ref:'Category',autopopulate: true},
  _manager: {type:mongoose.Schema.Types.ObjectId,ref:'Customer'},
  product_title: {
    type: String,
    trim: true,
  },
  product_code: {
    type: Number,
    trim: true,
  },
  product_discript: {
    type: String,
    trim: true
  },
  product_imageMain: {type: String},
  product_product_imageMainUrl: {type: String},
  product_image1: {type: String},
  product_image_url1: {type: String},
  product_image2: {type: String},
  product_image_url2: {type: String},
  product_image3: {type: String},
  product_image_url3: {type: String},
  product_price: {type: String},
  product_priceNumber: {type: Number},
  product_price_sale: {type: String},
  product_priceNumber_sale: {type: Number},
  product_date_added: {type: Date, default: Date.now},
  product_quantity_order: {type: Number},
  product_new: {type: Number, default: 1},
  product_inventory: {type: Number},
  product_gurantee: {type: String},
  product_donate: {type: String},
  product_index: {type: Number, default: 2},
})

productSchema.method({
  transform() {
    const transformed = {};
    const fields = ['_id','_category', '_manager', 'product_title', 'product_code', 'product_discript','product_imageMain','product_image', 'product_price', 'product_price_sale', 'product_date_added', 'product_quantity_order', 'product_new', 'product_inventory', 'product_gurantee', 'product_donate', 'product_index']
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  }
})

module.exports = mongoose.model('Product', productSchema)