const Article = require('../controllers/articles');

module.exports.getSavedArticles = (req, res, next) => {///////////////////////next
  Article.find({})
    .then((articles) => {
      if (!articles) {
        throw new AppError(404, 'No articles found.');///////////////////
      }
      res.send(articles);
    })
    .catch((err) => console.log(err));/////////////////////////
}

module.exports.createArticle = (req, res, next) => {//////////////////next
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image
  } = req.params;

  const owner = req.user._id;////////////////////////

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner
  })
    .then((article) => {
      if (!article) {
        throw new AppError(400, 'Invalid data.');/////////////////////
      }
      res.send(article);
    })
    .catch((err) => { console.log(err) });/////////////////////////
}

module.exports.deleteArticle = (req, res, next) => {//////////////////next
  const { id } = req.params;
  const userId = req.user._id;//////////////////////////////////////

  Article.findByIdAndRemove(id)
    .then((removed) => {
      if (!removed) {
        throw new AppError(403, 'Authorization required!');//////////////////
      }
      res.send({ message: 'Article deleted!' });
    })
    .catch((err) => { console.log(err) });///////////////////
}
