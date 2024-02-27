const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Cavalodetroia2110phollo',
    database: 'nodemyslq1',
})
module.exports = pool