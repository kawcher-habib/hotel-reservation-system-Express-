const bookingsController = require('../../controller/admin/BookingControllers');

const route = require('express').Router();

route.get('/', bookingsController.getBookings);
route.get('/:book_id', bookingsController.getBookingById);
route.post('/create', bookingsController.createNewBooking);
route.put('/update', bookingsController.updatedBooking);
route.delete('/delete/:book_id', bookingsController.deleteBooking);
route.post('/status/:id', bookingsController.bookingStatus);



module.exports = route