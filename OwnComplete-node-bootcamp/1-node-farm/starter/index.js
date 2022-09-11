const fs = require("fs"); //function for reading data and writing data right to the file system
const http=require('http');




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

 const server=http.createServer((req,res)=>{
     
     res.end('hello from the server!');

})

server.listen(8000,'127.0.0.1',()=>{
     console.log('listening  to requests on port 8000')
});






