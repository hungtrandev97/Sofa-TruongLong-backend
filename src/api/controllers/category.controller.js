const { omit } = require('lodash');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

exports.CreateCategory = async (req, res, next) => {
  try {
    const categoryData = omit(req.body);
    const checkCategory = await Category.findOne({'category_title' : req.body.category_title})
    if(checkCategory) {
      const categorySave = await new Category(categoryData).save();
      if(categorySave) {
        const listCategory = await new Category.find();
        const categoryTransformed = listCategory.transform();
        res.status(200);
        return res.json({ data: categoryTransformed });
      }else{
        res.status(400);
        return res.json({message: 'Tạo danh mục không thành công'});
      }
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
    const lenghtData = getAllCategory.length
    console.log(getAllCategory.length, 'getAllCategory')
      res.status(200);
      return res.json({lenghtData: lenghtData ,data: getAllCategory });
  } catch (error) {
    return next(error);
  }
}

exports.EditCategory = async (req, res, next) => {
  try {
    const categoryBody ={
      "category_title": req.body.category_title
    }
    const updateCategory = await Category.findByIdAndUpdate({_id: req.query.id_category}, categoryBody, {new: true})
    if(updateCategory) {
      const getAllCategory = await Category.find();
      const lenghtData = getAllCategory.length
      res.status(200);
      return res.json({lenghtData: lenghtData ,data: getAllCategory });
    }else{
      res.status(250);
      return res.json({message: 'Không tìm thấy danh mục'});
    }
  } catch (error) {
    return next(error);
  }
}

exports.RemoveCategory = async (req, res, next) => {
  try {
    const checkProduct = await Product.find({_category: req.query.id_category});
    if(checkProduct) {
      const removeCategory = await Category.findByIdAndRemove({_id: req.query.id_category})
      if(removeCategory) {
        const getAllCategory = await Category.find();
        const lenghtData = getAllCategory.length
        res.status(200);
        return res.json({lenghtData: lenghtData ,data: getAllCategory });
      }else{
        res.status(250);
        return res.json({message: 'Không tìm thấy danh mục'});
      }
    }else{
        res.status(400);
        return res.json({message: 'Danh mục đang có sản phẩm, vui lòng xóa sản phẩm trước'});
    }
  } catch (error) {
    return next(error);
  }
}