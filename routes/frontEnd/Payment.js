const payment = require('../../controller/frontEnd/Payments');

const route = require('express').Router();


route.get('/ssl', payment);



module.exports = route;