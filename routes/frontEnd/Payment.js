const payment = require('../../controller/frontEnd/Payments');

const route = require('express').Router();


route.get('/ssl', payment.paymentWithSSl);
route.get('/ssl/success',payment.paymentSuccess);
route.get('/ssl/fail',payment.paymentFail);
route.get('/ssl/cancel',payment.paymentCancel);
route.get('/ssl/inp',payment.paymentInp);



module.exports = route;