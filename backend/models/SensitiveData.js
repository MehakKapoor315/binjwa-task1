const mongoose = require('mongoose');

const sensitiveDataSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    allowedRoles: [{
        type: String,
        enum: ['Admin', 'Investor', 'Founder', 'Analyst']
    }]
}, { timestamps: true });

const SensitiveData = mongoose.model('SensitiveData', sensitiveDataSchema);
module.exports = SensitiveData;
