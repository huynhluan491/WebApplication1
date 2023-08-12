const UserDao = require("../DAO/UserDAO");

exports.addUser = async (req, res) => {
    const newUser = req.body;
    try {
        let user = await UserDao.getUserByUserEmail(req.body.email);
        if (user) {
            return res.status(403).json({
                code: 403,
                msg: "Can not use email , email used",
            });
        }

        user = await UserDao.getUserByUserName(req.body.userName);
        if (user) {
            return res.status(403).json({
                code: 403,
                msg: "Can not use user , user used"
            });
        }
        const result = await UserDao.insertUser(newUser);
        const userInf = await UserDao.getUserByUserName(newUser.userName);
        await CartDAO.createNewCart(userInf.userID)
        return res.status(200).json({
            code: 200,
            msg: null,
            data: result,
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            code: 404,
            msg: "Add user failed!"
        })
    }
}


exports.getUserById = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const user = await UserDao.getUserById(id);
        if (!user) {
            return res.status(404).json({
                code: 404,
                msg: `Not found user by id ${id}`
            });
        }
        req.user = user;
        return res.status(200).json({
            code: 200,
            msg: null,
            data: user,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: err,
        });
    }
};

exports.getUserByUserName = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await UserDao.getUserByUserName(username);
        if (!user) {
            return res.status(404).json({
                code: 404,
                msg: `Not found user by name ${username}`
            });
        }
        return res.status(200).json({
            code: 200,
            msg: null,
            data: user,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: err,
        });
    }
};

exports.getAllUser = async (req, res) => {
    const users = await UserDao.getAllUser(req.query);
    res.status(200).json({
        code: 200,
        msg: null,
        data: {
            users,
        },
    });
};


exports.deleteUserById = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const user = await UserDao.getUserById(id);
        if (!user) {
            return res.status(404).json({
                code: 404,
                msg: `Can not found user with Id : ${id}`,
            });
        }

        await UserDao.deleteUserById(id);
        return res.status(200).json({
            code: 200,
            msg: `Delete user id ${id} succes !`,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: err
        })
    }
}

exports.deleteMutilUserById = async (req, res) => {
    const idList = req.body.id;
    try {
        if (!idList || !idList.lenght === 0) {
            return res.status(403).json({
                code: 403,
                msg: "Invalid id",
            });
        } await UserDao.deleteMutilUserById(idList);
        return res.status(200).json({
            code: 200,
            msg: null,
        });
    } catch (err) {
        return res.status(500).json({
            code: 500,
            msg: `Delete users with id ${idList} fail`,
        });
    }
};

exports.updateUserById = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const update = req.body;
        let user = await UserDao.getUserById(id);
        if (!user) {
            return res.status(404).json({
                code: 404,
                msg: `Cannot found user with id ${id} `
            });
        }
        await UserDao.updateUserById(id, update);
        user = await UserDao.getUserById(id);
        return res.status(200).json({
            code: 200,
            msg: null,
            data: { user },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            code: 500,
            msg: err,
        });
    }
}