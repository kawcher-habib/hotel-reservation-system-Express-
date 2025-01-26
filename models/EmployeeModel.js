

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

const UpdatedExistEmp = (body) =>{

    const { id, full_name, email, phone, address, role, dept } = body;

    return new Promise((resolve, reject) =>{

        const sql = "UPDATE employees SET full_name=?, phone=?, address=?, role=?, dept=? WHERE id =? and email = ?";

        connection.query(sql, [full_name, phone, address, role, dept, id, email], (error, result)=>{
            
            if(error){
                console.log(error);
                return reject({status: "error", message:"Something is wrong"});
            }
            return resolve({status: "success", message:"Employee data updated successfully"});
        })
    })
}

const EmpStatus = (id, value) =>{

    return new Promise((resolve, reject)=>{

        const sql = "UPDATE employees SET status=? WHERE id=?";
        connection.query(sql, [value, id], (error, result)=>{
            if(error){
                return reject(error);
            }

            return resolve({status:200, message:`User ${value == 0 ?"Active":"Deactive"}`})
        })
    })

}


module.exports = {
    AllData,
    GetDataById,
    CreateNewEmp,
    UpdatedExistEmp,
    EmpStatus
}