const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');

exports.getMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'Meals were found successfully',
    meals,
  });
});

exports.getMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  return res.status(200).json({
    status: 'success',
    message: 'the meal was found successfully',
    meal,
  });
});

exports.createMeal = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, price } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  res.status(200).json({
    status: 'success',
    message: 'The meal was created successfully',
    newMeal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  const updatedMeal = await meal.update({
    name,
    price,
  });

  res.status(200).json({
    status: 'success',
    message: 'The meal was updated succesffully',
    updatedMeal,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  const deletedMeal = await meal.update({
    status: false,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The meal was deleted successfully',
    deletedMeal,
  });
});
