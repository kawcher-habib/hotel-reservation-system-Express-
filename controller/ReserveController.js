
const {GetAllData} = require('../models/ReserveModel');


const getAllReserveRooms = async(req, res) =>{
     console.log("Hello! I am from reserve controller")
     try{
        const data = await GetAllData();
        res.status(200).json(data);
     }catch(error){
        console.error(error.message);
        res.status(500).json({message:"An error occurred while fetching reservation data"})
     }
}

const getReserVeRoomById = ()=>{
    res.status(200).json({message: "success"})
}
module.exports = {
    getAllReserveRooms,
    getReserVeRoomById
}