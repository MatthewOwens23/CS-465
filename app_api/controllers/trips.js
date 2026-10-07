const Trip = require('../models/travlr');

// GET: List all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});

        if (!trips || trips.length === 0) {
            return res.status(404).json({
                message: 'No trips found'
            });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// GET: Find a trip by its code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode });

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// POST: Add a new trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q) {
        return res.status(400).json(err);
    } else {
        return res.status(201).json(q);
    }
};

// PUT: Update an existing trip
const tripsUpdateTrip = async (req, res) => {
    console.log(req.params);
    console.log(req.body);

    const q = await Trip
        .findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

    if (!q) {
        return res.status(400).json(err);
    } else {
        return res.status(201).json(q);
    }
};

// DELETE: Delete an existing trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const q = await Trip.findOneAndDelete({
            code: req.params.tripCode
        });

        if (!q) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json({
            message: 'Trip deleted successfully',
            trip: q
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};