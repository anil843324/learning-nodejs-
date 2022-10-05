const express = require("express");

require("./config");

const product = require("./products");

const app = express();



app.listen(8000, () => {
  console.log(`port is listing ${8000}...`);
});
