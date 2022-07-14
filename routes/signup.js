const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { createUser } = require('../controllers/users');

router.post('/', createUser);

module.exports = router;
