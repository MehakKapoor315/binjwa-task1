const mongoose = require('mongoose');

const sectorSchema = mongoose.Schema({
    zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
    name: { type: String, required: true },
    risk_level: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Sector', sectorSchema);
