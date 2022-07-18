const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const { getSavedArticles, createArticle, deleteArticle } = require('../controllers/articles');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  };

  return helpers.error('string.uri');
};

router.get('/', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }).unknown(true),
}), getSavedArticles);

router.post('/', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }).unknown(true),
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateURL),
    image: Joi.string().required().custom(validateURL),
  }),
}), createArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }).unknown(true),
}), deleteArticle);

module.exports = router;
