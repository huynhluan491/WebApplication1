const brandDAO = require("../DAO/BrandDAO");

exports.getBrandById = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const brand = await brandDAO.getBrandById(id);
        if (!brand) {
            return res.status(404).json({
                code: 404,
                msg: "Not found brand ",
            });
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: brand
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            code: 500,
            msg: err
        })
    }
}

exports.getAllBrand = async (req, res) => {
    try {
        let brands = await brandDAO.getAllBrand();
        res.status(200).json({
            code: 200,
            msg: null,
            data: brands,
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            code: 404,
            msg: err
        })
    }
}

exports.getBrandsPagination = async (req, res) => {
    try {
        const brands = await brandDAO.getBrandPagination(req.query);
        res.status(200).json({
            code: 200,
            msg: null,
            data: brands,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            code: 500,
            msg: `FAIL with ${err}`,
        });
    }
};