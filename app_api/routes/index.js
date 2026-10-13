
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');
const auth = require('../config/auth');

// GET all trips (public)
router
    .route('/trips')
    .get(tripsController.tripsList);

// GET a trip by code (public)
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

// POST a new trip (authentication required)
router
    .route('/trips')
    .post(auth, tripsController.tripsAddTrip);

// PUT: update a trip (authentication required)
router
    .route('/trips/:tripCode')
    .put(auth, tripsController.tripsUpdateTrip);

// DELETE a trip (authentication required)
router
    .route('/trips/:tripCode')
    .delete(auth, tripsController.tripsDeleteTrip);

// POST: register a user
router
    .route('/register')
    .post(authController.register);

// POST: log in a user
router
    .route('/login')
    .post(authController.login);

module.exports = router;
