const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        req.user = null;
        return next();
    }
    jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
        if (err) {
            req.user = null;
            return next();
        }
        req.user = user;
        next();
    });
};

module.exports = checkAuth;
