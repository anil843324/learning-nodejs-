const express = require("express");
// interview questoon  what is path module
// anser ;-> it helps to access  folder of your project 
const path=require('path');


const app = express();


const publicPath=path.join(__dirname,'public')


 app.set('view engine','ejs');
// given folder path
//  console.log(__dirname);
// what is static mehtod 
// anser:-> it helps to load your static page or static content
// app.use(express.static(publicPath))

app.get('',(_,res)=>{

     res.sendFile( `${publicPath}/index.html`)


})

app.get('/about',(_,res)=>{

    res.sendFile( `${publicPath}/about.html`)

})

app.get('/contact',(_,res)=>{

    res.sendFile( `${publicPath}/contact.html`)

})

app.get('/help',(_,res)=>{

    res.sendFile( `${publicPath}/help.html`)

})

app.get('/profile',(_,res)=>{

      const user={
         name:'anil kumar',
         email:"anilkrsingh142200@gmail.com",
         city:"Patna"
      }
    res.render('profile',{user})

})

app.get('*',(_,res)=>{

    res.sendFile( `${publicPath}/pageNotFound.html`)

})



app.listen(8080);

























// app.get("", (req, res) => {
//   res.send(` 
//     <h1> Welcome , to Home page </h1>
//     <a href="/about">Go to about page</a>
//     `);
// });

// app.get("/about", (req, res) => {
//   res.send(`
//     <input type="text"  placeholder="User Name" value="${req.query.name}">
//     <button>
//     Click Me
//    </button>
//    <a href="/">Go to Home page</a>

//     `);
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "anil",
//       email: "anilkrsingh142200@gmail.com",
//     },
//     {
//       name: "sunil",
//       email: "sunilkrsingh142200@gmail.com",
//     },
//     {
//       name: "Ratan",
//       email: "ratan0@gmail.com",
//     },
//   ]);
// });

// app.listen(8080);
