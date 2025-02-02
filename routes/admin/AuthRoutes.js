const express =  require('express');
const route = express.Router();

const {registration, login} = require('../../controller/admin/AuthController');


route.post('/registration', registration);
route.post('/login', login);


module.exports = route;