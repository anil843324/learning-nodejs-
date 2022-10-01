const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const database = "e-commerce";

const clinet = new MongoClient(url);

async function getData() {

  let result = await clinet.connect();

  let db = result.db(database);

  let collection = db.collection("products");

  let response = await collection.find({}).toArray();

  console.log(response);
}

getData();




// middleware
// const express=require('express');

//  const reqFilter=require('./middleware')
//  const app=express();

// const route=express.Router()

// // middleware

// // app.use(reqFilter)

// route.use(reqFilter)

//  app.get( '',(req,res)=>{

//      res.send('Welcome to Home Page')

//  })

//  app.get( '/users' ,(req,res)=>{

//     res.send('Welcome to Users Page')

// })

// route.get( '/about', (req,res)=>{

//    res.send('Welcome to About Page')

// })

// route.get( '/contact',(req,res)=>{

//    res.send('Welcome to Contact Page')

// })

// app.use('/',route)

// app.listen(8000)
