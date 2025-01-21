const express = require('express')
const router = express.Router();

const {getAllReserveRooms, getReserVeRoomById, createNewRoom, updatedExistRoomById, deleteExistRoom} = require('../controller/ReserveController');


router.get('/', getAllReserveRooms);
router.get('/:id', getReserVeRoomById);
router.post('/create/room', createNewRoom);
router.put('/update/room/:id', updatedExistRoomById);
router.delete('/delete/room/:id', deleteExistRoom);



module.exports = router;