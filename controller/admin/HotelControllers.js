const path = require('path');
const fs = require('fs');
const Hotel = require("../../models/admin/Hotel")

const errorFileDir = path.join(__dirname, '../../logs');

/**
 * Show All 
 * 
 */

const getHotels = async (req, res) => {

    try {
        const hotels = await Hotel.findAll();
        return res.status(200).json(hotels);

    } catch (error) {
        const errorFilePath = path.join(errorFileDir, 'getHotels.log');
        const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;

        fs.appendFile(errorFilePath, errorMessage, (err) => {
            if (err) {
                console.error('Error writing to error log:', err);
            }
        });

        return res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });
    }

}


/**
 * Show By Id
 * 
 */

const getHotelById = async (req, res) => {

    const hotelId = req.params['hotel_id'];

    if (!hotelId) {
        return res.status(401).json({ status: "error", message: "Id Required" });
    }

    try {
        const data = await Hotel.findAll({
            where: {
                hotel_Id: hotelId
            }
        });

        if (data != "") { return res.status(200).json(data) } else { return res.status(200).json({ message: "Data Not Found" }) };


    } catch (error) {
        const errorFilePath = path.join(errorFileDir, 'HotelById.log');
        const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;

        fs.appendFile(errorFilePath, errorMessage, (err) => {
            if (err) {
                console.error('Error writing to error log:', error.message);
            }
        });

        return res.status(500).json({ status: "error", message: "Internal Server Error" });

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
    }
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


/**
 * Hotel Update
 * 
 */

const update = async (req, res) => {

    const body = req.body;

    const { hotel_id, name, address, amenities } = body;


    if (!hotel_id) {
        return res.status(400).json({ status: "error", message: "Hotel Id is required" });
    } else if (!name) {
        return res.status(400).json({ status: "error", message: "Name is required" });
    } else if (!address) {
        return res.status(400).json({ status: "error", message: "Address is required" });
    } else if (!amenities) {
        return res.status(400).json({ status: "error", message: "Amenities is required" });
    }

    try {
        const response = await Hotel.update(
            { address: address, amenities: amenities },
            {
                where: {
                    hotel_id: hotel_id
                }

            }
        )

        if (response == 1) {
            return res.status(201).json({ message: `${hotel_id} Updated Successfully` });
        } else {
            return res.status(401).json({ message: `${hotel_id} Invalid Id` });
        }

    } catch (error) {

        const errorFilePath = path.join(errorFileDir, 'hotelUpdate.log');
        const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;

        fs.appendFile(errorFilePath, errorMessage, (err) => {
            if (err) {
                console.error('Error writing to error log:', error.message);
            }
        });

        return res.status(500).json({ status: "error", message: "Internal Server Error", });
    }


}

/**
 *  Hotel Delete 
 * 
 */

const deleteHotel = async (req, res) => {
    const hotel_id = req.params['hotel_id'];

    if (!hotel_id) {
        res.status(400).json({ status: "error", message: "Hotel Id is required" });
    }

    try {

        const response = await Hotel.destroy({
            where: {
                hotel_id: hotel_id
            }
        })

        if (response == 1) {
            return res.status(201).json({ message: `${hotel_id} Delete Successfully` });
        } else {
            return res.status(401).json({ message: `${hotel_id} Invalid Id` });
        }

    } catch (error) {

        const errorFilePath = path.join(errorFileDir, 'hotelDelete.log');
        const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;

        fs.appendFile(errorFilePath, errorMessage, (err) => {
            if (err) {
                console.error('Error writing to error log:', error.message);
            }
        });

        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
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