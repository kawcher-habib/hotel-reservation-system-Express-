
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/database');

const Hotel = sequelize.define('hotels',{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hotel_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    amenities: {
        type: DataTypes.TEXT('tiny'),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at:{
        type: DataTypes.DATE
    }



});

// (async () =>{
//     try {
//         await Hotel.sync({force: true}); ///Use `force: true` to drop the table if it already exists otherwise false
//         console.log('Hotel table created successfully.');
//     } catch (error) {
//         console.error('Error creating Hotel table:', error);
//     }
// })();

module.exports = Hotel;