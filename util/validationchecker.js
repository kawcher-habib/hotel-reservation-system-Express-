
const connection = require('../db/database');

const isItValid = (table, prefix, prefix2,  id) => {


    return new Promise((resolve, reject) => {

        const sql = `SELECT ${prefix} FROM ${table} WHERE ${prefix2} = ?`;

        connection.query(sql, [id], (error, results) => {

            if (error) {
                console.log(error);
                return reject(error);
            }

            if (results.length > 0) {
                return resolve({isValid:true, data: results});
            } else {
                return resolve(false);
            }
        })

    })


}


module.exports = {
    isItValid
}