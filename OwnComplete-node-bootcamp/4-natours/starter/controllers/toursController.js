const Tour = require('../models/tourModel');

//handler

 exports.aliasTopTours= (req,res,next)=>{

    req.query.limit='5';
    req.query.sort='-ratingsAverage,price';
    req.query.fields='name,price,ratingsAverage,summary,difficulty';
  next();
 }



exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // Buid query
    // 1A. filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B. Advanced Filtering
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    /*
   { difficulty : "easy" , duration :{$gte:5}}
    { difficulty : "easy" , duration :{gte:'5}}
   */

    let query = Tour.find(JSON.parse(queryStr));

    // 2. Sorting
    if (req.query.sort) {
      const sortbBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortbBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3  Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

  // 4 Pagination
  
   const page= req.query.page * 1 || 1 ;
   const limit=req.query.limit*1 || 100;
   const  skip= (page-1)*limit;

  // page=2&limit=10 , 1-10 page 1, 11-20 page 2 , 21-30 page 3
    query=query.skip(skip).limit(limit);

    if(req.query.page){
       const numTours= await Tour.countDocuments();
       if(skip>numTours) throw new Error('This page does not exit')
    }

    // Execute query
    const tours = await query;

    // Send response
    res.status(200).json({
      status: 'suceess',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.send(404).json({ status: 'failed', message: err });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id:req.params.id})
    res.status(200).json({
      status: 'suceess',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
