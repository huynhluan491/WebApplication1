const sql = require("mssql");
const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");

const SubimgSchema = new ModelSchema({
    subimgID: new ModelSchemaValidator({
        name: "subimgID",
        sqlType: sql.Int,
    }),
    image: new ModelSchemaValidator({
        name: "image",
        sqlType: sql.VarChar,
        require: true,
    }),
    alt: new ModelSchemaValidator({
        name: "alt",
        sqlType: sql.VarChar,
        require: true,
    }),
    productID: new ModelSchemaValidator({
        name: "productID",
        sqlType: sql.Int,
    }),
    createdAT: new ModelSchemaValidator({
        name: "createdAT",
        sqlType: sql.DateTime,
        default: new Date().toISOString(),
        require: true,
    }),
},
    "subimg", "createdAT"
)


module.exports = SubimgSchema;