const fs = require('fs');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const Tour = require('../../models/tourModel');
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, // warning added
  })
  .then(() => console.log('DB connection successful'));

// read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// import data in to database

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users,{validateBeforeSave:false});
    await Review.create(reviews);

    console.log('data successfully loaded!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// delete all data from database
const deleteData = async () => {
    try {
      await  Tour.deleteMany();
      await  User.deleteMany();
      await  Review.deleteMany();
  
      console.log('data successfully deleted!');
       process.exit();
    } catch (error) {
      console.log(error);
    }
  };

// if(process.arg[2] === '--delete'){
//     deleteData();
// }else if(process.arg[2] === '--import'){
//   importData()
// }



// //  console.log( process.argv[2])  

importData()
