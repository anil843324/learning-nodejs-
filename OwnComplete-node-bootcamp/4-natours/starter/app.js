import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'hello from the server side!', app: 'Natours' });
});

app.post('/' , (req,res)=>{

     res.send('you can post to this endpoint...')
} )






const port = 5000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
