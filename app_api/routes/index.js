const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// GET all trips
router
    .route('/trips')
    .get(tripsController.tripsList);

// GET a trip by its code
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

// POST a new trip
router
    .route('/trips')
    .post(tripsController.tripsAddTrip);

// PUT: Update a trip
router
    .route('/trips/:tripCode')
    .put(tripsController.tripsUpdateTrip);

// DELETE: Delete a trip
router
    .route('/trips/:tripCode')
    .delete(tripsController.tripsDeleteTrip);

module.exports = router;