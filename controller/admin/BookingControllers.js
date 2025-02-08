const path = require('path');
const fs = require('fs');

const errorFileDir = path.join(__dirname, '../../bookings/logs');

/**
 * show all
 * @param {*} req 
 * @param {*} res 
 */


const Booking = require("../../models/admin/Booking");
const { where } = require('sequelize');

const getBookings = async (req, res) => {

    try {
        const data = await Booking.findAll();
        if (data != " ") {
            return res.status(201).json(data);

        } else {
            return res.status(200).json({ message: "Data Not Found" });
        }

    } catch (error) {

        const errorFilePath = path.join(errorFileDir, 'booking.log');
        const errorMessage = `${new Date().toISOString()}-${error.stack}\n`;

        fs.appendFile(errorFilePath, errorMessage, (err) => {
            if (err) {
                console.error('Error writing to error log:', error.message);
            }
        });

        return res.status(500).json({ status: "error", message: "Internal Server Error" })

    }

}

/**
 * show book by id
 * 
 */

const getBookingById = async (req, res) => {

    const bookingId = req.params['book_id'];

    if (!bookingId) {
        return res.status(400).json({ message: "Booking Id Required" });
    } else {

        try {
            const data = await Booking.findAll({
                where: {
                    booking_id: bookingId
                }
            })

            if (data != "") {
                return res.status(201).json(data);
            } else {
                return res.status(200).json({ message: "Data Not Found" });
            }

        } catch (error) {
            const errorFilePath = path.join(errorFileDir, 'bookingById.log');
            const errorMessage = `${new Date().toISOString()}-${error.stack}\n`;

            fs.appendFile(errorFilePath, errorMessage, (err) => {
                if (err) {
                    console.error('Error writing to error log:', error.message);
                }
            });

            return res.status(500).json({ status: "error", message: "Internal Server Error" })

        }

    }

}

/**
 * Create new booking
 * 
 * 
 */

const createNewBooking = async (req, res) => {

    const body = req.body;

    const { booking_id, hotel_id, room_num, user_id, check_in, check_out, total_price } = body;

    if (!booking_id) {
        return res.status(400).json({ status: "error", message: "booking id is required" });
    } else if (!hotel_id) {
        return res.status(400).json({ status: "error", message: "hotel id is required" });
    } else if (!room_num) {
        return res.status(400).json({ status: "error", message: "room number is required" });
    }
    else if (!user_id) {
        return res.status(400).json({ status: "error", message: "user id is required" });
    }
    else if (!check_in) {
        return res.status(400).json({ status: "error", message: "check in is required" });
    }
    else if (!check_out) {
        return res.status(400).json({ status: "error", message: "check out is required" });
    } else if (!total_price) {
        return res.status(400).json({ status: "error", message: "total price is required" });
    } else {
        try {

            const booking = await booking.create(body);
            return res.status(201).json({ message: "New booking Create ", data: booking });

        } catch (error) {

            const errorFilePath = path.join(errorFileDir, 'createNewBooking.log');
            const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;

            fs.appendFile(errorFilePath, errorMessage, (err) => {
                if (err) {
                    console.error('Error writing to error log:', error.message);
                }
            });

            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }

}


/**
 *  Updated booking 
 * 
 */
const updatedBooking = async (req, res) => {
    const body = req.body;

    const { booking_id, hotel_id, room_num, user_id, check_in, check_out, total_price } = body;

    if (!booking_id) {
        return res.status(400).json({ status: "error", message: "booking id is required" });
    } else if (!hotel_id) {
        return res.status(400).json({ status: "error", message: "hotel id is required" });
    } else if (!room_num) {
        return res.status(400).json({ status: "error", message: "room number is required" });
    }
    else if (!user_id) {
        return res.status(400).json({ status: "error", message: "user id is required" });
    }
    else if (!check_in) {
        return res.status(400).json({ status: "error", message: "check in is required" });
    }
    else if (!check_out) {
        return res.status(400).json({ status: "error", message: "check out is required" });
    } else if (!total_price) {
        return res.status(400).json({ status: "error", message: "total price is required" });
    } else {

        try {

            const booking = await booking.update(
                { hotel_id: booking_id, room_num: room_num, check_in: check_in, check_out: check_out },
                {
                    where: {
                        booking_id: booking_id
                    }
                }
            );
            return res.status(201).json({ message: `${booking_id} Updated successfully`, data: booking });

        } catch (error) {

            const errorFilePath = path.join(errorFileDir, 'updateBooking.log');
            const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;

            fs.appendFile(errorFilePath, errorMessage, (err) => {
                if (err) {
                    console.error('Error writing to error log:', error.message);
                }
            });

            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }



}

/**
 * Delete 
 *  TODO: 
 */
const deleteBooking = async (req, res) => {

}


/**
 *  Booking Status
 * TODO:
 */

const bookingStatus = async (req, res) => {

}


module.exports = {
    getBookings,
    getBookingById,
    createNewBooking,
    updatedBooking,
    deleteBooking,
    bookingStatus
}