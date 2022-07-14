const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { login } = require('../controllers/users');

router.post('/', login);

module.exports = router;
