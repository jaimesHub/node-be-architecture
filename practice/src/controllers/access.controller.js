'use strict'

const AccessService = require('../services/access.service');
const { OkResponse, CreatedResponse } = require('../core/success.response');
class AccessController {
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