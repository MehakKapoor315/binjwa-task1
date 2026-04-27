const mongoose = require('mongoose');

const ndaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fullName: { type: String, required: true },
    agreed: { type: Boolean, required: true, default: false },
    version: { type: String, default: '1.0' },
    signedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const NDA = mongoose.model('NDA', ndaSchema);
module.exports = NDA;
