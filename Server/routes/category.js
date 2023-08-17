const express = require("express");
const categoryController = require("../controllers/category");
const router = express.Router();

router.route("/").get(categoryController.getAllCategory);
router.route("/:id").get(categoryController.getCateByID);

module.exports = router;
