
const passport = require('passport');
const User = require('../models/user');

// Register a new user
const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'All fields are required.'
        });
    }

    try {
        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'An account with this email already exists.'
            });
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        user.setPassword(req.body.password);
        await user.save();

        return res.status(201).json({
            token: user.generateJWT()
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Unable to register user.'
        });
    }
};

// Log in an existing user
const login = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        return res.status(200).json({
            token: user.generateJWT()
        });
    })(req, res, next);
};

module.exports = {
    register,
    login
};
