const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { errMessage } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AppError(401, errMessage.authRequired));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new AppError(401, errMessage.authRequired));
  }

  req.user = payload;
  next();
};
