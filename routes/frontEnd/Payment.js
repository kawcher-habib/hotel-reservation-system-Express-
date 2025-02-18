const payment = require('../../controller/frontEnd/Payments');

const route = require('express').Router();


route.get('/ssl', payment.paymentWithSSl);
route.post('/ssl/success/:tranid',payment.paymentSuccess);
route.get('/ssl/fail/:tranid',payment.paymentFail);
route.get('/ssl/cancel/:tranid',payment.paymentCancel);
route.get('/ssl/inp',payment.paymentInp);



module.exports = route;