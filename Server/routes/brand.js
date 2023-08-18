const express = require("express");
const brandController = require("../controllers/brand");
const router = express.Router();

router.route("/").get(brandController.getBrandsPagination);
router.route("/allbrand").get(brandController.getAllBrand);
// router.route("/:id").get(brandController.getBrandById);
// router.route("/all").get(brandController.getBrandsPagination)

module.exports = router;
