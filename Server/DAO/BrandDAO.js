const dbConfig = require("../database/dbconfig");
const BrandSchema = require("../model/Brand");
const dbUtils = require("../utils/dbUtils");
const imageUtil = require("../utils/ImageUtil");
const StaticData = require("../utils/StaticData");
const ProductSchema = require("../model/Product")

exports.addBrandIfNotExists = async (brand) => {
    const dbPool = dbConfig.db.pool;
    if (!dbPool) {
        throw new Error("Not connected to db");
    }
    brand.createdAt = new Date().toISOString();

    let insertData = BrandSchema.validateData(brand);
    let query = `SET IDENTITY_INSERT ${BrandSchema.schemaName} ON insert into ${BrandSchema.schemaName}`;
    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUtils.getInsertQuery(BrandSchema.schema, dbPool.request(), insertData);
    if (!insertFieldNamesStr || !insertValuesStr) {
        throw new Error("Invalid insert param");
    }

    query +=
        " (" +
        insertFieldNamesStr +
        ") select  " +
        insertValuesStr +
        ` WHERE NOT EXISTS(SELECT * FROM ${BrandSchema.schemaName} WHERE brandName = @brandName)` +
        ` SET IDENTITY_INSERT ${BrandSchema.schemaName} OFF`;
    let result = await request.query(query);
    return result.recordsets;
};

// exports.getBrandById = async (id) => {
//     if (!dbConfig.db.pool) {
//         throw new Error("Not connect to db");
//     }
//     let result = await dbConfig.db.pool
//         .request()
//         .input(BrandSchema.schema.brandID.name, BrandSchema.schema.brandID.sqlType, id)
//         .query(`SELECT *FROM PRODUCT ${BrandSchema.schemaName} WHERE ${BrandSchema.schema.brandID.name} =@${BrandSchema.schema.brandID.name}`)
//     console.log(result);
//     return result.recordsets[0];
// };

exports.getBrandById = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(BrandSchema.schema.brandID.name, BrandSchema.schema.brandID.sqlType, id)
        .query(`SELECT *FROM ${BrandSchema.schemaName} WHERE ${BrandSchema.schema.brandID.name} =@${BrandSchema.schema.brandID.name}`)
    // console.log(result);
    const brand = result.recordsets[0][0];
    // Lấy tất cả sản phẩm thuộc danh mục
    const products = await dbConfig.db.pool
        .request()
        .input(BrandSchema.schema.brandID.name, BrandSchema.schema.brandID.sqlType, id)
        .query(`SELECT * FROM PRODUCT WHERE ${BrandSchema.schema.brandID.name} =@${BrandSchema.schema.brandID.name} `);

    brand.products = products.recordsets[0]; // Gán danh sách sản phẩm vào brand
    await Promise.all(brand.products.map(async (element) => {
        const converted = await imageUtil.convertImageToBase64(element.image);
        element.image = converted.Base64;
    }));

    return brand;
};


exports.getAllBrand = async () => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .query(`SELECT *FROM BRAND `);
    return result.recordsets[0];
}

exports.clearAll = async () => {
    query = `delete ${BrandShcema.schemaName}  DBCC CHECKIDENT ('[${BrandShcema.schemaName} ]', RESEED, 1);`;
    let result = await dbConfig.db.pool.request().query(query);
    return result.recordsets;

}


exports.getBrandPagination = async (filter) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }

    const page = filter.page * 1 || 1;
    let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
    if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
        pageSize = StaticData.config.MAX_PAGE_SIZE;
    }

    const selectQuery = `SELECT * FROM PRODUCT ${BrandSchema.schemaName}`;
    const countQuery = `SELECT COUNT(*) as totalItem FROM ${BrandSchema.schemaName}`;
    const countProduct = `SELECT COUNT(*) as totalItem FROM PRODUCT ${BrandSchema.schemaName}`;

    const { filterStr, paginationStr } = dbUtils.getFilterProductsQuery(
        BrandSchema.schema,
        filter,
        page,
        pageSize,
        BrandSchema.defaultSort
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
    const totalBrand = countResult.recordsets[0][0].totalItem;
    const totalPage = Math.ceil(totalProduct / pageSize);
    const brands = result.recordsets[0];
    await Promise.all(
        brands.map(async (element) => {
            const converted = await imageUtil.convertImageToBase64(element.image);
            element.image = converted.Base64;
        })
    )

    return {
        page,
        pageSize,
        totalProduct,
        totalPage,
        totalBrand,
        dataBrand: brands,
    };
};

