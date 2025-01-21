// const { query } = require('express');
// let conn = require('../db/datadase');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotel_reser_db'
});

connection.connect();

const GetAllData = () => {
    return new Promise((resolve, reject) => {

        const sql = "SELECT * FROM reservation";
        connection.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        })

    })
}

const getDataByRoomId = (id) => {

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM reservation WHERE room_number=${id}`;
        connection.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        })

    })

}

// Create New Room

const CreateNewRoom = (body) => {

    const { guest_name, room_number, contact_number } = body;
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO reservation(guest_name, room_number, contact_number)VALUES(?,?,?)`;

        connection.query(sql, [guest_name, room_number, contact_number], (error, results) => {

            if (error) {
                console.error(error.message);
                return reject(error);
            } else {
                return resolve({ Status: "Success", message: "New Room Created successfully" });
            }
        })
    })


}

// Updated Existing Room 
const updatedRoom = (id, body) => {
    const { guest_name, room_number, contact_number } = body;

    return new Promise((resolve, reject) => {

        const sql = "UPDATE reservation SET guest_name = ?, room_number =?, contact_number =? WHERE reser_id=?";
        connection.query(sql, [guest_name, room_number, contact_number, id], (error, results) => {
            if (error) {
                console.log(error.message);
                return reject(error.message);
            }


            return resolve({ Status: "Success", message: `${id} Room Updated successfully` });

        })
    })

}

// Delete Room

const deleteRoom = (id) => {

    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM reservation WHERE reser_id= ?";

        connection.query(sql, [id], (error, results) => {

            if (error) {
                console.log(error.message);
                return reject(error.message);
            }
            return resolve({ Status: "success", message: `${id} Room delete successfully` });
        })

    })
}


/// Helper Function

const isItValid = (prefix, id) => {


    return new Promise((resolve, reject) => {

        const sql = `SELECT ${prefix} FROM reservation WHERE ${prefix} = ?`;

        connection.query(sql, [id], (error, results) => {

            if (error) {
                console.log(error);
                return reject(error);
            }

            if (results.length > 0) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        })

    })


}

module.exports = {
    GetAllData,
    getDataByRoomId,
    CreateNewRoom,
    updatedRoom,
    deleteRoom,
    isItValid
}
