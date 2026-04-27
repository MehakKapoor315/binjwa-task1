const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/response');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            return errorResponse(res, 'Not authorized, token failed', 401, 'UNAUTHORIZED');
        }
    }

    if (!token) {
        return errorResponse(res, 'Not authorized, no token', 401, 'UNAUTHORIZED');
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        return errorResponse(res, 'Not authorized as an admin', 403, 'FORBIDDEN');
    }
};

module.exports = { protect, admin };
