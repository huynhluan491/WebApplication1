const ProductDAO = require("../DAO/ProductDAO");
const CategoryDAO = require("../DAO/CategoryDAO");
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

exports.getProductByName = async (req, res) => {
    const name = req.body;
    const product = await ProductDAO.getProductByName();
    try {
        if (!name) {
            return res.status(404).json({
                code: 404,
                msg: "Not found Product by name"
            })
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: { product }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            code: 500,
            msg: err
        })
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const products = await ProductDAO.getAllProduct(req.query);
        if (!products) {
            return res
                .status(404) //NOT FOUND
                .json({
                    code: 404,
                    msg: `Products list not found!`,
                });
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: products,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            code: 500,
            msg: e,
        });
    }
};
exports.getProductsPagination = async (req, res) => {
    // console.log("req.query", req.query);
    if (req.query.categoryName) {
        const cateid = await CategoryDAO.getCategoryIDByName(
            req.query["categoryName"]
        );
        req.query.categoryID = cateid;

        delete req.query.categoryName;

    }
    try {
        const products = await ProductDAO.getAllProductPagination(req.query);
        res.status(200).json({
            code: 200,
            msg: null,
            data: products,
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            msg: `FAIL with ${err}`,
        });
    }
};

exports.insertProduct = async (req, res) => {
    const newProduct = req.body;
    try {
        let product = await ProductDAO.getProductByName(newProduct.name)
        if (product) {
            res.status(403).json({
                code: 403,
                msg: "Product name used"
            })
        }
        await ProductDAO.insertNewProduct(newProduct);
        product = await ProductDAO.getProductByName(newProduct.name);
        product && (await ProductDAO.createNewRating(product));
        return res.status(200).json({
            code: 200,
            msg: null,
            data: product,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            code: 500,
            msg: "Not create product"
        });
    }
};

exports.deleteMutilProductByID = async (req, res) => {
    const idList = req.query.id;
    try {
        if (!idList || idList === 0) {
            return res.status(403).json({
                code: 403,
                msg: "Invalid id"
            });
        }
        await ProductDAO.deleteMutilProductByID(idList);
        return res.status(200).json({
            code: 200,
            msg: null,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            code: 500,
            msg: `Delete products id ${idList} failed`,
        });
    }
}

exports.updateProductByID = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const updateInf = req.body;
        let product = await ProductDAO.getProductByID(id);
        if (!product) {
            return res.status(404).json({
                code: 404,
                msg: `Not found id ${id}`,
            })
        }
        await ProductDAO.updateProductByID(id, updateInf);
        product = await ProductDAO.getProductByID(id);
        return res.status(200).json({
            code: 200,
            msg: null,
            data: product,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            code: 500,
            msg: `Update product failed ${id}`,
        })
    }
};

exports.deleteProductByID = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const product = await ProductDAO.getProductByID(id);
        if (!product) {
            return res.status(404).json({
                code: 404,
                msg: `Not found product id ${id}`
            });
        }
        await ProductDAO.deleteProductByID(id);
        return res.status(200).json({
            code: 200,
            msg: `Delete Product succes id: ${id}`,

        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: err
        })
    }
}



