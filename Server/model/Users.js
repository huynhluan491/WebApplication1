const sql = require('mssql');
const ModelSchema = require('./ModelSchema');
const ModelSchemaValidator = require('./ModelSchemaValidator');
const StaticData = require('../utils/StaticData');

const UserSchema = new ModelSchema({
    userID: new ModelSchemaValidator({
        name: "userID",
        sqlType: sql.Int,
    }),
    userName: new ModelSchemaValidator({
        name: "userName",
        sqlType: sql.VarChar,
        require: true,
    }),
    password: new ModelSchemaValidator({
        name: "password",
        sqlType: sql.VarChar,
        require: true,
    }),
    email: new ModelSchemaValidator({
        name: "email",
        sqlType: sql.VarChar,
        require: true,
        validator: function (val) {
            return String(val)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        },
    }),
    auth: new ModelSchemaValidator({
        name: "auth",
        require: true,
        sqlType: sql.Int,
        default: StaticData.AUTH.role.user,
    }),
    createdAt: new ModelSchemaValidator({
        name: "createdAT",
        require: true,
        sqlType: sql.DateTime,
        default: new Date().toISOString(),
    })
},
    "Users", "auth"
);



module.exports = UserSchema;