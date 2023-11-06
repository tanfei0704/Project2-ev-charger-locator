const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserStation extends Model { }

UserStation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
              }
        },
        station_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'station',
                key: 'id',
              }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'userStation'
    }

) 



module.exports = UserStation;