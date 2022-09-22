const EventEmitter = require("events");

const http = require("http");

class Slaes extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Slaes();

myEmitter.on("newSale", () => {
  console.log("there was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name : Anil");
});

myEmitter.on("newSale", (stock) => {
  console.log(`there are now ${stock},itmes left in stock.`);
});

myEmitter.emit("newSale", 9);

///////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request Recivied");
   console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
   
    console.log("Another request 😁");
  });

  server.on("close", () => {
    console.log("Server Closed");
  });

  server.listen(8000,"127.0.0.1", ()=>{
       
       console.log("waiting for requests...")
  })