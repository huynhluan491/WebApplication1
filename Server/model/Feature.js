const sql = require("mssql");
const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator")

const FeatureSchema = new ModelSchema({
    featureID: new ModelSchemaValidator({
        name: "featureID",
        sqlType: sql.Int
    }),
    feature: new ModelSchemaValidator({
        name: "feature",
        sqlType: sql.NVarChar,
        require: true,
    }),
    productID: new ModelSchemaValidator({
        name: "productID",
        sqlType: sql.Int,
    }),
    createdAt: new ModelSchemaValidator({
        name: "createAt",
        sqlType: sql.DateTime,
        default: new Date().toISOString(),
    })
},
    "feature", "createdAt"
)


module.exports = FeatureSchema;