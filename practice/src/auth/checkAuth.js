'use strict'

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
}

const { findById } = require('../services/apiKey.service');

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden',
            });
        }

        const objKey = await findById(key);
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden',
            });
        }

        req.objKey = objKey;

        return next();
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

module.exports = {
    apiKey,
}