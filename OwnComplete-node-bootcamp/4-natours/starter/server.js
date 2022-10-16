
 const mongoose=require('mongoose');

const dotenv=require('dotenv');

dotenv.config({path:'./config.env'});

const app=require('./app');

const DB=process.env.DATABASE.replace('<PASSWORD>',  process.env.DATABASE_PASSWORD);


mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true // warning added

}).then( ()=> console.log('DB connection successful'))

const port = process.env.PORT || 5000;

app.listen(port, () => {

  console.log(`app running on port ${port}...`);
});
