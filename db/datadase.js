require('dotenv').config();
const mysql = require('mysql');

const Host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const dataBase = process.env.DATABASE;

const connection = mysql.createConnection(
    {
        host: Host,
        user: user,
        password: password,
        dataBase: dataBase
    }
)

connection.connect();

module.exports = connection;
