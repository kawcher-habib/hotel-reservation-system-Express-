const express = require('express')
const router = express.Router();

const {getAllReserveRooms, getReserVeRoomById} = require('../controller/ReserveController');


router.get('/', getAllReserveRooms);
router.get('/:id', getReserVeRoomById);

module.exports = router;