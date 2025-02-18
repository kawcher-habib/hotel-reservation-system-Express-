 const { DataTypes } = require('sequelize');
const {connection, sequelize} = require('../../db/database');
 
 

 const Payment  = sequelize.define('payments',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
     tran_id:{
        type: DataTypes.STRING,
        allowNull: true
     },
     val_id:{
        type: DataTypes.STRING,
        allowNull: true
     },
     user_id:{
        type: DataTypes.STRING,
        allowNull: true
     },
     total_amount:{
        type: DataTypes.DECIMAL,
        allowNull: true
     },
     currency:{
        type: DataTypes.STRING,
        allowNull: true
     },
     method:{
        type: DataTypes.STRING,
        allowNull: true
     },
     country:{
        type: DataTypes.STRING,
        allowNull: true
     },
     city:{
        type: DataTypes.STRING,
        allowNull: true
     },
     status:{
        type: DataTypes.STRING,
        allowNull: true
     }

 });

// (async () =>{
//     try {
//         await Payment.sync({force: true}); ///Use `force: true` to drop the table if it already exists otherwise false
//         console.log('Hotel table created successfully.');
//     } catch (error) {
//         console.error('Error creating Hotel table:', error);
//     }
// })();

module.exports = Payment;