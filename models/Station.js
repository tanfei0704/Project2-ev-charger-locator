const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Station extends Model { }

Station.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ttid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        freeformAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        lon: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'station'
    }
);



module.exports = Station;