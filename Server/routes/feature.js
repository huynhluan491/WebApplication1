const express = require("express");
const FeatureController = require("../controllers/feature");
const router = express.Router();
const StaticData = require("../utils/StaticData");
const authController = require("../controllers/auth");

router.route("/")
    .get(FeatureController.getFeature)
    .post(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        FeatureController.createNewFeature)

router.route("/:id")
    .get(FeatureController.getFeatureByID)
    .patch(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        FeatureController.updateFeatureById)
    .delete(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        FeatureController.deleteFeatureById)


module.exports = router;