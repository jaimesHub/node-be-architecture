'use strict'

const JWT = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const KeyTokenService = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // create access token using publicKey key
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days',
        });

        // create refresh token using private key
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days',
        });

        // verify token using public key
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error('>>> [Error]::verify::accessToken:: ', err);
            } else {
                console.log('>>> [Success]::verify::accessToken!');
            }
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('>>> [Error]::createTokenPair:: ', error);
        return null;
    };
};

const authentication = asyncHandler(async (req, res, next) => {
    /**
     * 1. check userId missing?
     * 2. Get accessToken
     * 3. verifyToken
     * 4. check user in db
     * 5. check keyStore with this userId
     * 6. if all ok, return next()
     */

    // 1.
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError('Invalid Request');

    // 2. + 4.
    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) throw new NotFoundError('Not Found KeyStore');

    // 3.
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new AuthFailureError('Invalid Request');

    // 5. + 6.
    try {
        const decodeUser = await JWT.verify(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid User');
        req.keyStore = keyStore;
        // req.user = decodeUser;
        return next();
    } catch (error) {
        // throw new AuthFailureError('Invalid Token');
        throw error;
    }

});

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret);
}

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
};