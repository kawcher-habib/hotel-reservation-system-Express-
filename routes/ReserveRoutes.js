const express = require('express')
const router = express.Router();

const reserveController = require('../controller/ReserveController');


router.get('/', (req, res)=>{
         reserveController.getAllReserveRooms();
        // res.send("Hello");
})

module.exports = router;