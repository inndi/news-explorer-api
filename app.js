const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const app = express();

const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const registerRouter = require('./routes/signup');
const loginRouter = require('./routes/signin');
const auth = require('./middlewares/auth');
const AppError = require('./errors/AppError');
const { handleError } = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimiter');
const { errMessage } = require('./utils/constants');

const { DB_ADDRESS } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

mongoose.connect(DB_ADDRESS);

app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use('/signup', registerRouter);
app.use('/signin', loginRouter);

app.use(auth);

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.get('*', (req, res) => next(new AppError(404, errMessage.invalidRoute)));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => { handleError(err, res); });

const { PORT = 3003 } = process.env;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
