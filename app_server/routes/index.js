const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlTraveler = require('../controllers/traveler');

// GET home page
router.get('/', ctrlMain.index);

// GET travel page
router.get('/travel', ctrlTraveler.travel);

module.exports = router;