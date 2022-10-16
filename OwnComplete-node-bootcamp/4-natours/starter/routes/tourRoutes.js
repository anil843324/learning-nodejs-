const express = require('express');

const tourController = require('../controllers/toursController');

const router = express.Router();

// router.param('id', tourController.checkId )


router
  .route('/')
  .get(tourController.getAllTours)
  .post( tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
