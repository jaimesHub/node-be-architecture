'use strict'

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
            return res.status(201).json({
                code: '20001',
                metadata: { userId: 1 },
                message: 'Sign up successfully!',
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AccessController();