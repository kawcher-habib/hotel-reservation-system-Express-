

/**
 *  Validation with id, email and security 
 */
const connection = require('../db/datadase');

const AllData = () => {

    const sql = "SELECT * FROM employees";
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        })

    })

}

const GetDataById = (id) => {

    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM employees WHERE id =?";
        connection.query(sql, [id], (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        })
    })

}

const CreateNewEmp = (body) => {
    const { full_name, email, phone, address, role, dept } = body;

    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO employees(full_name, email, phone, address, role, dept)VALUES(?,?,?,?,?,?)";
        connection.query(sql, [full_name, email, phone, address, role, dept], (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve({ status: "Success", message: "New Employees Created Successfully" });
        })
    })

}


module.exports = {
    AllData,
    GetDataById,
    CreateNewEmp
}