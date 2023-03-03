const Meal = require("../models/meal.model");
const catchAsync = require("../utils/catchAsync");


exports.getMeals = catchAsync(async(req,res,next) => {

    const meals = await Meal.findAll({
        where:{
            status:true
        }
    });

    return (res.status(500).json({
        status:'success',
        meals,
    }))
})

exports.getMeal = catchAsync(async (req,res,next) => {
    const {meal} = req;

    return (res.status(500).json({
        status:'success',
        meal
    }))
});

exports.createMeal = catchAsync(async (req,res,next) => {
    const {restaurant} = req;
    const {name, price} = req.body;
    
    const newMeal = await Meal.create({
        name,
        price,
        restaurantId:restaurant.id,
    });

    res.status(200).json({
        status:'success',
        newMeal
    })
});

exports.updateMeal = catchAsync(async (req,res,next) => {
    const {meal} = req;
    const {name,price} = req.body;

    const updatedMeal = await meal.update({
        name,
        price
    });

    return (res.status(500).json({
        status:'success',
        updatedMeal
    }))

});

exports.deleteMeal = catchAsync(async (req,res,next) => {
    const {meal} = req;

    const deletedMeal = await meal.update({
        status: false,
    });

    return (res.status(500).json({
        status:'success',
        deletedMeal
    }))

});