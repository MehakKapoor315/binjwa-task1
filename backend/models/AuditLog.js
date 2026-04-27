const mongoose = require('mongoose');

const auditLogSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    module: { type: String, required: true },
    details: { type: Object },
    ip_address: { type: String },
    user_agent: { type: String },
    request_id: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
