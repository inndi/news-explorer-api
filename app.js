const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/newsexplorer');

// app.use(auth);

app.use('/users', userRouter);
app.use('/articles', articleRouter);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});