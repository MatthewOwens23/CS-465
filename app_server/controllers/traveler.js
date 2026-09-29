const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const travel = async (req, res) => {
    try {
        const response = await fetch(tripsEndpoint, options);
        const json = await response.json();

        if (!Array.isArray(json) || json.length === 0) {
            return res.status(404).send('No trips found');
        }

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: json
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    travel
};