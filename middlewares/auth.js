const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AppError(401, 'Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, '4b0996963f9be042b22513a58bddaa061e7b9639840e0ad6687ebba5797cb992');
  } catch (e) {
    next(new AppError(401, 'Authorization required'));
  };

  req.user = payload;
  next();
}
