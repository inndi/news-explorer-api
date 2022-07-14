const User = require('../models/user');

module.exports.getCurrentUser = (req, res, next) => {/////////////////////next
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new AppError(404, 'No user with matching ID found');///////////////////
      }
      res.send(user)
    })
    .catch((err) => { console.log(err) });///////////////////////
}
