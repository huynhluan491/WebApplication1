const express = require("express");
const productController = require("../controllers/product");
const router = express.Router();

router.route("/:id")
    .get(productController.getProductByID)

module.exports = router;