const UserSchema = require("../model/Users");
const dbConfig = require("../database/dbconfig");
const dbUntils = require("../utils/dbUtils");
const bcrypt = require("bcryptjs");
const StaticData = require("../utils/StaticData");

exports.addUserIfNotExisted = async (user) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");

    }
    user.createdAt = new Date().toISOString();

    let insertData = UserSchema.validateData(user);
    insertData.password = await bcrypt.hash(insertData.password, 10);
    let query = `SET INDENTITY_INSERT ${UserSchema.schemaName} ON insert into ${UserSchema.schemaName}`;
    //SCHEMA,RESQUEST,INSERT
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUntils.getInsertQuery(
            UserSchema.schema,
            dbConfig.db.pool.request(),
            insertData
        );

    if (!insertFieldNamesStr || !insertValuesStr) {
        throw new Error("Invalid insert param");
    }

    query +=
        "(" +
        insertFieldNamesStr +
        ")" +
        insertValuesStr +
        `WHERE NOT EXISTS(SELECT *FROM ${UserSchema.schemaName} WHERE userName =@userName)` +
        `SET INDENITTY_INSERT ${UserSchema.schemaName} OFF`;
    let result = await request.query(query);
    return result.recordsets;

}

exports.insertUser = async (user) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }

    user.createdAt = new Date().toISOString();
    let insertData = UserSchema.validateData(user);
    insertData.password = await bcrypt.hash(insertData.password, 10);

    let query = `insert into ${UserSchema.schemaName}`;
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUntils.getInsertQuery(
            UserSchema.schema,
            dbConfig.db.pool.request(),
            insertData
        );
    if (!insertFieldNamesStr || !insertValuesStr) {
        throw new Error("Invalid insert param");
    }
    query += "(" + insertFieldNamesStr + ") select  " + insertValuesStr;
    let result = await request.query(query);
    return result.recordsets;
}

exports.getUserById = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(UserSchema.schema.userID.name, UserSchema.schema.userID.sqlType, id)
        .query(`SELECT * FROM ${UserSchema.schemaName} WHERE ${UserSchema.schema.userID.name} =@${UserSchema.schema.userID.name}`);
    console.log(result);
    if (result.recordsets[0].length > 0) {
        return result.recordsets[0][0];
    }
    return null;
};

exports.getUserByUserName = async (username) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(UserSchema.schema.userName.name, UserSchema.schema.userName.sqlType, username)
        .query(`SELECT * FROM ${UserSchema.schemaName} WHERE ${UserSchema.schema.userName.name} =@${UserSchema.schema.userName.name}`);
    console.log(result)
    if (result.recordsets[0].length > 0) {
        return result.recordsets[0][0];
    }
    return null;
};

exports.getUserByUserEmail = async (username) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(UserSchema.schema.email.name, UserSchema.schema.email.sqlType, username)
        .query(`SELECT * FROM ${UserSchema.schema} WHERE ${UserSchema.schema.email.name} =@${UserSchema.schema.email.name}`);
    if (result.recordsets[0].length > 0) {
        return result.recordsets[0][0];
    }
    return null;
}

exports.getAllUser = async (filter) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db")
    }
    const page = filter.page * 1 || 1;
    let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
    if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
        pageSize = StaticData.config.MAX_PAGE_SIZE;
    }
    let selectQuery = `SELECT * FROM ${UserSchema.schemaName}`;
    let countQuery = `SELECT COUNT(DISTINCT ${UserSchema.schema.userID.name}) AS TOTALITEM FROM ${UserSchema.schemaName}`;

    const { filterStr, paginationStr } = dbUntils.getFilterProductsQuery(
        UserSchema.schema,
        filter,
        page,
        pageSize,
        UserSchema.defaultSort
    );
    if (filterStr) {
        selectQuery += filterStr;
        countQuery += " " + filterStr;
    }
    if (paginationStr) {
        selectQuery += " " + paginationStr;
    }
    const result = await dbConfig.db.pool.request().query(selectQuery);
    let countResult = await dbConfig.db.pool.request().query(countQuery);

    let totalUser = 0;
    if (countResult.recordsets[0].length > 0) {
        totalUser = countResult.recordsets[0][0].totalItem;
    }
    let totalPage = Math.ceil(totalUser / pageSize);
    const users = result.recordsets[0];

    return {
        page,
        pageSize,
        totalPage,
        totalUser,
        dataUsers: users,
    }
}

exports.deleteUserById = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let request = dbConfig.db.pool.request();
    let result = await request.input(
        `${UserSchema.schema.userID.name}`,
        UserSchema.schema.userID.sqlType, id
    )
        .query(`delete ${UserSchema.schemaName} WHERE ${UserSchema.schema.userID.name} =@${UserSchema.schema.userID.name}`);
    return result.recordsets;
}

exports.updateUserById = async (id, updateInfo) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connected to db");
    }
    if (!updateInfo) {
        throw new Error("Invalid input param");
    }
    updateInfo = UserSchema.validateData(updateInfo);
    updateInfo.password = await bcrypt.hash(updateInfo.password, 10);
    console.log(updateInfo);
    let query = `update ${UserSchema.schemaName} set`;
    const { request, updateStr } = dbUtils.getUpdateQuery(
        UserSchema.schema,
        dbConfig.db.pool.request(),
        updateInfo
    );
    if (!updateStr) {
        throw new Error("Invalid update param");
    }
    request.input(
        `${UserSchema.schema.userID.name}`,
        UserSchema.schema.userID.sqlType,
        id
    );
    query +=
        " " +
        updateStr +
        ` where ${UserSchema.schema.userID.name} = @${UserSchema.schema.userID.name}`;
    let result = await request.query(query);
    return result.recordsets;
}