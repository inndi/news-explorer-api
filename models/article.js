const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  owner: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
