const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});

const app = require('./app');
const sql = require('mssql');
const dbconfig = require('./database/dbconfig')

const appPool = new sql.ConnectionPool(dbconfig.sqlConfig)
appPool.connect()
    .then(function (pool) {
        dbconfig.db.pool = pool
        console.log('SQL connected !')
    }).catch(function (err) {
        console.error('Error creating connection pool', err)
    });

//START SERVER
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});