const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const app = express();

const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const registerRouter = require('./routes/signup');
const loginRouter = require('./routes/signin');
const auth = require('./middlewares/auth');
const AppError = require('./errors/AppError');
const { handleError } = require('./errors/errorHandler');
const { requestLogger,
  errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsexplorer');

app.use((req, res, next) => {
  req.user = {
    _id: '6290ae8fb3ff4b8e7d9f2867',
  };
  next();
});

app.use(requestLogger);
app.use(helmet());

app.use('/signup', registerRouter);
app.use('/signin', loginRouter);

app.use(auth);

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.get('*', (req, res) => next(new AppError(404, 'Requested resource not found')));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => { handleError(err, res); });

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});