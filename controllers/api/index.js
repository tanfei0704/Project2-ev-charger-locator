const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require("./searchRoutes");
const saveRoutes = require("./saveRoutes");

router.use('/users', userRoutes);
router.use('/search', searchRoutes);
router.use('/save', saveRoutes);

module.exports = router;
