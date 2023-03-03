const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRating = catchAsync(async (req, res, next) => {
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return next(
      new AppError('The number must be greater than 1 and less than 5', 404)
    );
  }

  next();
});

exports.validIfRestaurantExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!restaurant) {
    return next(new AppError('The restaurant does not exist', 404));
  }

  req.restaurant = restaurant;

  next();
});
