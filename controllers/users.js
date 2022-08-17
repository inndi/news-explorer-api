const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const AppError = require('../errors/AppError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { errMessage } = require('../utils/constants');

module.exports.getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new AppError(404, errMessage.invalidUserId);
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      if (!user) {
        throw new AppError(409, errMessage.existingEmail);
      }
      const newUser = user.toObject();
      delete newUser.password;

      res.send(newUser);
    })
    .catch((err) => err.code === 11000
      ? next(new AppError(409, errMessage.existingEmail)) : next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AppError(401, errMessage.invalidCredentials);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
