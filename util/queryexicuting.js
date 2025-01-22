const conn = require('../db/datadase');


const createTable = (sql) => {
  
    conn.query(sql, (error, result)=>{
        if(error){
            console.error(error.message);
        }else{
            console.log("Table create successfully");
        }
    })
}

module.exports ={
    createTable
}