const router = require('express').Router();
const tt = require("@tomtom-international/web-sdk-services/dist/services-node.min.js");
const { Station, User, UserStation } = require('../../models');

//Search TomTom for specific location by ID
const findStation = (id) => {
        return tt.services.placeById({
            entityId: id,
            key: 'uP52BPEpr8DQqzKvuzzBj9sRnRK8jtiT'
        })
};

//Create new db rows with TT data
const addStation = async (ttid1,userId1) => {
    try {
        const stationData = await Station.findOne({ where: { ttid: ttid1 } })

        const userData = await User.findByPk(userId1);

        if (!stationData) {
            findStation(ttid1)
            .then(async (res) => {
                const dbStationData = await Station.create({
                    ttid: res.results[0].id,
                    name: res.results[0].poi.name,
                    freeformAddress: res.results[0].address.freeformAddress,
                    lat: res.results[0].position.lat,
                    lon: res.results[0].position.lng
                })
                const dbUserStationData = await UserStation.create({
                    user_id: userId1,
                    station_id: dbStationData.id
                })
            })
        }
        else {
            findStation(ttid1)
            .then(async (res) => {
            const dbUserStationData = await UserStation.create({
                user_id: userId1,
                station_id: stationData.id
            })})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

//Structure above function into API call
router.post("/", async (req, res) => {
    try {
        results = await addStation(req.body.id,req.session.user_id);
        
        // res.status(200).json(userData.location_id);

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


router.delete('/delete', async (req, res) => {
    // delete station
    console.log('done')
    try {
        const stationData = await Station.destroy({ where: { id: req.body.id } })

        const userData = await UserStation.destroy({ where: { 
            user_id: req.session.user_id,
            station_id: req.body.id,
        } });
    } catch (err) {
      res.status(500).json(err);
    }

});

module.exports = router;