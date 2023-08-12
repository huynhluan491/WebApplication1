const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDAO = require("../DAO/UserDAO");
const CartDAO = require("../DAO/CartDAO");
const signToken = (id, username, auth, cartUser) => {
    return jwt.sign({
        userID: id,
        username: username,
        auth: auth,
        cartID: cartUser,
    },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRED_IN
        }
    );
};

exports.login = async (req, res) => {
    try {
        const form = req.body;
        //check form
        if (!form.password || !form.userName) {
            return res.status(403).json({
                code: 403,
                msg: "Invalid params",
            })
        }
        // check user existed
        const user = await UserDAO.getUserByUserName(form.userName);
        const cartUser = await CartDAO.getCartIDByUserName(form.cartID);
        if (!cartUser) {
            cartID = -1;
        } else {
            cartID = cartUser.cartID;
        }
        if (!user) {
            return res.status(401).json({
                code: 401,
                msg: `Invalid user ${form.userName}`
            })
        }

        //check password
        const isValidPassword = await bcrypt.compare(form.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                code: 401,
                msg: "Invalid authentication"
            })
        }
        // Get JWT and respone to use
        const token = signToken(user.userID, user.userName, user.auth, cartID);
        res.status(200).json({
            code: 200,
            msg: "Success",
            data: { token },
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            code: 500,
            msg: err,
        })
    }
}

exports.signup = async (req, res) => {
    try {
        const form = req.body;
        if (!form.password || !form.userName || !form.email) {
            return res.status(403).json({
                code: 403,
                msg: "Invalid password "
            })
        }
        await UserDAO.insertUser({
            userName: form.userName,
            password: form.password,
            email: form.email,
        });
        const user = await UserDAO.getUserByUserName(form.userName);
        await CartDAO.createNewCart(user.userID);
        delete user.password;
        // console.log("usertest", user);

        return res.status(200).json({
            code: 200,
            msg: "sign up success",
            data: { user }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            code: 500,
            msg: err.toString(),
        })
    }
}

exports.protect = async (req, res, next) => {
    try {
        // Getting token from header "Authorization"
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                code: 401,
                msg: "You are not logged in! Please log in to get access.",
            });
        }
        //  Verification token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Check if user still exists
        const currentUser = await UserDAO.getUserById(payload.userID);
        if (!currentUser) {
            return res.status(401).json({ code: 401, msg: `Invalid authentication` });
        }
        req.user = currentUser;
    } catch (e) {
        console.error(e);
        console.error(e);
        return res.status(500).json({
            code: 500,
            msg: e.toString(),
        });
    }
    next();
};

exports.restrictTo = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.user.auth)) {
            return res.status(403).json({
                code: 403,
                msg: "You do not have permission to perform this action",
            });
        }
        next();
    };
};
