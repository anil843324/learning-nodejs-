const express = require('express');

const fs = require('fs');
const { send } = require('process');

const app = express();

// middleware
app.use(express.json());

// v1= verson of api

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'suceess',
    result: tours.length,
    data: {
      tours,
    },
  });
});

// get data through id
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params.id);
  const id = req.params.id * 1;

  if (!(id > tours.length)) {
    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
      status: 'suceess',
      data: {
        tour,
      },
    });
  } else {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
});

// post request

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
});



// updated methcod but actually not work

app.patch('/api/v1/tours/:id', (req,res)=>{

    if(req.params.id*1 > tours.length){
        return res.status(404).json({
          status:'fail',
          message:'Invalid Id'
        })
    }

     res.status(200).json({
       status:'success',
       data:{
         tour:'<Updated tour here....>'
       }
     })


})

// delete method

app.delete('/api/v1/tours/:id', (req,res)=>{

  if(req.params.id*1 > tours.length){
      return res.status(404).json({
        status:'fail',
        message:'Invalid Id'
      })
  }

   res.status(204).json({
     status:'success',
     data:null
   })


})









const port = 5000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
