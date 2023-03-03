const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validMealExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!meal) {
    return next(new AppError('The meal does not exist, check the id', 404));
  }

  req.meal = meal;

  next();
});

exports.validIfRestaurantExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params; //del restaurante

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
