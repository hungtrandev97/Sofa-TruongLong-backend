const Setting = require('../models/setting.model');
const { omit } = require('lodash');

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
    const settingData = omit(req.body);
    const findImage = await Setting.find();
    const findCound = findImage[0].CountPoint;
    console.log(findCound, 'asdjkajksdkla')
      const settingUpdate = await Setting.findByIdAndUpdate({_id: findImage[0]._id},settingData, {new: true})
      const settingUpdateTransformed = settingUpdate.transform();
      res.status(200);
      return res.json({data: settingUpdateTransformed });
    
  } catch (error) {
    return next(error)
  }
}