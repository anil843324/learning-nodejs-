const fs = require("fs"); //function for reading data and writing data right to the file system
const http=require('http');
const url=require('url');



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

// 
 const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
     const  dataObj= JSON.parse(data);

 const server=http.createServer((req,res)=>{
   
     const pathName= req.url;
      
     if( pathName==='/' || pathName==='/overview'){
          res.end('This is the OVERVIEW!');
     }else if(pathName==='/product'){
          res.end('This is the PRODUCT!');
     }else if(pathName==='/api'){
         
          res.writeHead(200,{'Content-type':'application/json' });
          res.end(data);
         
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






