
//REPL

// Read-Eval-Print-loop
























// Events Emitter

// const express=require('express')

// const app=express();

// const EventEmitter=require('events');

// const event= new EventEmitter();

// let count=0;
// event.on("countAPI",()=>{

//    count++;
//    console.log( "event Called",count);
// })


// app.get("/",(req,res)=>{

//   res.send('api called')
//   event.emit("countAPI")
// })

// app.get("/search",(req,res)=>{

//   res.send(' search api called')

//   event.emit("countAPI")
// })

// app.get("/update",(req,res)=>{

//   res.send(' update api called')

//   event.emit("countAPI")

// })



// app.listen(8000,()=>{

//    console.log(`serve listen on ${8000}`)
// })



///////////////////////////////////////////////////
////////////////////////////////////////////////////




// os module

// const os=require('os');

// // console.log( os.arch())

// // console.log( os.freemem()/(1024*1024*1024)  );

// // console.log( os.totalmem()/(1024*1024*1024)  );

// // console.log(os.hostname())
// // console.log(os.platform());

//  console.log( os.userInfo())


///////////////////////

///////////////////////////////


// const express = require("express");

// const multer = require("multer");

// const app = express();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//     }
//   })
// }).single("user_file")

// app.post("/upload", upload, (req, res) => {
//   res.send("file upload");
// });

// app.listen(8000, () => {
//   console.log(`port is listing ${8000}...`);
// });
