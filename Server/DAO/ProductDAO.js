const ProductSchema = require("../model/Product");
const BrandSchema = require("../model/Brand")
const RatingSchema = require("../model/Rating");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
const StaticData = require("../utils/StaticData");
const imageUtil = require("../utils/ImageUtil");

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
    const products = result.recordsets[0][0];
    if (products) {
        const converted = await imageUtil.convertImageToBase64(products.image);
        products.image = converted.Base64;
        return products;
    } else {
        return null; // Product not found
    }


}


exports.getProductByName = async (name) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool
        .request()
        .input(ProductSchema.schema.name.name, ProductSchema.schema.name.sqlType, name)
        .query(`SELECT *FROM ${ProductSchema.schemaName} WHERE ${ProductSchema.schema.name.name} =@${ProductSchema.schema.name.name}`)
    return result.recordsets[0][0];
}

exports.getAllProduct = async () => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connected to db");
    }

    let result = await dbConfig.db.pool
        .request()
        .query(`SELECT * FROM PRODUCT`);
    const products = result.recordsets[0];

    await Promise.all(products.map(async (element) => {
        const converted = await imageUtil.convertImageToBase64(element.image);
        element.image = converted.Base64;
    }));

    return products;
}


exports.getAllProductPagination = async (filter) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connected to db");
    }

    const page = filter.page * 1 || 1;
    let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
    if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
        pageSize = StaticData.config.MAX_PAGE_SIZE;
    }
    let selectQuery = `SELECT ${ProductSchema.schemaName}.*, ${BrandSchema.schemaName}.brandName FROM ${ProductSchema.schemaName}
  join ${BrandSchema.schemaName} on ${BrandSchema.schemaName}.brandID = ${ProductSchema.schemaName}.brandID `;
    let countQuery = `SELECT COUNT(DISTINCT ${ProductSchema.schema.productID.name}) as totalItem from ${ProductSchema.schemaName}`;

    const { filterStr, paginationStr } = dbUtils.getFilterProductsQuery(
        ProductSchema.schema,
        filter,
        page,
        pageSize,
        ProductSchema.defaultSort
    );

    console.log(filterStr);

    if (filterStr) {
        selectQuery += " " + filterStr;
        countQuery += " " + filterStr;
    }

    if (paginationStr) {
        selectQuery += " " + paginationStr;
    }

    // console.log("selectQuery filter product", selectQuery);

    const result = await dbConfig.db.pool.request().query(selectQuery);
    let countResult = await dbConfig.db.pool.request().query(countQuery);
    let totalProduct = 0;
    if (countResult.recordsets[0].length > 0) {
        totalProduct = countResult.recordsets[0][0].totalItem;
    }
    let totalPage = Math.ceil(totalProduct / pageSize);
    const products = result.recordsets[0];
    // console.log("finish log", selectQuery);
    await Promise.all(
        products.map(async (element) => {
            const converted = await imageUtil.convertImageToBase64(element.image);
            element.image = converted.Base64;
        })
    )
    return {
        page,
        pageSize,
        totalPage,
        totalProduct,
        dataProducts: products,

    };
}

exports.insertNewProduct = async (product) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connected to db");
    }

    if (!product) {
        throw new Error("Invalid params");
    }

    product.createdAt = new Date().toISOString();
    let insertData = ProductSchema.validateData(product);

    // Check if the product has an image and convert it to Base64
    if (insertData.image) {
        const convertedImage = await imageUtil.convertImageToBase64(insertData.image);
        if (convertedImage) {
            insertData.image = convertedImage.Base64;
        }
    }

    let query = `INSERT INTO ${ProductSchema.schemaName} `;

    const { request, insertFieldNamesStr, insertValuesStr } =
        dbUtils.getInsertQuery(ProductSchema.schema, dbConfig.db.pool.request(), insertData);
    query += `(${insertFieldNamesStr}) values (${insertValuesStr})`;

    console.log('query: ', query);

    let result = await request.query(query);
    return result.recordsets;

};

exports.createNewRating = async (product) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    if (!product) {
        throw new Error("Invalid params");
    }
    let result = await dbConfig.db.pool
        .request()
        .query(`INSERT INTO ${RatingSchema.schemaName}(${ProductSchema.schema.productID.name}) values(${product.productID})`);
    return result.recordsets;
}

exports.updateProductByID = async (id, update) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connected to db");
    }

    if (!update) {
        throw new Error("Invalid params");
    }

    let query = `UPDATE ${ProductSchema.schemaName} SET`;
    const { request, updateStr } = dbUtils.getUpdateQuery(
        ProductSchema.schema,
        dbConfig.db.pool.request(),
        update
    );

    if (!updateStr) {
        throw new Error("Invalid update params");
    }

    // Check if the update includes the image path
    if (update.image) {
        const convertedImage = await imageUtil.convertImageToBase64(update.image);
        if (convertedImage) {
            request.input('image', sql.VarChar, convertedImage.Base64);
            updateStr += `, ${ProductSchema.schema.image.name} = @image`;
        }
    }

    request.input(ProductSchema.schema.productID.name, ProductSchema.schema.productID.sqlType, id);
    query += " " + updateStr +
        ` WHERE ${ProductSchema.schema.productID.name} = @${ProductSchema.schema.productID.name}`;

    console.log('query : ', query);

    let result = await request.query(query);
    return result.recordsets;

}

exports.deleteProductByID = async (id) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    let result = await dbConfig.db.pool.request()
        .input(ProductSchema.schema.productID.name, ProductSchema.schema.productID.sqlType, id)
        .query(`DELETE ${ProductSchema.schemaName} WHERE ${ProductSchema.schema.productID.name} =@${ProductSchema.schema.productID.name}`);
    console.log('result: ', result);
    return result.recordsets
}

exports.deleteMutilProductByID = async (idList) => {
    if (!dbConfig.db.pool) {
        throw new Error("Not connect to db");
    }
    for (let i = 0; i < idList.length; i++) {
        ProductSchema.schema.productID.validate(idList[i]);
    }
    let request = dbConfig.db.pool.request();
    const deleteStr = dbUtils.getDeleteQuery(ProductSchema, idList);
    let result = await request.query(
        `DELETE FROM ${ProductSchema.schemaName} WHERE ${ProductSchema.schema.productID.name} ${deleteStr}`
    );
    // console.log('query: ', result)
    return result.recordsets;
}

exports.clearAll = async () => {
    query = `delete ${ProductSchema.schemaName}  DBCC CHECKIDENT ('[${ProductSchema.schemaName} ]', RESEED, 1);`;
    let result = await dbConfig.db.pool.request().query(query);
    return result.recordsets;
};