const Setting = require('../models/setting.model');
const { omit } = require('lodash');

exports.UpdateSetting = async (req, res, next) => {
  try {
    const settingData = omit(req.body);
    const findImage = await Setting.findOne();
    if(findImage.length > 0) {
      const settingUpdate = await Setting.findByIdAndUpdate({_id: findImage._id},settingData, {new: true})
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