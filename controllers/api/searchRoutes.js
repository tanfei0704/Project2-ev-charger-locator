const router = require('express').Router();
const tt = require("@tomtom-international/web-sdk-services/dist/services-node.min.js");
const { Location, User } = require('../../models');

//Search TomTom for location
const addressSearch = (search) => {
    return tt.services.fuzzySearch({
        key: 'uP52BPEpr8DQqzKvuzzBj9sRnRK8jtiT',
        query: search,
        countrySet: 'US'
    })}

//Search TT for location then add to database
const newLocation = (req,userID) => {
    addressSearch(req)
        .then( async (res) => {
            const dbLocationData = await Location.create({
                freeformAddress: res.results[0].address.freeformAddress,
                lat: res.results[0].position.lat,
                lon: res.results[0].position.lng
                });
            const dbUserData = await User.findOne({ where: { id: userID } });
            dbUserData.location_id = dbLocationData.id;
            await dbUserData.save();
            return 'done'
        });
}

// Structure above functions into API call
router.post("/", async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);
        let locationData = await Location.findByPk(userData.location_id); 

        const userID = req.session.user_id

        newLocation(req.body.search, userID);
        res.status(200).json(userData.location_id);

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


//Search TomTom for nearby charging stations
const stationSearch = (lat1,lon1) => {
    return tt.services.nearbySearch({
        key: 'uP52BPEpr8DQqzKvuzzBj9sRnRK8jtiT',
        center: [lon1,lat1],
        radius: '50000',
        categorySet: '7309'
    })}

//Format TT search into GET request
router.get("/results", async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);
        let locationData = await Location.findByPk(userData.location_id);

        if (!locationData) {} else {
        let lat1 = locationData.lat
        let lon1 = locationData.lon

        const results = await stationSearch(lat1,lon1);
        res.status(200).json(results);

      }} catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


 
module.exports = router;