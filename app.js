require('dotenv').config();
require('express-async-errors');

//server
const express = require('express');
const app = express();

//routes
const mainRouter = require('./routes/main');

//error/notfound middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// implement middleware
app.use(express.static('./public'));
app.use(express.json()); //recall, access req.body when it comes in

app.use('/api/v1', mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();