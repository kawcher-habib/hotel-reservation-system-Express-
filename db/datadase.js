require('dotenv').config();
const mysql = require('mysql');

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const connection = mysql.createConnection(
    {
        host: host,
        user: user,
        password: password,
        database: database
    }
)

connection.connect((err) => {
    if (err) {
        console.error('Error connection to the database: ', err.message);
        return;
    }
    console.log('Data Base Connected');
});

module.exports = connection;


// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'hotel_reser_db'
// });

// connection.connect();