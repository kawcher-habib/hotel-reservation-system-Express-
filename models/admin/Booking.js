const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/database');


const Booking = sequelize.define('bookings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    booking_id: {
        type: DataTypes.STRING,
        allowNull: false
    },

    hotel_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    room_num: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    check_in: {
        type: DataTypes.DATE
    },
    check_out: {
        type: DataTypes.DATE
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
})



// (async () =>{
//     try {
//         await Hotel.sync({force: true}); ///Use `force: true` to drop the table if it already exists otherwise false
//         console.log('Hotel table created successfully.');
//     } catch (error) {
//         console.error('Error creating Hotel table:', error);
//     }
// })();


module.exports = Booking