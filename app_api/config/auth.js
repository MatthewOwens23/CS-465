
const { expressjwt: jwt } = require('express-jwt');

const getTokenFromHeader = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        return req.headers.authorization.substring(7);
    }

    return null;
};

const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth',
    getToken: getTokenFromHeader
});

module.exports = auth;
