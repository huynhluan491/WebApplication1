const express = require("express");
const productController = require("../controllers/product");
const authController = require("../controllers/auth");
const StaticData = require("../utils/StaticData");
const router = express.Router();

router.route("/allproduct")
    .get(productController.getAllProduct);

router.route("/")
    .get(productController.getProductsPagination)
    .post(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        productController.insertProduct)
    .delete(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        productController.deleteMutilProductByID)
router.route("/:id")
    .get(productController.getProductByID)
    .patch(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        productController.updateProductByID)
    .delete(
        authController.protect,
        authController.restrictTo(StaticData.AUTH.role.admin),
        productController.deleteProductByID)





module.exports = router;