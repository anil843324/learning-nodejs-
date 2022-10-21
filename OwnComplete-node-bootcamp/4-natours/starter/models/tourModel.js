const mongoose = require('mongoose');
const slugify = require('slugify');


const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'A tour must have a name'],
      trim: true,
      maxlength: [
        40,
        'A tour name must have less or equeal then 40 characters',
      ],
      minlength: [
        10,
        'A tour name must have more or equeal then 10 characters',
      ],
      // validate: [validator.isAlpha , 'Tour name must only contain character']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },

    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      ensum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy , medium, difficult',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,

      min: [1, 'Rating must be abouve 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },

    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on new doucment creation
          return val < this.price;
        },
        message: 'Dicount price ({VALUE}) should be below regular price',
      },
    },

    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },

    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },

    startDates: [Date],

    secretTour: {
      type: Boolean,
      default: false,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});

// document middleware : runs before  .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//  tourSchema.pre('save', function(next){

//     console.log('will save document....');

//    next();
//  })

// tourSchema.post('save', function (doc,next) {

//    console.log(doc)
//   next();
// });

///  query middlewqare

tourSchema.pre(/^find/, function (next) {
  //  tourSchema.pre('find', function(next){

  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`query took ${Date.now() - this.start} milliseocnds!`);
  // console.log(docs)
  next();
});

//  aggregation middleware

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
