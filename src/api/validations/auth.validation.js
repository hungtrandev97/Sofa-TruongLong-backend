const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  register: {
    body: {
      userName: Joi.string()
        .required(),
      password: Joi.string()
        .required(),
      // email: Joi.string()
      //   .email()
      //   .required(),
      gender: Joi.number()
        .required(),
      address: Joi.string()
        .required(),
      numberPhone: Joi.string()
        .required(),
      role: Joi.number()
    },
  },

  // POST /v1/auth/login
  login: {
    body: {
      userName: Joi.string()
        .required(),
      password: Joi.string()
        .required(),
    },
  },

  // POST /v1/auth/facebook
  // POST /v1/auth/google
  oAuth: {
    body: {
      access_token: Joi.string().required(),
    },
  },

  // POST /v1/auth/refresh
  refresh: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      refreshToken: Joi.string().required(),
    },
  },

  // POST /v1/auth/refresh
  sendPasswordReset: {
    body: {
      email: Joi.string()
        .email()
        .required(),
    },
  },

  // POST /v1/auth/password-reset
  passwordReset: {
    body: {
      // email: Joi.string()
      //   .email()
      //   .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
      resetToken: Joi.string().required(),
    },
  },

  getOneAcount: {
    query: {
      id_acount: Joi.string().required()
    }
  },

  removeAcount: {
    query: {
      id_acount: Joi.string().required()
    }
  },

  editAcount: {
    query: {
      id_acount: Joi.string().required()
    },
    body: {
      userName: Joi.string()
        .required(),
      // email: Joi.string()
      //   .email()
      //   .required(),
      gender: Joi.number()
        .required(),
      address: Joi.string()
        .required(),
      numberPhone: Joi.string()
        .required(),
      role: Joi.number().required(),
    },
  }
};
