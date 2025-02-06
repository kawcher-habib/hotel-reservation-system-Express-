const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");


const Room = sequelize.define('rooms', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    room_num:{
        type: DataTypes.STRING,
        allowNull: false
    },
    hotelid: {
        type: DataTypes.STRING,
        allowNull: false,
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
//         console.log('room table created successfully.');
//     } catch (error) {
//         console.error('Error creating Hotel table:', error);
//     }
// })();

module.exports = Room;