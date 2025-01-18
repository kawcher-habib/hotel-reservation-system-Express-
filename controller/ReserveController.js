
const { GetAllData, getDataByRoomId } = require('../models/ReserveModel');


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
module.exports = {
    getAllReserveRooms,
    getReserVeRoomById
}