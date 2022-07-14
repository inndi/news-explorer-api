const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.getCurrentUser = (req, res, next) => {/////////////////////next
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      // if (!user) {
      //   throw new AppError(404, 'No user with matching ID found');///////////////////
      // }
      res.send(user)
    })
    .catch((err) => { console.log(err) });///////////////////////
}

module.exports.createUser = (req, res, next) => {//////////////////next

  console.log('bla');
  const { email, password, name } = req.body;
  console.log('hi', email, password, name);

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      if (!user) {
        console.log('bla1');
        // throw new AppError(409, 'An email already exists')///////////////////
      }
      res.send(user);
    })
    .catch((err) => { console.log(err) });/////////////////////////
}

module.exports.login = (req, res, next) => {///////////////next
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // if (!user) {
      //   throw new AppError(400, 'Incorrect password or email');////////////////////
      // }
      const token = jwt.sign(
        { _id: user._id },
        '4b0996963f9be042b22513a58bddaa061e7b9639840e0ad6687ebba5797cb992', ///////////////////////////
        { expiresIn: '7d' },
      );
      res.send(token);
    })
    .catch((err) => { console.log(err) });////////////////////////
}
