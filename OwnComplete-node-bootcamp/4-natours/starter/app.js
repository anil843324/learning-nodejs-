const express = require('express');

const fs = require('fs');

const morgan = require('morgan');

const app = express();

// 1. middleware

app.use(morgan('dev'));

app.use(express.json());

// v1= verson of api

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Refectring of route

app.use((req, res, next) => {
  console.log('hello from middleware');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. Route Handler
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'suceess',
    requestdAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here....>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};


 const getAllUsers=(req,res)=>{


   res.status(500).json({
    status:'error',
    message:'this route is not yet defined'
   })

 }

 const getUser=(req,res)=>{


  res.status(500).json({
   status:'error',
   message:'this route is not yet defined'
  })

}

const createUser=(req,res)=>{


  res.status(500).json({
   status:'error',
   message:'this route is not yet defined'
  })

}

const updateUser=(req,res)=>{


  res.status(500).json({
   status:'error',
   message:'this route is not yet defined'
  })

}

const deleteUser=(req,res)=>{


  res.status(500).json({
   status:'error',
   message:'this route is not yet defined'
  })

}


// 3. route
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//  4. server
const port = 5000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
