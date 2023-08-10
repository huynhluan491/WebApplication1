const ProductDAO = require("../DAO/ProductDAO");
const path = require("path");
const fs = require("fs");

exports.getProductByID = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const product = await ProductDAO.getProductByID(id);
        if (!product) {
            return res.status(404).json({
                code: 404,
                msg: "Not found product id"
            });
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: product,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: err
        })
    }
}

