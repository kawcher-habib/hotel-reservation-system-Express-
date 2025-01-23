
const connection = require('../db/datadase');

const isItValid = (table, prefix, id) => {


    return new Promise((resolve, reject) => {

        const sql = `SELECT ${prefix} FROM ${table} WHERE ${prefix} = ?`;

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
    isItValid
}