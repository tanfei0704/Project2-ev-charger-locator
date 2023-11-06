const User = require('./User');
const Location = require('./Location');
const Station = require('./Station');
const UserStation = require('./UserStation');

User.belongsToMany(Station,{
    through: {
      model: UserStation,
      unique: false
  },
  as: "user_by_station"
});

Station.belongsToMany(User,{
    through: {
      model: UserStation,
      unique: false
  },
  as: "station_by_user"
});

Location.hasMany(User,{
  foreignKey: 'location_id',
  onDelete: 'CASCADE',
})

User.belongsTo(Location)



module.exports = { User, Location, Station, UserStation };


