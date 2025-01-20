const express = require('express')
const router = express.Router();

const {getAllReserveRooms, getReserVeRoomById, createNewRoom, updatedExistRoomById} = require('../controller/ReserveController');


router.get('/', getAllReserveRooms);
router.get('/:id', getReserVeRoomById);
router.put('/update/room/:id', updatedExistRoomById);
router.post('/create/room', createNewRoom);


module.exports = router;