const Review = require("../models/reviews.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.validExistReview = catchAsync(async (req,res,next) => {
    const {id} = req.params;

    const review = await Review.findOne({
        where:{
            id,
            status: true,
        },
    });

    if(!review){
        return next(new AppError('Review not found', 404));
    }

    req.review = review;

    next();
});