// const { query } = require('express');
// let conn = require('../db/datadase');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hotel_reser_db'
});

connection.connect();

    const GetAllData = ()=>{
        return new Promise((resolve, reject)=>{

            const sql = "SELECT * FROM reservation";
            connection.query(sql, (error, results)=>{
                if(error){
                    return reject(error);
                }
                resolve(results);
            })

        })
    }

    const getDataByRoomId = (id) =>{

    }


    module.exports = {
        GetAllData
    }
