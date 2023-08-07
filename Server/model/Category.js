const sql = require("mssql");
const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");

const CategorySchema = new ModelSchema({
    categoryID: new ModelSchemaValidator({
        name: "categoryID",
        sqlType: sql.Int,

    }),
    categoryName: new ModelSchemaValidator({
        name: "categoryName",
        sqlType: sql.NVarChar,
        require: true
    }),
    createdAT: new ModelSchemaValidator({
        name: "createdAT",
        sqlType: sql.DateTime,
        default: new Date().toISOString(),
    }),
},
    "Category", "createdAT"
)

module.exports = CategorySchema;