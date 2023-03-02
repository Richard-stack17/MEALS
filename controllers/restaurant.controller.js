const Restaurant = require('../models/restaurant.model');
const Review = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(500).json({
    status: 'success',
    newRestaurant,
  });
});

exports.getRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: true,
    },
    include: {
      model: Review,
    },
  });

  res.status(500).json({
    status: 'success',
    restaurants,
  });
});

exports.getRestaurant = catchAsync(async (req, res, next) => {
    const restaurant = await Restaurant.findOne({
        where: {
          status: true,
        },
        include: {
            model: Review,
            where:{
                restaurantId: restaurant.id
            }
        },
      });
    
      res.status(500).json({
        status: 'success',
        restaurant,
      });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  const updatedRestaurant = await restaurant.update({
    name,
    address,
  });

  return res.status(500).json({
    status: 'success',
    updatedRestaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const deletedRestaurant = await restaurant.update({
    status: false,
  });

  return res.status(500).json({
    status: 'success',
    deletedRestaurant,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser } = req;

  const review = await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId: restaurant.id,
    rating,
  });

  res.status(201).json({
    status: 'success',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  const updatedReview = await review.update({
    comment,
    rating,
  });

  res.status(200).json({
    status: 'success',
    updatedReview,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const deletedReview = await review.update({
    status: false,
  });

  res.status(200).json({
    status: 'success',
    deletedReview,
  });
});
