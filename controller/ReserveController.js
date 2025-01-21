
const { GetAllData, getDataByRoomId, CreateNewRoom, updatedRoom, deleteRoom, isItValid } = require('../models/ReserveModel');


const getAllReserveRooms = async (req, res) => {
    console.log("Hello! I am from reserve controller")
    try {

        const data = await GetAllData();
        res.status(200).json(data);

    } catch (error) {

        console.error(error.message);
        res.status(500).json({ message: "An error occurred while fetching reservation data" })
    }
}

const getReserVeRoomById = async (req, res) => {

    try {

        const id = req.params['id'];
        const data = await getDataByRoomId(id)
        res.status(200).json(data);

    } catch (error) {

        console.log(error.message);
        res.status(500).json({ message: "An error occurred while fetching reservation data" })
    }

}


// Create New Room

const createNewRoom = async (req, res) => {

    const { guest_name, room_number, contact_number, } = req.body;

    if (!guest_name) {
        res.status(400).json({ message: "Guest Name Is Required" });
    } else if (!room_number) {
        res.status(400).json({ message: "Room Number Is Required" });
    } else if (!contact_number) {
        res.status(400).json({ message: "Contact Number Is Require" });
    } else {

        try {
            const response = await CreateNewRoom(req.body);
            //console.log(response);
            res.status(200).json(response);

        } catch (error) {
            res.status(500).json(error);

        }
    }


}

//Updated Room 

const updatedExistRoomById = async (req, res) => {

    const id = req.params['id'];
    const body = req.body;

    const columnName = 'reser_id';

    const isValid = await isItValid(columnName, id);

    if (isValid) {
        const { guest_name, room_number, contact_number } = body;

        if (!guest_name) {
            res.status(400).json({ message: "Guest Name Is Required" });
        } else if (!room_number) {
            res.status(400).json({ message: "Room Number Is Required" });
        } else if (!contact_number) {
            res.status(400).json({ message: "Contact Number Is Require" });
        } else {


            try {
                const response = await updatedRoom(id, body)
                res.status(200).json(response)

            } catch (error) {
                res.status(500).json({ error });

            }

        }
    } else {
        res.status(403).json({ status: "error", message: "Invalid id" })
    }





}

//Delete Room

const deleteExistRoom = async (req, res) => {

    const id = req.params['id'];
    const columnName = 'reser_id';

    const isValid = await isItValid(columnName, id);

    if (isValid) {
        try {
            const response = await deleteRoom(id);
            res.status(200).json(response);

        } catch (error) {
            res.status(500).json({ error });
        }

    } else {
        res.status(403).json({ status: "error", message: "Invalid id" })
    }
}

//Helper function 

function validationChecker(prefix, id) {
    isItValid(prefix, id);
    // return response;
}

module.exports = {
    getAllReserveRooms,
    getReserVeRoomById,
    createNewRoom,
    updatedExistRoomById,
    deleteExistRoom
}