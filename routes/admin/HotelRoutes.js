
const route = require('express').Router();
const hotelController = require('../../controller/admin/HotelControllers');


route.get('/', hotelController.getHotels );
route.get('/:hotel_id', hotelController.getHotelById);
route.post('/create', hotelController.create);
route.put('/update', hotelController.update);
route.delete('/delete/:hotel_id', hotelController.deleteHotel);
route.post('/status/:id', hotelController.status);


module.exports = route;
