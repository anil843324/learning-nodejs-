
//   server

 const app=require('./app')

const port = 5000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
