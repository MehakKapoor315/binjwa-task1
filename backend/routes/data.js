const express = require('express');
const router = express.Router();
const SensitiveData = require('../models/SensitiveData');
const { protect } = require('../middleware/authMiddleware');
const checkNDA = require('../middleware/ndaMiddleware');
const { successResponse, errorResponse } = require('../utils/response');

// @desc Get sensitive data based on role/tier
// @route GET /api/v1/intelligence
router.get('/', protect, checkNDA, async (req, res) => {
    try {
        let query = {};
        
        // Admin sees all
        if (req.user.role !== 'Admin') {
            // Filter by role
            query.allowedRoles = req.user.role;
        }

        // Founders see their own or allowed role
        if (req.user.role === 'Founder') {
            query = {
                $or: [
                    { allowedRoles: 'Founder' },
                    { owner: req.user._id }
                ]
            };
        }

        const data = await SensitiveData.find(query);
        console.log(`🔓 Intelligence accessed by: ${req.user.name} (${req.user.role})`);
        
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(res, error.message, 500, 'SERVER_ERROR');
    }
});

module.exports = router;
