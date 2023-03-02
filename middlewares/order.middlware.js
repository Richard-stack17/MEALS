const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.validMealExists = catchAsync(async (req,res,next) => {
    const {mealId} = req.body;

    const meal = await Meal.findOne({
        where:{
            id: mealId,
            status:true,
        }
    });

    if(!meal){
        return next(new AppError('Meal does not exist', 404))
    }

    req.meal = meal;
    next();

});

exports.validOrderIsActiveAndExist= catchAsync(async (req,res,next) => {
    const {id} = req.params;
    
    const order = Order.findOne({
        where:{
            id
        }
    });

    if(!order){
        return next(new AppError('The order does not exist',404));
    }

    if(order.status!=="active"){
        return next(new AppError('The order is not active',404));
    }

    req.order = order;
    next();
});

