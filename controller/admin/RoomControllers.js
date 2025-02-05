const path = require('path');
const fs = require('fs');
const errorFileDir = path.join(__dirname, '../../logs/rooms');
const Room = require("../../models/admin/Room");

/**
 * Show All
 * 
 */

const getRooms = async (req, res) => {
    try {
        const data = await Room.findAll();
        if (data == '') return res.status(200).json({ message: "Data Not Found" });
        return res.status(201).json(data);
    } catch (error) {

        const errorFilePath = path.join(errorFileDir, 'rooms.log');
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
 *  Show Room By Id
 * 
 */

const getRoomById = async (req, res) => {
    const roomNum = req.params['room_num'];
    if (!roomNum) return res.status(401).json({ status: "error", message: "room number required" });

    try {
        const response = await Room.findAll({
            where: {
                room_num: roomNum
            }
        })
        if (response != "") { return res.status(200).json(data) } else { return res.status(200).json({ message: "Data Not Found" }) };


    } catch (error) {
        const errorFilePath = path.join(errorFileDir, 'roomById.log');
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
 * Create Room
 * 
 */

const createRoom = async (req, res) => {
    const body = req.body;

    const { type, price, capacity, available } = body;

    if (!type) {
        return res.status(400).json({ status: "error", message: "type is required" });
    } else if (!price) {
        return res.status(400).json({ status: "error", message: "price is required" });
    } else if (!capacity) {
        return res.status(400).json({ status: "error", message: "capacity is required" });
    } else if (!available) {
        return res.status(400).json({ status: "error", message: "available is required" });
    }
    try {

        const room = await Room.create(req.body);
        return res.status(201).json({ message: "New Room Create ", data: room });

    } catch (error) {

        const errorFilePath = path.join(errorFileDir, 'createNewRoom.log');
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
 * Updated Room
 */

const updateRoom = async (req, res) => {

   const { room_num, type, price, capacity, available } = body;

    if (!type) {
        return res.status(400).json({ status: "error", message: "type is required" });
    } else if (!price) {
        return res.status(400).json({ status: "error", message: "price is required" });
    } else if (!capacity) {
        return res.status(400).json({ status: "error", message: "capacity is required" });
    } else if (!available) {
        return res.status(400).json({ status: "error", message: "available is required" });
    }

    try {
        const response = await Room.update(
            { type: type, price: price, capacity: capacity, available: available},
            {
                where: {
                    room_num: room_num
                }

            }
        )

        if (response == 1) {
            return res.status(201).json({ message: `${room_num} Updated Successfully` });
        } else {
            return res.status(401).json({ message: `${room_num} Invalid Id` });
        }

    } catch (error) {

        const errorFilePath = path.join(errorFileDir, 'roomUpdate.log');
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
 * Delete Room
 * 
 */
const deleteRoom = async (req, res) => {
    const room_num = req.params['room_num'];

    if (!room_num) {
        res.status(400).json({ status: "error", message: "Room Number is required" });
    }

    try {

        const response = await Room.destroy({
            where: {
                room_num: room_num
            }
        })

        if (response == 1) {
            return res.status(201).json({ message: `${room_num} Delete Successfully` });
        } else {
            return res.status(401).json({ message: `${room_num} Invalid Id` });
        }

    } catch (error) {

        const errorFilePath = path.join(errorFileDir, 'roomDelete.log');
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
 * Room Status
 * 
 */
const roomStatus = async (req, res) => {

}



module.exports = {
    getRooms,
    getRoomById,
    createRoom
}