const CategoryDAO = require("../DAO/CategoryDAO");

exports.getCateIdByName = async (req, res) => {
    // console.log("req.params", req.params);
    const name = req.params.categoryName;
    try {
        const category = await CategoryDAO.getCategoryIdByName(name);
        if (!category) {
            return res
                .status(404) //NOT FOUND
                .json({
                    code: 404,
                    msg: `Not found categoryID with name ${name}!`,
                });
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: category,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            code: 500,
            msg: e,
        });
    }
};

exports.getCateByID = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const cate = await CategoryDAO.getCategoryByID(id);
        if (!cate) {
            return res
                .status(404) //NOT FOUND
                .json({
                    code: 404,
                    msg: `Not found category with Id ${id}!`,
                });
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: cate
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            code: 500,
            msg: err,
        });
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        let category = await CategoryDAO.getCategory();
        res.status(200).json({
            code: 200,
            msg: null,
            data: category
        });
    } catch (error) {
        console.log(error)
        res.status(404).json({
            code: 404,
            msg: error,
        });
    }
};
