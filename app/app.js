require('dotenv').config('../.env')
const express = require('express');
const { notFoundHandler, errorHandler } = require('./error');
const authRoutes = require('../routes/AuthRoutes');
const reserveRoutes = require('../routes/ReserveRoutes');
const employeeRoutes = require('../routes/EmployeeRoutes');
const { authenticate } = require('../middleware/authenticate');



const app = express();

app.use(require('./middleware'));

app.use(require('./routes'));


//Auth Routes
app.use('/api/auth', authRoutes);


/// API Access permission [department Admin, front desk department for create,updated, delete and show all data]. 
    //Employees Routes
    
    app.use('/api/employee', authenticate, employeeRoutes);

    //Reservation Routes
    app.use('/api/reserve', authenticate, reserveRoutes);





//Query 




// Error Handling
app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;