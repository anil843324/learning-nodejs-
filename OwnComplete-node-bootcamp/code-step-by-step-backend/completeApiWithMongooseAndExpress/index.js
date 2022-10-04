const express = require("express");

require("./config");

const product = require("./products");

const app = express();

// post method

app.use(express.json());

app.post("/create", async (req, res) => {
  let data = new product(req.body);

  let result = await data.save();

  console.log(result);

  res.send(result);
});

// get data
app.get("/list", async (req, res) => {
  let data = await product.find();

  res.send(data);
});

// delete data
app.delete("/delete/:_id", async (req, res) => {
  console.log(req.params);

  let data = await product.deleteOne(req.params);

  res.send(data);
});

//update data

app.put("/update/:_id", async (req, res) => {
  console.log(req.params);

  let data = await product.updateOne(
    req.params, // condition
    { $set: req.body } // $set updated data
  );

  res.send(data);
});

app.listen(8000, () => {
  console.log(`port is listing ${8000}...`);
});
