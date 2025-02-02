const {connection} = require('../../db/database');



const GetAllData = () => {
    return new Promise((resolve, reject) => {

        const sql = "SELECT * FROM reservation";

        connection.query(sql, (error, results) => {

            if (error) {
                return reject(error);
            }
            return resolve(results);
        })


    })
}

const GetDataByRoomId = (id) => {

    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM reservation WHERE room_number= ?";
        connection.query(sql, [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        })

    })

}


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

const UpdatedRoom = (id, body) => {
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


const DeleteRoom = (id) => {

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



module.exports = {
    GetAllData,
    GetDataByRoomId,
    CreateNewRoom,
    UpdatedRoom,
    DeleteRoom,
}
