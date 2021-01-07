const Product = require('../models/product.model');
const Customer = require('../models/user.model');
const Category = require('../models/category.model');
const CartDetail = require('../models/cartDetail');
const Cart = require('../models/cart.model');

const { omit } = require('lodash');

exports.CreateProduct = async (req, res, next) => {
  try {
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
    .populate('_category', Category)
    .populate('_manager', Customer);
    const lenghtData = getAllProduct.length
    res.status(200);
    return res.json({lenghtData: lenghtData ,data: getAllProduct });
  } catch (error) {
    return next(error);
  }
}

exports.GetAllProductNew = async (req, res, next) => {
  try {
    const getAllProduct = await Product.find({"product_new": 1})
    .populate('_category', Category)
    .populate('_manager', Customer);
    const lenghtData = getAllProduct.length
    res.status(200);
    return res.json({lenghtData: lenghtData ,data: getAllProduct });
  } catch (error) {
    return next(error);
  }
}

exports.GetAllProductIndex = async (req, res, next) => {
  try {
    const getAllProduct = await Product.find({"product_index": 1})
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
    const getOneProduct = await Product.find({_id: req.query.id_product})
    .populate('_category', Category)
    .populate('_manager', Customer);
    if(getOneProduct != ""){
      res.status(200);
      return res.json({data: getOneProduct });
    }else{
      res.status(250);
      return res.json({message: 'Không tìm thấy sản phẩm'});
    }
    
  } catch (error) {
    return next(error);
  }
}

exports.GetAllProductPrice = async (req,res,next) => {
  try {
    if(req.query.product_price > 0) {
      const getOneProduct = await Product.find({product_priceNumber_sale: {$lt : req.query.product_price}})
      .populate('_category', Category)
      .populate('_manager', Customer);
      if(getOneProduct != ""){
        res.status(200);
        return res.json({data: getOneProduct });
      }else{
        res.status(400);
        return res.json({message: 'Không tìm thấy sản phẩm'});
      }
    }else {
      const getOneProduct = await Product.find()
      .populate('_category', Category)
      .populate('_manager', Customer);
      if(getOneProduct != ""){
        res.status(200);
        return res.json({data: getOneProduct });
      }else{
        res.status(400);
        return res.json({message: 'Không tìm thấy sản phẩm'});
      }
    }
  } catch (error) {
    return next(error);
  }
}

exports.GetAllProductPriceSale = async (req,res,next) => {
  try {
    const getOneProduct = await Product.find({product_price_sale: {$ne : ""}})
    .populate('_category', Category)
    .populate('_manager', Customer);
    if(getOneProduct != ""){
      res.status(200);
      return res.json({data: getOneProduct });
    }else{
      res.status(400);
      return res.json({message: 'Không tìm thấy sản phẩm'});
    }
  } catch (error) {
    return next(error);
  }
}

exports.GetAllProductCategory = async (req,res,next) => {
  try {
    const GetAllProductCategory = await Product.find({"_category": req.query.id_category})
    .populate('_category', Category)
    .populate('_manager', Customer);
    if(GetAllProductCategory != ""){
      res.status(200);
      return res.json({data: GetAllProductCategory });
    }else{
      res.status(400);
      return res.json({message: 'Không tìm thấy sản phẩm'});
    }
  } catch (error) {
    return next(error);
  }
}

exports.GetAllProductNew = async (req,res,next) => {
  try {
    const getOneProduct = await Product.find({product_new: 1})
    .populate('_category', Category)
    .populate('_manager', Customer);
    if(getOneProduct != ""){
      res.status(200);
      return res.json({data: getOneProduct });
    }else{
      res.status(400);
      return res.json({message: 'Không tìm thấy sản phẩm'});
    }
  } catch (error) {
    return next(error);
  }
}

exports.EditProduct = async (req, res, next) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate({_id: req.query.id_product}, req.body, {new: true})
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
      .populate('_manager', Customer);
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

exports.SearchProduct = async (req,res,next) => {
  try {
    const getProductSearch = await Product.find({product_title: {$regex: req.query.search,$options: 'i'}})
    .populate('_category', Category)
    .populate('_manager', Customer);
    const lenghtData = getProductSearch.length
    res.status(200);
    return res.json({lenghtData: lenghtData ,data: getProductSearch });
  } catch (error) {
    return next(error);
  }
}

exports.getAllProductCart = async (req,res,next) => {
  try {
    const getProductSearch = await CartDetail.find({_product: req.query.id_product})
    .populate('_cart', Cart);
    const lenghtData = getProductSearch.length
    res.status(200);
    return res.json({lenghtData: lenghtData ,data: getProductSearch });
  } catch (error) {
    return next(error);
  }
}