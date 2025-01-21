const express = require('express');
const route = express.Router();
let conn = require('../db/datadase');


route.get('/', (req, res) => {
    return res.status(200).json({ message: "Hi" });
})
route.get('/test', () => {
    
    
        console.log(conn);
    
})

module.exports = route;