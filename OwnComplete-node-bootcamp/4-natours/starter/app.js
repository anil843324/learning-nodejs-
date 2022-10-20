const express = require('express');

const morgan = require('morgan');

const  AppError=require('./utils/appError')
const globalErrorHandler=require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');

const userRouter = require('./routes/userRoutes');

const app = express();

// 1. middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// v1= verson of api

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3. router

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

// handle non match route

app.all('*', (req, res, next) => {

 next( new AppError(`Can't find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);

module.exports = app;
