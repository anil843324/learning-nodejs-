const express=require('express');

 const app=express();
// middleware

const  reqFilter=(req,res,next)=>{

     if(!req.query.age){
        res.send('Please provide age')
     }
     else if(req.query.age <18){
        res.send('You can not access this page because age below 18')
     }
      else{
        next();
     }
   
} 

app.use(reqFilter)



 app.get( '',(req,res)=>{

     res.send('Welcome to Home Page')

 })


 
 app.get( '/users',(req,res)=>{

    res.send('Welcome to Users Page')

})

app.listen(8000)

