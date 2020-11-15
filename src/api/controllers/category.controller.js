const httpStatus = require('http-status');
const { omit } = require('lodash');
const Category = require('../models/category.model');

exports.CreateCategory = async (req, res, next) => {
  try {
    console.log(req.body)
    const categoryData = omit(req.body);
    const checkCategory = await Category.findOne({'category_title' : req.body.category_title})
    console.log(checkCategory, 'checkCategory')
    if(checkCategory == null) {
      const category = await new Category(categoryData).save();
      const categoryTransformed = category.transform();
      res.status(200);
      return res.json({ data: categoryTransformed });
    }else{
      res.status(250);
      return res.json({message: 'Tên danh mục đã tồn tại'});
    }
  } catch (error) {
    return next(error);
  }
};

exports.GetAllCategory = async (req, res, next) => {
  try {
    const getAllCategory = await Category.find();
      res.status(200);
      return res.json({ data: getAllCategory });
  } catch (error) {
    return next(error);
  }
}