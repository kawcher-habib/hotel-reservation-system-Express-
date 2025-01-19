const express = require('express')
const router = express.Router();

const {getAllReserveRooms, getReserVeRoomById, createNewRoom} = require('../controller/ReserveController');


router.get('/', getAllReserveRooms);
router.get('/:id', getReserVeRoomById);
router.post('/create/room', createNewRoom);

module.exports = router;