const FeatureSchema = require("../model/Feature");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");

exports.addFeatureIfNotExisted = async (feature) => {
    const dbPool = dbConfig.db.pool;
    if (!dbPool) {
        throw new Error("Not connected to db");
    }
    feature.createdAt = new Date().toISOString();

    let insertData = FeatureSchema.validateData(feature);
    let query = `SET IDENTITY_INSERT ${FeatureSchema.schemaName} ON insert into ${FeatureSchema.schemaName}`;
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUtils.getInsertQuery(FeatureSchema.schema, dbPool.request(), insertData);
    if (!insertFieldNamesStr || !insertValuesStr) {
        throw new Error("Invalid insert param");
    }
    query +=
        " (" +
        insertFieldNamesStr +
        ") select  " +
        insertValuesStr +
        ` WHERE NOT EXISTS(SELECT * FROM ${FeatureSchema.schemaName} WHERE feature = @feature)` +
        ` SET IDENTITY_INSERT ${FeatureSchema.schemaName} OFF`;
    let result = await request.query(query);
    return result.recordsets;
};
exports.clearAll = async () => {
    query = `delete ${FeatureSchema.schemaName}  DBCC CHECKIDENT ('[${FeatureSchema.schemaName} ]', RESEED, 1);`;
    let result = await dbConfig.db.pool.request().query(query);
    return result.recordsets;
};

exports.getFeatureByID = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(FeatureSchema.schema.featureID.name, FeatureSchema.schema.featureID.sqlType, id)
        .query(`SELECT * FROM ${FeatureSchema.schemaName} WHERE ${FeatureSchema.schema.featureID.name} =@${FeatureSchema.schema.featureID.name}`)
    return result.recordsets[0][0];
}


exports.getFeatureByProductID = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(FeatureSchema.schema.prouctID.name, FeatureSchema.schema.prouctID.sqlType, id)
        .query(`SELECT * FROM ${FeatureSchema.schemaName} WHERE ${FeatureSchema.schema.prouctID.name} =@${FeatureSchema.schema.prouctID.name}`)
    return result.recordsets[0][0];

}

exports.getAllFeature = async () => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .query(`SELECT * FROM ${FeatureSchema.schemaName}`)
    return result.recordsets[0];

}

exports.insertNewFeature = async (feature) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    feature.createdAt = new Date().toDateString();
    let insertData = FeatureSchema.validateData(feature);
    let query = `INSERT INTO ${FeatureSchema.schemaName}`;
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUtils.getInsertQuery(
            FeatureSchema.schema,
            dbConfig.db.pool.request(),
            insertData
        );
    query += " (" + insertFieldNamesStr + ") values (" + insertValuesStr + ")";
    let result = await request.query(query);
    return result.recordsets;

}

exports.deleteFeatureByID = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(FeatureSchema.schema.featureID.name, FeatureSchema.schema.featureID.sqlType, id)
        .query(`DELETE FROM ${FeatureSchema.schemaName} WHERE ${FeatureSchema.schema.featureID.name} =@${FeatureSchema.schema.featureID.name}`)
    return result.recordsets;
}

exports.updateFeatureByID = async (id, update) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    if (!update) {
        throw new Error("Invalid params input");
    }
    let query = (`UPDATE ${FeatureSchema.schemaName} SET`)
    const { request, updateStr } = dbUtils.getUpdateQuery(
        FeatureSchema.schema,
        dbConfig.db.pool.request(),
        update
    )
    if (!updateStr) {
        throw new Error("Invalid update params");
    }
    request.input(
        FeatureSchema.schema.featureID.name, FeatureSchema.schema.featureID.sqlType, id
    )

    query += ` ${updateStr} WHERE ${FeatureSchema.schema.featureID.name} =@${FeatureSchema.schema.featureID.name}`;
    console.log("query: ", query)
    let result = await request.query(query);
    return result.recordsets;
}