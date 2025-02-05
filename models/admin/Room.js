const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");


const Room = sequelize.define('rooms', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hotelid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Hotels',
            key: 'hotel_id'
        }
    },
    type: {
        type: DataTypes.TEXT('tiny'),

    },
    price: {
        type: DataTypes.DECIMAL(10, 2),

    },
    capacity:{
        type: DataTypes.INTEGER,
    },
    available: {
        type: DataTypes.BOOLEAN,
    }
});

// (async () =>{
//     try {
//         await Room.sync({force: true}); ///Use `force: true` to drop the table if it already exists otherwise false
//         console.log('Hotel table created successfully.');
//     } catch (error) {
//         console.error('Error creating Hotel table:', error);
//     }
// })();

module.exports = Room;