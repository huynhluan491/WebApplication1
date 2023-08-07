const { CartSchema, Cart_ProductSchema } = require("../model/Cart");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
const UserSchema = require("../model/Users");
const { config } = require("dotenv");

exports.createNewCart = async (userID) => {
    const dbPool = dbConfig.db.pool
    if (!dbPool) {
        throw new Error("Not connect to db");
    }
    let cart = {
        userID: userID
    };

    let insertData = CartSchema.validateData(cart);
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUtils.getInsertQuery(CartSchema.schema, dbPool.request(), insertData);
    if (!insertFieldNamesStr || !insertValuesStr) {
        throw new Error("Invalid insert param");
    }
    const query = `INSERT INTO ${CartSchema.schema} (${insertFieldNamesStr}) ELECT ${insertValuesStr}`;
    let result = await request.query(query);

    return result;

};

exports.getCartIDByUserName = async (username) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(UserSchema.schema.userName.name, UserSchema.schema.userName.sqlType, username)
        .query(`SELECT CARTID FROM ${CartSchema.schemaName} WHERE USERID IN(SELECT USERID FROM ${UserSchema.schemaName} WHERE USERNAME =@${UserSchema.schema.userName.name})`);
    return result.recordsets[0][0];
}


exports.getCart = async () => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connec to DB");
    }
    let result = await dbConfig.db.pool
        .request()
        .query(`SELECT *FROM CART`)
    return result.recordsets;
}