const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const { getCurrentUser } = require('../controllers/users');

router.get('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }).unknown(true),
}), getCurrentUser);

module.exports = router;
