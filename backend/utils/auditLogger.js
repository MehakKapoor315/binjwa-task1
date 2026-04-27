const AuditLog = require('../models/AuditLog');

const logActivity = async (req, action, module, details = {}) => {
    try {
        await AuditLog.create({
            user: req.user ? req.user._id : null,
            action,
            module,
            details,
            ip_address: req.ip,
            user_agent: req.headers['user-agent'],
            request_id: req.headers['x-request-id'] || 'req_' + Math.random().toString(36).substr(2, 9)
        });
    } catch (error) {
        console.error('Audit Log Error:', error);
    }
};

module.exports = { logActivity };
