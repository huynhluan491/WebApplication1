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