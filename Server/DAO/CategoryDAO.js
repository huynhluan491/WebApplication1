const dbConfig = require("../database/dbconfig");
const CategorySchema = require("../model/Category");
const dbUtils = require("../utils/dbUtils");
const productDAO = require("../DAO/ProductDAO")
const imageUtil = require("../utils/ImageUtil");
const StaticData = require("../utils/StaticData");

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

exports.clearAll = async () => {
    query = `delete ${CategorySchema.schemaName}  DBCC CHECKIDENT ('[${CategorySchema.schemaName} ]', RESEED, 1);`;
    let result = await dbConfig.db.pool.request().query(query);
    return result.recordsets;
};

// exports.getCategoryByID = async (id) => {
//     if (!dbConfig.db.pool) {
//         throw new Error("Not connect to db");
//     }
//     let result = await dbConfig.db.pool
//         .request()
//         .input(CategorySchema.schema.categoryID.name, CategorySchema.schema.categoryID.sqlType, id)
//         .query(`SELECT * FROM ${CategorySchema.schemaName} WHERE ${CategorySchema.schema.categoryID.name} =@${CategorySchema.schema.categoryID.name} `)
//     return result.recordsets[0][0];
// }
exports.getCategoryByID = async (id) => {

    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(CategorySchema.schema.categoryID.name, CategorySchema.schema.categoryID.sqlType, id)
        .query(`SELECT * FROM ${CategorySchema.schemaName} WHERE ${CategorySchema.schema.categoryID.name} =@${CategorySchema.schema.categoryID.name} `);

    const category = result.recordsets[0][0];

    // Lấy tất cả sản phẩm thuộc danh mục
    const products = await dbConfig.db.pool
        .request()
        .input(CategorySchema.schema.categoryID.name, CategorySchema.schema.categoryID.sqlType, id)
        .query(`SELECT * FROM PRODUCT WHERE ${CategorySchema.schema.categoryID.name} =@${CategorySchema.schema.categoryID.name} `);

    category.products = products.recordsets[0]; // Gán danh sách sản phẩm vào category
    await Promise.all(category.products.map(async (element) => {
        const converted = await imageUtil.convertImageToBase64(element.image);
        element.image = converted.Base64;
    }));

    return category;

}

exports.getCategory = async () => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connected to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .query(`select * from category`);
    console.log(result)
    return result.recordsets[0];
};

exports.getCategoryPagination = async (filter) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }

    const page = filter.page * 1 || 1;
    let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
    if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
        pageSize = StaticData.config.MAX_PAGE_SIZE;
    }

    const selectQuery = `SELECT * FROM PRODUCT ${CategorySchema.schemaName}`;
    const countQuery = `SELECT COUNT(*) as totalItem FROM ${CategorySchema.schemaName}`;
    const countProduct = `SELECT COUNT(*) as totalItem FROM PRODUCT ${CategorySchema.schemaName}`;

    const { filterStr, paginationStr } = dbUtils.getFilterProductsQuery(
        CategorySchema.schema,
        filter,
        page,
        pageSize,
        CategorySchema.defaultSort
    );

    let completeSelectQuery = selectQuery;
    if (filterStr) {
        completeSelectQuery += " WHERE " + filterStr;
    }

    if (paginationStr) {
        completeSelectQuery += " " + paginationStr;
    }

    const result = await dbConfig.db.pool.request().query(completeSelectQuery);
    const countResult = await dbConfig.db.pool.request().query(countQuery);
    const countProducts = await dbConfig.db.pool.request().query(countProduct);
    console.log(`query: `, completeSelectQuery)

    const totalProduct = countProducts.recordsets[0][0].totalItem;
    const totalCategory = countResult.recordsets[0][0].totalItem;
    const totalPage = Math.ceil(totalProduct / pageSize);
    const categories = result.recordsets[0];
    await Promise.all(
        categories.map(async (element) => {
            const converted = await imageUtil.convertImageToBase64(element.image);
            element.image = converted.Base64;
        })
    )

    return {
        page,
        pageSize,
        totalProduct,
        totalPage,
        totalCategory,
        dataCategories: categories,
    };
};

