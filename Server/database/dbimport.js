const dotenv = require("dotenv");
const sql = require("mssql");
dotenv.config({
    path: "../config.env"
});

const dbConfig=require("./dbconfig");
const appPool=new sql.ConnectionPool(dbConfig.sqlConfig)

const fs=require("fs");
const UserDAO=require("../DAO/UserDAO");