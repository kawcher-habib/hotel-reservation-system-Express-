
const { GetAllData, getDataByRoomId, CreateNewRoom } = require('../models/ReserveModel');


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

module.exports = {
    getAllReserveRooms,
    getReserVeRoomById,
    createNewRoom
}