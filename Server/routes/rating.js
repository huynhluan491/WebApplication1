const express = require("express");
const ratingController = require("../controllers/rating");
const authController = require("../controllers/auth");
const StaticData = require("../utils/StaticData");
const router = express.Router();

router
    .route("/")
    .get(ratingController.getAllRating)

router
    .route("/:id")
    .get(ratingController.getRatingByID)
    .delete(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        ratingController.deleteRatingByID
    )
    .patch(ratingController.updateRatingByID)


router.route("/add").post(ratingController.addRating);

module.exports = router;