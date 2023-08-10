const express = require("express");
const brandController = require("../controllers/brand");
const router = express.Router();

router.route("/").get(brandController.getAllBrand);
router.route("/:id").get(brandController.getBrandById);

module.exports = router;
