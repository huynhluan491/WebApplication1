const express = require("express");
const cartController = require("../controllers/cart");
const router = express.Router();

router
    .route("/")
    .get(cartController.getProductInCartByUSerID)
    .patch(cartController.updateProductInCart)
    .post(cartController.insertProductToCart)
    .delete(cartController.deleteProductInCart);

router.route("/all").get(cartController.getCart);


module.exports = router;

