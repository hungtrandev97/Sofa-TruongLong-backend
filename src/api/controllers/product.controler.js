const Product = require('../models/product.model');
const Customer = require('../models/user.model');
const Category = require('../models/category.model');

const { omit } = require('lodash');

exports.CreateProduct = async (req, res, next) => {
  try {
    console.log(req.body)
    const productData = omit(req.body);
    const product = await new Product(productData).save();
    const productTransformed = product.transform();
    res.status(200);
      return res.json({ data: productTransformed });
  } catch (error) {
    return next(error)
  }
}

exports.GetAllProduct = async (req, res, next) => {
  try {
    const getAllProduct = await Product.find()
    .sort({'product_date_added': -1})
    .populate('_category', Category)
    .populate('_manager', Customer);
    const lenghtData = getAllProduct.length
    res.status(200);
    return res.json({lenghtData: lenghtData ,data: getAllProduct });
  } catch (error) {
    return next(error);
  }
}

exports.GetOneProduct = async (req, res, next) => {
  try {
    const getOneProduct = await Product.findById({_id : req.query.id_product})
    .populate('_category', Category)
    .populate('_manager', Customer);
    res.status(200);
    return res.json({data: getOneProduct });
  } catch (error) {
    return next(error);
  }
}

exports.EditProduct = async (req, res, next) => {
  try {
    console.log(req.body)
    console.log(req.query)
    const productBody ={
      "product_title": req.body.product_title,
      "product_code": req.body.product_code,
      "product_discript": req.body.product_discript,
      "product_image": req.body.product_image,
      "product_price": req.body.product_price,
      "product_price_sale": req.body.product_price_sale,
      "product_new": req.body.product_new,
      "product_size": req.body.product_size,
    }
    const updateProduct = await Product.findByIdAndUpdate({_id: req.query.id_product}, productBody, {new: true})
    if(updateProduct) {
      const getAllProduct = await Product.find()
      .populate('_category', Category)
      .populate('_manager', Customer);
      const lenghtData = getAllProduct.length
      res.status(200);
      return res.json({lenghtData: lenghtData ,data: getAllProduct });
    }else{
      res.status(250);
      return res.json({message: 'Không tìm thấy danh mục'});
    }
  } catch (error) {
    return next(error)
  }
}

exports.RemoveProduct = async (req, res, next) => {
  try {
    const removeProduct = await Product.findByIdAndRemove({_id: req.query.id_product})
    if(removeProduct) {
      const getAllProduct = await Product.find()
      .populate('_category', Category)
      .populate('_manager', Customer);;;
      const lenghtData = getAllProduct.length
      res.status(200);
      return res.json({lenghtData: lenghtData ,data: getAllProduct });
    }else{
      res.status(250);
      return res.json({message: 'Không tìm thấy sản phẩm'});
    }
  } catch (error) {
    return next(error);
  }
}