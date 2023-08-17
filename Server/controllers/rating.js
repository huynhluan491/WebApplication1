const ratingDAO = require("../DAO/RatingDAO");

exports.addRating = async (req, res) => {
    const addRating = req.body
    try {
        await ratingDAO.addRating(addRating)
        return res.status(200).json({
            code: 200,
            msg: null,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            code: 500,
            msg: "Add new rating failed!"
        })
    }

}

exports.getRatingByID = async (req, res) => {
    const id = req.params.id * 1
    try {
        const rating = await ratingDAO.getRatingByID(id);
        if (!rating) {
            return res.status(404).json({
                code: 404,
                msg: "Not found rating "
            });
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: { rating }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: err
        })
    }
}

exports.getAllRating = async (req, res) => {
    try {
        let rating;
        let id;
        if (req.query.productID) {
            id = req.params.productID * 1;
            rating = await ratingDAO.getRatingByProductID(id);
        } else {
            rating = await ratingDAO.getAllRating();
        }
        if (!rating) {
            return res.status(404).json({
                code: 404,
                msg: id ? `Not found rating with productId ${id}` : ` Not found ratings!`,
            });
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: { rating }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: err,
        });
    }
};


exports.updateRatingByID = async (req, res) => {
    try {
        const updateInfo = req.body;
        const productID = updateInfo.productID;
        delete updateInfo.productID;
        console.log(updateInfo);

        await ratingDAO.updateRatingById(productID, updateInfo);
        rating = await ratingDAO.getRatingByProductID(productID);
        return res.status(200).json({
            code: 200,
            msg: null,
            data: rating,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            code: 500,
            msg: "Update rating by id failed",err
        });
    }
};

exports.deleteRatingByID = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const rating = await ratingDAO.getRatingByID(id);
        if (!id) {
            return res.status(404).json({
                code: 404,
                msg: "Not found rating Id"
            })
        }
        await ratingDAO.deleteRatingByID(id);
        return res.status(200).json({
            code: 200,
            msg: null,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: "Delete rating failed!"
        })
    }
}