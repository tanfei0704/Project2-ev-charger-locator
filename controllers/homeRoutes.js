const router = require('express').Router();
const { User, Location, Station } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      res.render('home', { 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
router.get('/login', (req, res) => {
  try {
  res.render('login', {
    logged_in: req.session.logged_in
  });
  } catch (err) {
    res.status(500).json(err);
}});

router.get('/search', async (req, res) => {
    if(!req.session.logged_in) {
      res.redirect('/login');
    } else {
      try {
      const userData = await User.findByPk(req.session.user_id, {
        include: [
          {
            model: Location,
            attributes: [
              'freeformAddress',
              'lat',
              'lon',
            ],},
            {model: Station,
            as: 'user_by_station'
          },
        ],
      });
      const user = userData.get({ plain: true});
      res.render('search', {
        user,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;