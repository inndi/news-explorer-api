const AppError = require('./AppError');

const handleKnownError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({ message });
};

const handleUnknownError = (err, res) => {
  res.status(500).send({ message: 'An error occurred on the server' });
};

module.exports.handleError = (err, res) => {
  err instanceof AppError ? handleKnownError(err, res) : handleUnknownError(err, res);
};
