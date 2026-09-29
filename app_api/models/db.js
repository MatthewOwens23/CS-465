const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Connect to MongoDB
mongoose.connect(dbURI);

// Connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Close the Mongoose connection when the application terminates
process.on('SIGINT', () => {
    mongoose.connection.close();
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
});

module.exports = mongoose;