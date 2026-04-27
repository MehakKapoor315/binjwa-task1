const NDAVersion = require('../models/NDAVersion');
const NDARecord = require('../models/NDARecord');
const { errorResponse } = require('../utils/response');

const checkNDA = async (req, res, next) => {
    try {
        // Get latest active NDA version
        const latestVersion = await NDAVersion.findOne({ is_active: true }).sort('-effective_date');
        
        if (!latestVersion) {
            return next(); // No NDA versioned yet, proceed
        }

        const signedNDA = await NDARecord.findOne({ 
            user: req.user._id, 
            nda_version: latestVersion._id,
            status: 'accepted'
        });

        if (!signedNDA) {
            return errorResponse(res, 'NDA Signature Required for latest version.', 403, 'NDA_REQUIRED', {
                nda_required: true,
                latest_version: latestVersion.version
            });
        }

        next();
    } catch (error) {
        return errorResponse(res, 'Server error checking NDA status', 500, 'SERVER_ERROR');
    }
};

module.exports = checkNDA;
