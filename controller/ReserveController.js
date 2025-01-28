
const { GetAllData, GetDataByRoomId, CreateNewRoom, UpdatedRoom, DeleteRoom } = require('../models/ReserveModel');
const { isItValid } = require('../util/validationchecker');


/**
 * Show All Data
 * 
 */
const getAllReserveRooms = async (req, res) => {


    try {

        const data = await GetAllData();
        return res.status(200).json(data);

    } catch (error) {

        console.error(error.message);
        res.status(500).json({ message: "An error occurred while fetching reservation data" })
    }
}


/*
*Show Data By Id
*  TODO: Validation
*/

const getReserVeRoomById = async (req, res) => {

    try {

        const id = req.params['id'];

        const isValidId = await isItValid('reservation', 'id', 'id', id);
        if (isValidId.isValid) {

            const data = await GetDataByRoomId(id)
            return res.status(200).json(data);

        } else {
            return res.status(400).json({ status: "error", message: "Invalid Id" });
        }

    } catch (error) {

        console.log(error.message);
        return res.status(500).json({ message: "An error occurred while fetching reservation data" })
    }

}


/**
 * Reserver New Room
 *  TODO: When reserved a room send notification in guest providing  phone number
 *      * Verification Phone number 
 */

const createNewRoom = async (req, res) => {

    const { guest_name, room_number, contact_number, } = req.body;

    if (!guest_name) {
        res.status(400).json({ message: "Guest Name Is Required" });
    } else if (!room_number) {
        res.status(400).json({ message: "Room Number Is Required" });
    } else if (!contact_number) {
        res.status(400).json({ message: "Contact Number Is Require" });
    } else {

        const isRoomNumBooked = await isItValid('reservation', 'room_number', 'room_number', room_number);

        if (!isRoomNumBooked.isValid) {

            try {
                const response = await CreateNewRoom(req.body);
                //console.log(response);
                return res.status(200).json(response);

            } catch (error) {
                return res.status(500).json(error);

            }
        } else {
            return res.status(400).json({ status: "error", message: `${room_number} Room Already Booked` })
        }
    }


}

/*
* Updated Reserve Data By Id 
* TODO: Send Notification in phone number
*
*/

const updatedExistRoomById = async (req, res) => {

    const id = req.params['id'];
    const body = req.body;

    const { guest_name, room_number, contact_number } = body;

    if (!guest_name) {
        res.status(400).json({ message: "Guest Name Is Required" });
    } else if (!room_number) {
        res.status(400).json({ message: "Room Number Is Required" });
    } else if (!contact_number) {
        res.status(400).json({ message: "Contact Number Is Require" });
    } else {

        const isValidReserveRoom = await isItValid('reservation', 'reser_id', 'reser_id', id);

        if (isValidReserveRoom.isValid) {

            try {
                const response = await UpdatedRoom(id, body)
                res.status(200).json(response)

            } catch (error) {
                res.status(500).json({ error });

            }

        } else {
            res.status(403).json({ status: "error", message: "Invalid id" })
        }
    }





}

/**
 * Delete Reserve Room
 * 
 */

const deleteExistRoom = async (req, res) => {

    const id = req.params['id'];

    const isValidReserveRoom = await isItValid('reservation', 'reser_id', 'reser_id', id);

    if (isValidReserveRoom.isValid) {
        try {
            const response = await DeleteRoom(id);
            res.status(200).json(response);

        } catch (error) {
            res.status(500).json({ error });
        }

    } else {
        res.status(403).json({ status: "error", message: "Invalid id" })
    }
}



module.exports = {
    getAllReserveRooms,
    getReserVeRoomById,
    createNewRoom,
    updatedExistRoomById,
    deleteExistRoom
}