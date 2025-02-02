



/**
 * Show All 
 * 
 */

const Hotel = require("../../models/admin/Hotel")

const getHotels = async (req, res) =>{

    try {
        const hotels = await Hotel.findAll();
        return res.status(200).json(hotels);
        
    } catch (error) {
        return res.status(500).json(error);
    }

}


/**
 * Show By Id
 * 
 */

const getHotelById = (req, res) =>{

}

/**
 * Hotel Create 
 * 
 */

const create = async (req, res) =>{

    try {
        const hotel = await Hotel.create(req.body);
        return res.status(201).json({message:"Create ", data: hotel});
        
    } catch (error) {
        return res.status(500).json(error);
    }

}


/**
 * Hotel Update
 * 
 */

const update = (req, res) =>{

}

/**
 *  Hotel Delete 
 * 
 */

const deleteHotel = (req, res) =>{

}

/**
 *  Hotel Status
 * 
 */

const status = (req, res)=>{

}


module.exports = {
    getHotels,
    getHotelById,
    create,
    update,
    deleteHotel,
    status
}