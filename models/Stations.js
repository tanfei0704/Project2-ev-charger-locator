const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Station extends Model { }

Station. init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        distance: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        location_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'UserLocation',
                key: 'location_id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'User',
              key: 'id',
            },
        },
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Station'
    }    
);

module.exports = Station;