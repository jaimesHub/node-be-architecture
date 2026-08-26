'use strict'

const AccessService = require('../services/access.service');
class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log('>>> [Params]::signUp:: ', req.body);
            /**
             * 200 OK
             * 201 CREATED
             * 400 BAD REQUEST
             * 401 UNAUTHORIZED
             * 403 FORBIDDEN
             * 404 NOT FOUND
             * 500 INTERNAL SERVER ERROR
             * 502 BAD GATEWAY
             * 503 SERVICE UNAVAILABLE
             * 504 GATEWAY TIMEOUT
             */
            const result = await AccessService.signUp(req.body);
            return res.status(result.code).json({
                code: result.code,
                metadata: result.metadata,
                message: result.message,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AccessController();