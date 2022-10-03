const mongoose = require("mongoose");

// mongoose through connect with mongodb
mongoose.connect("mongodb://localhost:27017/e-commerce");

// shemas
const productSche = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  category: String,
});

// sava data in mongodb
const savInDB = async () => {
  // model
  const productsModel = mongoose.model("products", productSche);

  let data = new productsModel({
    name: " vivo v11",
    price: 10000,
    brand: "vivo",
    category: "mobile",
  });

  let result = await data.save();

  console.log(result);
};

savInDB();

// update data in mongodb

// const updateInDB=()=>{

// }
