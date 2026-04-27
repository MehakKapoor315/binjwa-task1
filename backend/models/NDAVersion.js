const mongoose = require('mongoose');

const ndaVersionSchema = mongoose.Schema({
    version: { type: String, required: true },
    file_url: { type: String },
    summary_text: [{ type: String }],
    effective_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('NDAVersion', ndaVersionSchema);
