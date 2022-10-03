const express=require('express');

require('./config');

const product=require('./products')

 const app=express();

// post method

app.use(express.json())

app.post('/create', async (req,res)=>{

    let data= new product(req.body);

    let result= await data.save()

  console.log(result)

  res.send(result)

 })

   app.listen(8000)
