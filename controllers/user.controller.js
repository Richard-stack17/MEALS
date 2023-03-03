const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');

exports.signup = catchAsync(async (req,res,next) => {
    const {name, email, password, role='normal'} = req.body;

    const user = new User({name, email, password, role});

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = await generateJWT(user.id);

    res.status(201).json({
        status: 'success',
        id: user.id,
        token,
    });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.updateUser = catchAsync(async (req,res,next) => {
  const { name, email } = req.body;
  const { user } = req;

  const updatedUser = await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;
  
    await user.update({ status: false });
  
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  });

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
      status: 'active',
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

  res.status(200).json({
    status:'success',
    message:'User Orders were found',
    orders,
  });
});


exports.getUserOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;
  const order = await Order.findOne({
    where: {
      userId: sessionUser.id,
      id,
      status: true,
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
  res.status(200).json({
    status:'success',
    message:'User Order was found',
    order,
  });
});


  
  