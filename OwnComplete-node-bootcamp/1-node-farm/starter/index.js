const fs = require("fs"); //function for reading data and writing data right to the file system
const http=require('http');
const url=require('url');


// own moduel

 const replaceTemplate= require('./modules/replaceTemplate')


///////////////////////////////////////////////////////////////////////////////////
// FILES
// Blocking , synchronous way

// how to read file

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");



//   console.log(textIn)

// how to write to files.

// const textOut = ` This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()} `;

// fs.writeFileSync("./txt/output.txt", textOut);

// console.log('File written ');

// Non-blocking, asynchrounous way

// fs.readFile("./txt/start.txt", "utf-8", (err1, data1) => {

//       if(err1) return console.log('Error 😢')

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err2, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err3, data3) => {
//       console.log(data3);
//       // write file
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err4) => {
//         console.log("yor file has been writen😁");
//       });
//     });
//   });
// });

// console.log("will read file!");

///////////////////////////////////////////////////////////////////////////////////
// SERVER


const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');

const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');

const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

 const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')

     const  dataObj= JSON.parse(data);

 const server=http.createServer((req,res)=>{
   
       
          const {query,pathname} = url.parse(req.url,true)
           


      // Overview page
     if( pathname==='/' || pathname==='/overview'){

          res.writeHead(200,{'Content-type':'text/html' });

          
          // tempCard
      const cardsHtml= dataObj.map(ele=>  replaceTemplate(tempCard,ele)).join('');

      const  output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
           
            
          res.end(output);
          // product page
     }else if(pathname==='/product'){

          res.writeHead(200,{'Content-type':'text/html' });
          const product=dataObj[query.id]
            const output=replaceTemplate(tempProduct,product)
           



          res.end(output);
          // api
     }else if(pathname==='/api'){
         
          res.writeHead(200,{'Content-type':'application/json' });
          res.end(data);
         
          // not found
     }else{

           res.writeHead(404,{
               'Content-type' :'text/html',
               'my-own-header':'hello-world'
           });
          res.end('<h1>  Page  not found!</h1>');
     }
    

})

server.listen(8000,'127.0.0.1',()=>{
     console.log('listening  to requests on port 8000')
});






