const express = require('express');

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');

const userRouter = require('./routes/userRoutes');

const app = express();

// 1. middleware

if(process.env.NODE_ENV=== 'development'){
  
  app.use(morgan('dev'));
}


app.use(express.json());

app.use( express.static(`${__dirname}/public`))

// v1= verson of api

// Refectring of route

app.use((req, res, next) => {
  console.log('hello from middleware');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3. router

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

module.exports = app;
