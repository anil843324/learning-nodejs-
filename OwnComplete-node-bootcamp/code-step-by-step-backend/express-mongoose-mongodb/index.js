const mongoose = require("mongoose");

  // shemas
  const productSche = new mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    category: String,
  });


const savInDB = async () => {

  await mongoose.connect("mongodb://localhost:27017/e-commerce");

  // model
  const productsModel = mongoose.model("products", productSche);

  let data = new productsModel({
    name: " vivo v20",
    price: 20000,
    brand: "vivo",
    category: "mobile",
  });

  let result = await data.save();

  console.log(result);
};

// savInDB()

