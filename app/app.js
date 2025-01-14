require('dotenv').config('../.env')
const express = require('express');
const {notFoundHandler, errorHandler} = require('./error');
const reserveRoutes = require('../routes/ReserveRoutes');


const app = express();

app.use(require('./middleware'));

app.use(require('./routes'));

//Reservation Routes

    app.use('/api/reserve', reserveRoutes);
    


// Error Handling
app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;