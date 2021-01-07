const Cart = require('../models/cart.model');
const CartDetail = require('../models/cartDetail');
const Statistical = require('../models/statistical.model')
const Product = require('../models/product.model');
const Customer = require('../models/user.model');
const moment = require('moment-timezone');
const { omit } = require('lodash');

exports.getAllCart =async (req,res,next) => {
  try {
    const cart = await Cart.find();
    if(cart){
      res.status(200);
      return res.json({ data: cart });
    }else{
      res.status(400);
      return res.json({message: 'không có đơn hàng nào'});
    }
  } catch (error) {
    return next(error)
  }
}

exports.getAllCartIdUser =async (req,res,next) => {
  try {
    console.log(req.query.idUser, 'req.query.idUser')
    const cart = await Cart.find({_id_user: req.query.idUser});
    if(cart){
      res.status(200);
      return res.json({ data: cart });
    }else{
      res.status(400);
      return res.json({message: 'không có đơn hàng nào'});
    }
  } catch (error) {
    return next(error)
  }
}

exports.getAllCartDetail =async (req,res,next) => {
  try {
    const cartDetail = await CartDetail.find({_cart: req.query.carDetail})
    .populate('_product', Product)
    .populate('_cart', Cart);;
    if(cartDetail){
      res.status(200);
      return res.json({ data: cartDetail });
    }else{
      res.status(400);
      return res.json({message: 'không có đơn hàng nào'});
    }
  } catch (error) {
    return next(error)
  }
}

exports.createCart = async (req, res, next) => {
  try {
    const year = new Date().getFullYear();
    const cartData = {
      "_id_user": req.body._id_user,
      "name": req.body.name,
      "address": req.body.address,
      "numberPhone": req.body.numberPhone,
      "totalMoney": req.body.totalMoney,
    }
    const cartDataSave = omit(cartData);
    const cart = await new Cart(cartDataSave).save();
    if(cart) {
      const product = req.body._product;
      product.map(async (item) => {
        let check  = true;
        let cartDetailData = {
          "_product": item._product,
          "_cart": cart._id,
          "quantity": item.quantity,
          "priceProduct": item.priceProduct,
        }
        const cartDetailSave = omit(cartDetailData);
        await new CartDetail(cartDetailSave).save();

        const statistical = await Statistical.find();
        console.log(statistical, 'statistical')
        if(statistical.length === 0) {
          const statisticaltmp = {
            "year": year,
            totalnumber: item.quantity+1
          }
          const statisticalSave = omit(statisticaltmp);
          await new Statistical(statisticalSave).save();
        }else{
          statistical.forEach(async (items) => {
            if(items.year === year) {
              check = false;
              let numberPoint = items.totalnumber += item.quantity;
              await Statistical.findByIdAndUpdate({_id: items._id}, { "totalnumber": numberPoint});
            }
          })
        }
        if(check){
          const statisticaltmps = {
            "year": year,
            totalnumber: item.quantity
          }
          const statisticalSaves = omit(statisticaltmps);
          await new Statistical(statisticalSaves).save();
        }

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

exports.removeCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndRemove({_id: req.query.idCart});
    await CartDetail.remove({_cart: req.query.idCart});
    res.status(200);
    return res.json({message: "thanh công"});
  } catch (error) {
    return next(error)
  }
}

exports.statistical = async (req, res, next) => {
  try {
    const statistical = await Statistical.find();
    res.status(200);
    return res.json({data: statistical});
  } catch (error) {
    return next(error)
  }
}