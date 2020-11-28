const httpStatus = require('http-status');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const PasswordResetToken = require('../models/passwordResetToken.model');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');
const { omit } = require('lodash');
const APIError = require('../utils/APIError');
const emailProvider = require('../services/emails/emailProvider');

/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(Customer, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(Customer).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const userData = omit(req.body);
    console.log(req.body, "sakkcaknlalk")
    const checkUser = await User.findOne({'userName' : req.body.userName})
    if(checkUser == null) {
      const user = await new User(userData).save();
      userTransformed = user.transform();
      const token = generateTokenResponse(user, user.token());
      res.status(200);
      return res.json({ token, user: userTransformed });
    }else{
      res.status(250);
      return res.json({message: 'Tên đăng nhập đã tồn tại'});
    }
  } catch (error) {
    return next(error);
  }
};

exports.registerAdmin = async (req, res, next) => {
  try {
    const roleAdmin = {
      role: 1
    }
    const merged = Object.assign({}, req.body, roleAdmin);
    const userData = omit(merged);
    const checkUser = await User.findOne({'userName' : req.body.userName})
    if(checkUser == null) {
      const user = await User(userData).save();
      const DataAcount = await User.find({'role' : 1});
      if(DataAcount) {
        res.status(200);
        return res.json({data: DataAcount });
      }
    }else{
      res.status(250);
      return res.json({message: 'Tên đăng nhập đã tồn tại'});
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login =  async (req, res, next) => {
  try {
    const {user} = await User.findAndGenerateToken(req.body);
    const token = generateTokenResponse(user, user.token());
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req, res, next) => {
  try {
    const { user } = req;
    const accessToken = user.token();
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

exports.sendPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Customer.findOne({ email }).exec();

    if (user) {
      const passwordResetObj = await PasswordResetToken.generate(user);
      emailProvider.sendPasswordReset(passwordResetObj);
      res.status(httpStatus.OK);
      return res.json('success');
    }
    throw new APIError({
      status: httpStatus.UNAUTHORIZED,
      message: 'No account found with that email',
    });
  } catch (error) {
    return next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, password, resetToken } = req.body;
    const resetTokenObject = await PasswordResetToken.findOneAndRemove({
      userEmail: email,
      resetToken,
    });

    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (!resetTokenObject) {
      err.message = 'Cannot find matching reset token';
      throw new APIError(err);
    }
    if (moment().isAfter(resetTokenObject.expires)) {
      err.message = 'Reset token is expired';
      throw new APIError(err);
    }

    const user = await Customer.findOne({ email: resetTokenObject.userEmail }).exec();
    user.password = password;
    await user.save();
    emailProvider.sendPasswordChangeEmail(user);

    res.status(httpStatus.OK);
    return res.json('Password Updated');
  } catch (error) {
    return next(error);
  }
};

exports.getAllAcountAdmin = async (req, res, next) => {
  try {
    const DataAcount = await User.find({'role' : 1});
    if(DataAcount) {
      res.status(200);
      return res.json({data: DataAcount });
    }else{
      res.status(400);
      return res.json({message: 'Không tìm thấy tài khoản'});
    }
  } catch (error) {
    return next(error);
  }
}

exports.getAllAcountUser = async (req, res, next) => {
  try {
    const DataAcount = await User.find({'role' : 2});
    if(DataAcount) {
      res.status(200);
      return res.json({data: DataAcount });
    }else{
      res.status(400);
      return res.json({message: 'Không tìm thấy tài khoản'});
    }
  } catch (error) {
    return next(error);
  }
}

exports.getOneAcount = async (req, res, next) => {
  try {
    const DataAcount = await User.findOne({'_id' : req.query.id_acount})
    if(DataAcount) {
      res.status(200);
      return res.json({data: DataAcount });
    }else{
      res.status(400);
      return res.json({message: 'Không tìm thấy tài khoản'});
    }
  } catch (error) {
    return next(error);
  }
}
