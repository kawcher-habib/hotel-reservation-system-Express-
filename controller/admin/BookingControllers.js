const path = require('path');
const fs = require('fs');

const errorFileDir = path.join(__dirname, '../../logs');

/**
 * show all
 * @param {*} req 
 * @param {*} res 
 */


const Booking = require("../../models/admin/Booking")

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

}

/**
 * Create new booking
 * 
 * 
 */

const createNewBooking = async (req, res) => {

}


/**
 *  Updated booking 
 * 
 */
const updatedBooking = async (req, res) => {

}

/**
 * Delete 
 */
const deleteBooking = async (req, res) => {

}


/**
 *  Booking Status
 * 
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