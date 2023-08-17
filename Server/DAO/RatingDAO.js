const RatingSchema = require("../model/Rating");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
const { query } = require("mssql");

exports.addRating = async (rating) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    if (!rating) {
        throw new Error("Invalid param");
    }
    let insertData = RatingSchema.validateData(rating);
    let query = `INSERT INTO ${RatingSchema.schemaName}`;
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUtils.getInsertQuery(
            RatingSchema,
            dbConfig.pool.request(),
            insertData
        )
    query += `( ${insertFieldNamesStr} values ${insertValuesStr})`;
    console.log(`query: `, query);
    let result = await request.query(query);
    return result.recordsets;
}

exports.addRatingIfNotExisted = async (rating) => {
    const dbPool = dbConfig.db.pool;
    if (!dbPool) {
        throw new Error("Not connected to db");
    }
    rating.createdAt = new Date().toISOString();

    let query = `SET IDENTITY_INSERT ${RatingSchema.schemaName} ON insert into ${RatingSchema.schemaName}`;

    let insertData = RatingSchema.validateData(rating);
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUtils.getInsertQuery(RatingSchema.schema, dbPool.request(), insertData);
    if (!insertFieldNamesStr || !insertValuesStr) {
        throw new Error("Invalid insert param");
    }
    query +=
        " (" +
        insertFieldNamesStr +
        ") select  " +
        insertValuesStr +
        ` WHERE NOT EXISTS(SELECT * FROM ${RatingSchema.schemaName} WHERE productID = @productID)` +
        ` SET IDENTITY_INSERT ${RatingSchema.schemaName} OFF`;
    let result = await request.query(query);
    return result.recordsets;
};

exports.getRatingByID = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(RatingSchema.schema.ratingID.name, RatingSchema.schema.ratingID.sqlType, id)
        .query(`SELECT * FROM ${RatingSchema.schemaName} WHERE ${RatingSchema.schema.ratingID.name} =@${RatingSchema.schema.ratingID.name}`)
    return result.recordsets[0][0];
}

exports.getAllRating = async () => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .query(`SELECT * FROM ${RatingSchema.schemaName}`);
    return result.recordsets[0];
}

exports.getRatingByProductID = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(RatingSchema.schema.productID.name, RatingSchema.schema.productID.sqlType, id)
        .query(`SELECT * FROM ${RatingSchema.schemaName} WHERE ${RatingSchema.schema.productID.name} =@${RatingSchema.schema.productID.name}`);
    return result.recordsets[0][0];
};

exports.updateRatingById = async (productID, updateInfo) => {
    console.log(productID);
    console.log(updateInfo);
    const rating = updateInfo;
    if (!dbConfig.db.pool) {
        throw new Error("Not connnect to db");
    }
    const starQuantity = `_${rating}star`;
    let query = `update ${RatingSchema.schemaName} set ${starQuantity} = ${starQuantity} +1`;
    let request = await dbConfig.db.pool
        .request()
        .input(RatingSchema.schema.productID.name, RatingSchema.schema.productID.sqlType, productID);
    query += " " + `WHERE ${RatingSchema.schema.productID.name} =@${RatingSchema.schema.productID.name}`;
    console.log(`query: `, query)

    let result = await request.query(query);
    return result.recordsets;

}

exports.deleteRatingByID = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool.request()
        .input(RatingSchema.schema.ratingID.name, RatingSchema.schema.ratingID.sqlType, id)
        .query(`DELETE ${RatingSchema.schemaName} WHERE ${RatingSchema.schema.ratingID.name} =@${RatingSchema.schema.ratingID.name}`);
    return result.recordsets;
}

exports.clearAll = async () => {
    query = `DELETE ${RatingSchema.schemaName} DBCC CHECKIDENT ('[${RatingSchema.schemaName}]', RESEED. 1);`;
    let result = await dbConfig.db.pool.request().query(query);
    return result.recordsets;
}
