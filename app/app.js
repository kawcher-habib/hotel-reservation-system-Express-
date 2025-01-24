require('dotenv').config('../.env')
const express = require('express');
const {notFoundHandler, errorHandler} = require('./error');
const auth = require('../routes/AuthRoutes');
const reserveRoutes = require('../routes/ReserveRoutes');
const employeeRoutes = require('../routes/EmployeeRoutes');



const app = express();

app.use(require('./middleware'));

app.use(require('./routes'));


//Auth Routes
    app.use('/api/auth', auth);
    
//Employees Routes
    app.use('/api/employee', employeeRoutes);

//Reservation Routes
    app.use('/api/reserve', reserveRoutes);


    //Query 
    
    


// Error Handling
app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;