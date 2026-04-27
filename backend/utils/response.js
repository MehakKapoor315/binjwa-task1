/**
 * Standard API Response Utility
 */

const successResponse = (res, data = {}, message = 'Request successful', code = 200, meta = {}) => {
    return res.status(code).json({
        status: 'success',
        code,
        message,
        data,
        meta: {
            timestamp: new Date().toISOString(),
            version: 'v1',
            ...meta
        }
    });
};

const errorResponse = (res, message = 'Request failed', code = 400, errorCode = 'ERROR', details = {}, meta = {}) => {
    return res.status(code).json({
        status: 'error',
        code,
        error_code: errorCode,
        message,
        details,
        meta: {
            timestamp: new Date().toISOString(),
            ...meta
        }
    });
};

module.exports = { successResponse, errorResponse };
