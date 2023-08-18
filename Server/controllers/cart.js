const CartDAO = require("../DAO/CartDAO");

exports.getCart = async (req, res) => {
    try {
        let cart = await CartDAO.getCart();
        res.status(200).json({
            code: 200,
            msg: null,
            data: { cart }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            code: 500,
            msg: err
        })

    }
}

exports.getProductInCartByUSerID = async (req, res) => {
    try {
        let result = await CartDAO.getProductInCartByUSerID(req.query.userID);
        res.status(200).json({
            code: 200,
            msg: null,
            data: result
        });
    } catch (error) {
        res.status(404).json({
            code: 404,
            msg: error,
        });
    }
};

exports.updateProductInCart = async (req, res) => {
    // console.log(req.body);
    try {
        let result = await CartDAO.updateCart(req.body);
        res.status(200).json({
            code: 200,
            msg: 'sucess',
            data: result
        });
    } catch (error) {
        res.status(404).json({
            code: 404,
            msg: error,
        });
    }
};

exports.insertProductToCart = async (req, res) => {
    // console.log(req.body);
    try {
        let result = await CartDAO.addCart_ProductIfNotExisted(req.body);
        res.status(200).json({
            code: 200,
            msg: 'sucess',
            data: result
        });
    } catch (error) {
        res.status(404).json({
            code: 404,
            msg: error,
        });
    }
};

exports.deleteProductInCart = async (req, res) => {
    const dele = req.query;
    try {
        await CartDAO.deleteItemInCart(dele);
        res.status(200).json({
            code: 200,
            msg: 'sucess'

        });
    } catch (error) {
        res.status(404).json({
            code: 404,
            msg: error,
        });
    }
};