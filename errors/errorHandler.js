const AppError = require('./AppError');

const handleKnownError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({ message });
};

const handleUnknownError = (err, res) => {
  console.log(err);
  res.status(500).send({ message: err });
};

module.exports.handleError = (err, res) => {
  err instanceof AppError ? handleKnownError(err, res) : handleUnknownError(err, res);
};
