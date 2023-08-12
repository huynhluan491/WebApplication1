const dbConfig = require("../database/dbconfig");
const CategorySchema = require("../model/Category");
const dbUtils = require("../utils/dbUtils");

exports.addCateIfNotExists = async (cate) => {
    const dbPool = dbConfig.db.pool;
    if (!dbPool) {
        throw new Error("Not connected to db");
    }
    cate.createdAt = new Date().toISOString();

    let insertData = CategorySchema.validateData(cate);
    let query = `SET IDENTITY_INSERT ${CategorySchema.schemaName} ON insert into ${CategorySchema.schemaName}`;
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUtils.getInsertQuery(CategorySchema.schema, dbPool.request(), insertData);
    if (!insertFieldNamesStr || !insertValuesStr) {
        throw new Error("Invalid insert param");
    }

    query +=
        " (" +
        insertFieldNamesStr +
        ") select  " +
        insertValuesStr +
        ` WHERE NOT EXISTS(SELECT * FROM ${CategorySchema.schemaName} WHERE categoryName = @categoryName)` +
        ` SET IDENTITY_INSERT ${CategorySchema.schemaName} OFF`;
    let result = await request.query(query);
    return result.recordsets;
};

exports.getCategoryIDByName = async (name) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }

    let result = await dbConfig.db.pool
        .request()
        .input(CategorySchema.schema.categoryName.name, categoryName.schema.categoryName.sqlType, name)
        .query(`SELECT CATEGORYID FROM ${CategorySchema.schemaName} WHERE ${CategorySchema.schema.categoryName.name} =@${CategorySchema.schema.categoryName.name}`)
    return result.recordsets[0][0].categoryID;
}

