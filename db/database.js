require('dotenv').config();
const mysql = require('mysql');
const { Sequelize } = require('sequelize');

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



const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql'
});

(async () => {

    try {
        await sequelize.authenticate();
        console.log("ORM Connection has been established successfully");
    } catch(error) {
        console.error('Unable to connect to the database: ', error);
    }

})();

module.exports = {
        connection,
        sequelize
    }



// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'hotel_reser_db'
// });

// connection.connect();