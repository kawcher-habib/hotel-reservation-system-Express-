require('dotenv').config('../.env')
const express = require('express');
const { notFoundHandler, errorHandler } = require('./error');
const authRoutes = require('../routes/admin/AuthRoutes');
const reserveRoutes = require('../routes/admin/ReserveRoutes');
const employeeRoutes = require('../routes/admin/EmployeeRoutes');
const hotelRoutes = require('../routes/admin/HotelRoutes');
const roomRoutes = require('../routes/admin/RoomRoutes');
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

    // Hotel Routes
    app.use('/api/hotel', hotelRoutes);

    // Room Routes
    app.use('/api/room', roomRoutes);





//Query 




// Error Handling
app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;