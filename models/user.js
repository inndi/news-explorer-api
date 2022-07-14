const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  }
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // if (!user) {
      //   return Promise.reject(new AppError(403, 'Incorrect password or email'));
      // }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // if (!matched) {
          //   return Promise.reject(new AppError(403, 'Incorrect password or email'));
          // }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
