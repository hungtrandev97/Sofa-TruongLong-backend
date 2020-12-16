const Cart = require('../models/cart.model');
const CartDetail = require('../models/cartDetail');
const Product = require('../models/product.model');
const Customer = require('../models/user.model');
const { omit } = require('lodash');
const { findByIdAndUpdate } = require('../models/product.model');

exports.createCart = async (req, res, next) => {
  try {
    console.log(req.body);
    const cartData = {
      "_id_user": req.body._id_user,
      "address": req.body.address,
      "numberPhone": req.body.numberPhone,
      "totalMoney": req.body.totalMoney,
    }
    const cartDataSave = omit(cartData);
    const cart = await new Cart(cartDataSave).save();
    if(cart) {
      const product = req.body._product;
      product.map(async (item) => {
        let cartDetailData = {
          "_product": item._product,
          "quantity": item.quantity,
          "priceProduct": item.priceProduct,
        }
        const cartDetailSave = omit(cartDetailData);
        await new CartDetail(cartDetailSave).save();
        const product = await Product.findOne({_id: item._product});
        let numberPoint = product.product_quantity_order += 1;
        await Product.findByIdAndUpdate({_id: item._product}, { "product_quantity_order": numberPoint});
        let userItem = await Customer.findOne({_id: req.body._id_user});
        let numberPointUser = userItem.numberPoint += 100;
        await Customer.findByIdAndUpdate({_id: req.body._id_user}, { "numberPoint": numberPointUser});
      });
      return res.json({ data: cart });
    }
  } catch (error) {
    return next(error)
  }
}

exports.updateCart = async (req, res, next) => {
  try {
    console.log(req.body);
    const cartData = {
      "address": req.body.address,
      "numberPhone": req.body.numberPhone,
    }
    const cartDataUpdate = omit(cartData);
    const cart = await Cart.findByIdAndUpdate({_id: req.query.idCart},cartDataUpdate, {new: true});
    return res.json({ data: cart });
  } catch (error) {
    return next(error)
  }
}

exports.updateCartStatus = async (req, res, next) => {
  try {
    const cartData = {
      "status": req.body.status,
    }
    const cartDataUpdate = omit(cartData);
    const cart = await Cart.findByIdAndUpdate({_id: req.query.idCart},cartDataUpdate, {new: true});
    return res.json({ data: cart });
  } catch (error) {
    return next(error)
  }
}