const path = require('path');
const fs = require('fs');

const errorFileDir = path.join(__dirname, '../../logs');

/**
 * Show All 
 * 
 */

const Hotel = require("../../models/admin/Hotel")

const getHotels = async (req, res) => {

    try {
        const hotels = await Hotel.findAll();
        return res.status(200).json(hotels);

    } catch (error) {
        fs.writeFile()
        return res.status(500).json(error);
    }

}


/**
 * Show By Id
 * 
 */

const getHotelById = (req, res) => {
        try {
            
            
        } catch (error) {
            
        }
}

/**
 * Hotel Create 
 * 
 */

const create = async (req, res) => {
    const body = req.body;

    const { name, address, amenities } = body;

    if (!name) {
        return res.status(400).json({ status: "error", message: "Name is required" });
    } else if (!address) {
        return res.status(400).json({ status: "error", message: "Address is required" });
    } else if (!amenities) {
        return res.status(400).json({ status: "error", message: "Amenities is required" });
    } else {

        try {

            const hotel = await Hotel.create(req.body);
            return res.status(201).json({ message: "New Hotel Create ", data: hotel });

        } catch (error) {

            const errorFilePath = path.join(errorFileDir, 'createNewHotel.log');
            const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;

            fs.appendFile(errorFilePath, errorMessage, (err) => {
                if (err) {
                    console.error('Error writing to error log:', err);
                }
            });

            return res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });
        }
    }

}


/**
 * Hotel Update
 * 
 */

const update = (req, res) => {

}

/**
 *  Hotel Delete 
 * 
 */

const deleteHotel = (req, res) => {

}

/**
 *  Hotel Status
 * 
 */

const status = (req, res) => {

}


module.exports = {
    getHotels,
    getHotelById,
    create,
    update,
    deleteHotel,
    status
}