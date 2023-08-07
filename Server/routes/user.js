const express = require("express");
const authController = require("./../controllers/auth");
const userController = require("../controllers/user");
const StaticData = require("../utils/StaticData");

const router = express.Router();

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);


router
    .route("/:id")
    .get(userController.getUserById)
    .patch(
        userController.updateUserById
    )
    .delete(
        userController.deleteUserById
    );

router
    .route("/")
    .get(
        userController.getAllUser
    )
    .post(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        userController.addUser
    )
    .delete(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        userController.deleteMutilUserById
    );

router.route("/byname/:username").get(userController.getUserByUserName);

module.exports = router;
