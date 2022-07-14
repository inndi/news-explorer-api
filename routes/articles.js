const router = require('express').Router();
const validator = require('validator');
const celebrate = require('celebrate');

const { getSavedArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getSavedArticles);
router.post('/', createArticle);
router.delete('/articleId', deleteArticle);

module.exports = router;
