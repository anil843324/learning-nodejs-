const  express=require('express')

const app=express();

app.get('',(req,res)=>{
  
    res.send(` 
    <h1> Welcome , to Home page </h1>
    <a href="/about">Go to about page</a>
    `);
})

app.get('/about',(req,res)=>{

    res.send(`
    <input type="text"  placeholder="User Name" value="${req.query.name}">
    <button>
    Click Me
   </button>
   <a href="/">Go to Home page</a>

    `);
})


app.get("/help",(req,res)=>{
     
    res.send([
        {
            name :'anil',
            email:"anilkrsingh142200@gmail.com"
       },
       {
        name :'sunil',
        email:"sunilkrsingh142200@gmail.com"
   },
   {
    name :'Ratan',
    email:"ratan0@gmail.com"
}
    ])
})


app.listen(8080);