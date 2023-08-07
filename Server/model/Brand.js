const sql = require("mssql");
const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");

const BrandSchema = new ModelSchema({
    brandID: new ModelSchemaValidator({
        name: "brandID",
        sqlType: sql.Int,
    }),
    brandName: new ModelSchemaValidator({
        name: "brandName",
        sqlType: sql.NVarChar,
        require: true,
    }),
    createdAt: new ModelSchemaValidator({
        name: "createdAt",
        sqlType: sql.DateTime,
        require: true,
        default: new Date().toISOString(),
    }),
},
    "Brand", "createdAt"
)

module.exports = BrandSchema;