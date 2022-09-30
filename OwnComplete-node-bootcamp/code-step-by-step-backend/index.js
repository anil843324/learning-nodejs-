const  express=require('express')

const app=express();

app.get('',(req,res)=>{

     console.log('Data sent by brower =>>>>',req.query.name)
     
    res.send('Welcome to Home ' +req.query.name);
})

app.get('/about',(req,res)=>{

    res.send('Hello , this is About page');
})


app.listen(8080);