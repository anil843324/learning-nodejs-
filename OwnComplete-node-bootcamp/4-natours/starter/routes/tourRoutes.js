const express = require('express');

const tourController = require('../controllers/toursController');
const authController = require('../controllers/authController');

const reviewRouter=   require('./reviewRoutes');

const router = express.Router();


// POST /tour/lasdj345lkd/reviews

// GET /tour/pojudf980j/reviews

// GET /tour/pojudf980j/reviews/8u8j98j8u9



router.use('/:tourId/reviews', reviewRouter)

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
     authController.restrictTo('admin','lead-guide'),
    tourController.deleteTour
  );




module.exports = router;
