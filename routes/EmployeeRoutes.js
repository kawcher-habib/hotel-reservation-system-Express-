const express = require('express');
const route = express.Router();
let conn = require('../db/datadase');
const {getAllData, getDataById, createNewEmployee} = require('../controller/EmployeeController');
const {createTable} = require('../util/queryexicuting');


route.get('/', getAllData);
route.post('/create', createNewEmployee);





/// sql
route.get('/create/table', (req, res)=>{

    /**
 *  Employee Entity 
 *      Full Name
 *      Email
 *      Phone
 *      Address
 *      Role
 *      Joining Data
 * 
 */
    const sql = `
    CREATE TABLE employees (
    id int not null auto_increment primary key,
    full_name varchar(50) not null,
    email varchar(50) not null ,
    phone varchar(20) not null,
    address varchar(100) not null,
    role enum('admin', 'manager', 'staff') default 'staff',
    dept enum('front officer', 'management', 'housekeeping', 'food & beverage', 
    'account and finance') default 'management',
    join_date date,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp);
    
    `;




    createTable(sql);
    res.status(200).json("executing");
})

module.exports = route;