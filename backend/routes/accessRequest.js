const express = require('express');
const router = express.Router();
const AccessRequest = require('../models/AccessRequest');
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');
const { successResponse, errorResponse } = require('../utils/response');
const { logActivity } = require('../utils/auditLogger');

// @desc Submit Access Request
// @route POST /api/v1/access-requests
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check for existing pending request
        const existingRequest = await AccessRequest.findOne({ email, status: 'pending' });
        if (existingRequest) {
            return errorResponse(res, 'You already have a pending access request.', 400, 'DUPLICATE_REQUEST');
        }

        const accessRequest = await AccessRequest.create(req.body);

        // Audit Log
        await logActivity(req, 'ACCESS_REQUEST_SUBMITTED', 'ONBOARDING', { 
            email: req.body.email, 
            org: req.body.organization 
        });

        return successResponse(res, accessRequest, 'Access request submitted successfully. Our team will review it.', 201);
    } catch (error) {
        return errorResponse(res, error.message, 500, 'SERVER_ERROR');
    }
});

// @desc List Access Requests (Admin Only)
// @route GET /api/v1/access-requests
router.get('/', protect, admin, async (req, res) => {
    try {
        const requests = await AccessRequest.find({ status: 'pending' }).sort('-createdAt');
        return successResponse(res, requests);
    } catch (error) {
        return errorResponse(res, error.message, 500, 'SERVER_ERROR');
    }
});

// @desc Approve Access Request
// @route POST /api/v1/access-requests/:id/approve
router.post('/:id/approve', protect, admin, async (req, res) => {
    try {
        const request = await AccessRequest.findById(req.params.id);
        if (!request) return errorResponse(res, 'Request not found', 404);

        const { role, tier } = req.body;

        // Update request
        request.status = 'approved';
        request.reviewed_by = req.user._id;
        request.reviewed_at = new Date();
        await request.save();

        // Check if user already exists
        let user = await User.findOne({ email: request.email });
        if (!user) {
            // Create New User
            user = await User.create({
                name: request.full_name,
                email: request.email,
                password: 'password123', // Default password
                role: role || 'Investor',
                tier: tier || 'preview',
                status: 'approved',
                phone: request.phone,
                designation: request.designation
            });
        }

        // Audit Log
        await logActivity(req, 'ACCESS_REQUEST_APPROVED', 'ADMIN', { 
            request_id: request._id,
            user_provisioned: user._id 
        });

        return successResponse(res, { request, user }, 'Request approved and user provisioned.');
    } catch (error) {
        return errorResponse(res, error.message, 500, 'SERVER_ERROR');
    }
});

// @desc Reject Access Request
// @route POST /api/v1/access-requests/:id/reject
router.post('/:id/reject', protect, admin, async (req, res) => {
    try {
        const request = await AccessRequest.findById(req.params.id);
        if (!request) return errorResponse(res, 'Request not found', 404);

        request.status = 'rejected';
        request.reviewed_by = req.user._id;
        request.reviewed_at = new Date();
        await request.save();

        // Audit Log
        await logActivity(req, 'ACCESS_REQUEST_REJECTED', 'ADMIN', { 
            request_id: request._id 
        });

        return successResponse(res, request, 'Request rejected.');
    } catch (error) {
        return errorResponse(res, error.message, 500, 'SERVER_ERROR');
    }
});

module.exports = router;
