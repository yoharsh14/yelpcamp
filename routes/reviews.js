const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware");
const Campground = require("../models/campground");
const Review = require("../models/review");
const { validateReview } = require("../middleware");
const { reviewSchema } = require("../schemas.js");
const Reviews = require("../controllers/reviews");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");

router.post("/", isLoggedIn, validateReview, catchAsync(Reviews.createReview));

router.delete("/:reviewId", isLoggedIn, catchAsync(Reviews.deleteReview));

module.exports = router;
