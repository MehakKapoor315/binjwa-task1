const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    policy_relevance: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    development_status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Zone', zoneSchema);
