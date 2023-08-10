const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

//midleware
app.use(bodyParser.json({ limit: "40mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "40mb" }));
app.use(cors());
if (process.env.NODE_ENV === "dev") {
    //3RD-party MIDDLE WARE - HTTP request logger middleware
    app.use(morgan("dev"));
}

//using express.json middleware -> stand between req and response
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log("request Time:", req.requestTime);
    next();
});


const userRouter = require("./routes/user");
const brandRouter = require("./routes/brand");
const ratingRouter = require("./routes/rating");
const cartRouter = require("./routes/cart")
const productRouter = require("./routes/product")

app.use("/api/v1/user", userRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/rating", ratingRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/product", productRouter);


module.exports = app;