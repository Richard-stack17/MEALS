const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const Restaurant = require("../models/restaurant.model");
const catchAsync = require("../utils/catchAsync");


exports.createOrder = catchAsync(async (req,res,next) => {
  const { quantity, mealId} = req.body;
  const { sessionUser, meal} = req; //agarrar el userId

  
  const totalPrice = +meal.price * +quantity;

  const newOrder = await Meal.create({
    userId: sessionUser.id,
    mealId,
    totalPrice,
    quantity
  });

  res.status(201).json({
    status: 'success',
    message: 'The product was created successfully',
    newOrder,
  });
});

exports.getOrders = catchAsync(async (req,res,next) => {

    const {sessionUser} = req;


    const orders = await Order.findAll({
        where:{
            userId: sessionUser.id,
        },
        include: [
          {
            model: Meal,
            where: {
              status: true,
            },
            include: [
              {
                model: Restaurant,
                where: {
                  status: true,
                },
              },
            ],
          },
        ],
    });

    return (res.status(200).json({
      status:'success',
      orders,
    }))
});

exports.markOrderCompleted = catchAsync(async(req,res,next) => {
  const {order} = req;

  updatedOrder = order.update({
    status:'completed'
  });

  return(res.status(200).json({
    status:'success',
    updatedOrder
  }))

});

exports.deleteOrder = catchAsync(async(req,res,next) => {
  const {order} = req;

  deletedOrder=order.update({
    status:'cancelled'
  });

  return(res.status(200).json({
    status:'success',
    deletedOrder
  }))
});