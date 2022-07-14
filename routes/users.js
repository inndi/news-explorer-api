const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const { getCurrentUser } = require('../controllers/users');

router.get('/me', getCurrentUser);

module.exports = router;
