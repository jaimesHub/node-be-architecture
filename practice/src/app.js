const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const app = express();

// init middlewares
app.use(morgan('dev'));
// morgan('dev')
// morgan('combined') - for production environment
// morgan('common') - apache standard
// morgan('short')
// morgan('tiny')
app.use(helmet());
app.use(compression());

// init db

// init routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome to BE NodeJS Architecture Project!',
  })
});

// handling errors

module.exports = app;