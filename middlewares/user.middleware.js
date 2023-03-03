const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.validUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});

exports.validUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user is not registered', 401));
  }

  req.user = user;
  next();
});

exports.validPassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid Credentials', 401));
  }

  next();
});
