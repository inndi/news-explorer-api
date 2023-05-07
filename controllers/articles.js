const Article = require('../models/article');
const AppError = require('../errors/AppError');
const { errMessage, resMessage } = require('../utils/constants');

module.exports.getSavedArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({}).select('+owner')
    .then((articles) => {
      res.send(articles.filter((article) => article.owner === owner));
    })
    .catch(next);
};

module.exports.createArticle = async (req, res, next) => {
  const amountOfSavedArticles = await Article.countDocuments({});
  if ((amountOfSavedArticles) < 100) {
    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = req.body;

    const owner = req.user._id;

    Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner,
    })
      .then((article) => {
        if (!article) {
          throw new AppError(400, errMessage.invalidData);
        }
        res.send(article);
      })
      .catch(next);
  }
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findById(articleId).select('owner')
    .then((article) => {
      if (!article) {
        throw new AppError(404, errMessage.invalidArtId);
      }

      if (userId === article.owner) {
        Article.findByIdAndRemove(articleId)
          .then((removed) => {
            if (!removed) {
              throw new AppError(401, errMessage.authRequired);
            }
            res.send({ message: resMessage.successArtDeleting, removedArticle: removed });
          })
          .catch(next);
      } else {
        throw new AppError(401, errMessage.authRequired);
      }
    })
    .catch(next);
};
