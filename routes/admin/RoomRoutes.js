const route = require('express').Router();
const roomController = require('../../controller/admin/RoomControllers');

route.get('/', roomController.getRooms);
route.get('/:id', roomController.getRoomById);
route.post('/create', roomController.createRoom);
route.put('/update', roomController.updateRoom);
route.delete('/delete/:id', roomController.deleteRoom);


module.exports = route