const Setting = require('../models/setting.model');
const { omit } = require('lodash');

exports.getAllSetting = async (req,res, next) => {
  try {
    const settingAll = await Setting.find();
    res.status(200);
    return res.json({data: settingAll });
  } catch (error) {
    return next(error)
  }
}

exports.UpdateSetting = async (req, res, next) => {
  try {
    const settingData = omit(req.body);
    const findImage = await Setting.find();
    if(findImage && findImage.length > 0) {
      const settingUpdate = await Setting.findByIdAndUpdate({_id: findImage[0]._id},settingData, {new: true})
      const settingUpdateTransformed = settingUpdate.transform();
      res.status(200);
      return res.json({data: settingUpdateTransformed });
    }else{
      const setting = await new Setting(settingData).save();
      const settingTransformed = setting.transform();
      res.status(200);
      return res.json({ data: settingTransformed });
    }
  } catch (error) {
    return next(error)
  }
}

exports.updatePoind = async (req, res, body) => {
  try {
    let numbePoint = 1
    const findImage = await Setting.find();
    if(findImage.length > 0) {
      numbePoint += findImage[0].CountPoint
    }else {
      numbePoint = 1
    }
    const settingDatas = [
      imageSlider1 = "chua co thong tin",
      imageSlider1Url= "chua co thong tin",
      imageSlider2="chua co thong tin",
      imageSlider2Url="chua co thong tin",
      imageSlider3="chua co thong tin",
      imageSlider3Url="chua co thong tin",
      address="chua co thong tin",
      numberPhone="chua co thong tin",
      numberPhone1="chua co thong tin",
      email="chua co thong tin",
      linkFB="chua co thong tin",
      numberPhoneZallo="chua co thong tin",
      CountPoint = numbePoint
    ]
    const settingData = omit(settingDatas);
    if(findImage && findImage.length > 0) {
      const settingUpdate = await Setting.findByIdAndUpdate({_id: findImage[0]._id},{CountPoint: numbePoint}, {new: true})
      const settingUpdateTransformed = settingUpdate.transform();
      res.status(200);
      return res.json({data: settingUpdateTransformed });
    }else{
      const setting = await new Setting(settingData).save();
      const settingTransformed = setting.transform();
      res.status(200);
      return res.json({ data: settingTransformed });
    }
  } catch (error) {
    return next(error)
  }
}