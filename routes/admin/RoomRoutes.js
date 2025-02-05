const route = require('express').Router();
const roomController = require('../../controller/admin/RoomControllers');

route.get('/', roomController.getRooms);
route.get('/:id', roomController.getRoomById);
route.post('/create', roomController.createRoom);


module.exports = route