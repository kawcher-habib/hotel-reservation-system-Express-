
const connection = require('../db/datadase');


const Registration = () =>{

}

const Login = (body, tableName) =>{
    const {email, password} = body;

    return new Promise((resolve, reject) =>{

        const slq = `SELECT * FROM ${tableName} WHERE email= ?`;
        connection.query(slq, [email], (error, result)=>{
            
                if(error){
                    return reject(error);
                }else{
                    return resolve(result);
                }
        });
    })


    

}


module.exports = {
    Registration,
    Login
}