'use strict'

const AccessService = require('../services/access.service');
const { OkResponse, CreatedResponse, SuccessResponse } = require('../core/success.response');
class AccessController {
    handleRefreshToken = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get new token successfully!',
            metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
        }).send(res);
    }

    logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout successfully!',
            metadata: await AccessService.logout(req.keyStore),
        }).send(res);
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body),
        }).send(res);
    }

    signUp = async (req, res, next) => {
        // TEMP COMMENT: for testing error handling
        // try {
        //     const result = await AccessService.signUp(req.body);
        //     return res.status(result.code).json({
        //         code: result.code,
        //         metadata: result.metadata,
        //         message: result.message,
        //     });
        // } catch (error) {
        //     next(error);
        // }

        // const result = await AccessService.signUp(req.body);
        // return res.status(result.code).json(result);

        new CreatedResponse({
            message: 'Register Shop Successfully!',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10,
            }
        }).send(res);

    }
}

module.exports = new AccessController();