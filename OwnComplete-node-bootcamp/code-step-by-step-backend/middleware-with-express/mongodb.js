const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const database = "e-commerce";

const clinet = new MongoClient(url);

module.exports= async function dbConnect() {

  let result = await clinet.connect();

  let db = result.db(database);

   return  db.collection("products");

}

