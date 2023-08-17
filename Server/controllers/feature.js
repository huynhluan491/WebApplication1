const featureDAO = require("../DAO/FeatureDAO");

exports.getFeatureByID = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const feature = await featureDAO.getFeatureByID(id);
        if (!feature) {
            return res.status(404).json({
                code: 404,
                msg: `Not found feature id ${id}`
            })
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: feature
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            code: 500,
            msg: err
        });
    }
}

exports.getFeature = async (req, res) => {
    try {
        let feature;
        let id;
        if (req.query.productID) {
            id = req.query.productID * 1;
            feature = await featureDAO.getFeatureByProductID(id);
        } else {
            feature = await featureDAO.getAllFeature();
        }
        if (!feature) {
            return res.status(404).json({
                code: 404,
                msg: id
                    ? `Not found feature product id ${id}`
                    : `Not found feature`
            })
        }
        return res.status(200).json({
            code: 200,
            msg: id
                ? `Got features with productId ${id} successfully!`
                : `Got features successfully!`,
            data: feature
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: err
        })
    }
}

exports.createNewFeature = async (req, res) => {
    const newFeature = req.body;
    try {
        await featureDAO.insertNewFeature(newFeature);
        // console.log(`Created new product successfully!`);
        return res.status(200).json({
            code: 200,
            msg: null,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            code: 500,
            msg: `Feature create failed`,
        });
    }
};
exports.deleteFeatureById = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const feature = await featureDAO.getFeatureByID(id);
        if (!feature) {
            return res
                .status(404) //NOT FOUND
                .json({
                    code: 404,
                    msg: `Feature with Id ${id} not found!`,
                });
        }
        await featureDAO.deleteFeatureByID(id);
        return res.status(200).json({
            code: 200,
            msg: null,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            code: 500,
            msg: e,
        });
    }
};
exports.updateFeatureById = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const updateInfo = req.body;
        let feature = await featureDAO.getFeatureByID(id);
        if (!feature) {
            return res.status(404).json({
                code: 404,
                msg: `Not found feature with Id ${id}!`,
            });
        }
        await featureDAO.updateFeatureByID(id, updateInfo);
        feature = await featureDAO.getFeatureByID(id);
        return res.status(200).json({
            code: 200,
            msg: `Updated feature with id: ${id} successfully!`,
            data: feature,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            code: 500,
            msg: `Update feature with id: ${id} failed!`,
        });
    }
};
