const ProductSchema = require("../model/Product");
const BrandSchema = require("../model/Brand")
const RatingSchema = require("../model/Rating");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
const StaticData = require("../utils/StaticData");

exports.addProductIfNotExisted = async (product) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connected to db");
    }
    product.createdAt = new Date().toISOString();

    let insertData = ProductSchema.validateData(product);

    let query = `SET IDENTITY_INSERT ${ProductSchema.schemaName} ON insert into ${ProductSchema.schemaName}`;
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUtils.getInsertQuery(
            ProductSchema.schema,
            dbConfig.db.pool.request(),
            insertData
        );
    if (!insertFieldNamesStr || !insertValuesStr) {
        throw new Error("Invalid insert param");
    }

    query +=
        " (" +
        insertFieldNamesStr +
        ") select  " +
        insertValuesStr +
        ` WHERE NOT EXISTS(SELECT * FROM ${ProductSchema.schemaName} WHERE name = @name)` +
        ` SET IDENTITY_INSERT ${ProductSchema.schemaName} OFF`;
    // console.log(query);

    let result = await request.query(query);

    // console.log(result);
    return result.recordsets;
};

exports.getProductByID = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(ProductSchema.schema.productID.name, ProductSchema.schema.productID.sqlType, id)
        .query(`SELECT *FROM ${ProductSchema.schemaName} WHERE ${ProductSchema.schema.productID.name} =@${ProductSchema.schema.productID.name}`)
    return result.recordsets[0][0];
}

exports.getAllProduct = async () => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = dbConfig.db.pool
        .request()
        .query(`SELECT * FROM PRODUCT`);
    return result.recordsets;
}