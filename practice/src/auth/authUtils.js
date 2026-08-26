'use strict'

const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // create access token using private key
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days',
        });

        // create refresh token using private key
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days',
        });

        // verify token using public key
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error('>>> [Error]::verify::accessToken:: ', err);
            } else {
                console.log('>>> [Success]::verify::accessToken:: ', decode);
            }
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('>>> [Error]::createTokenPair:: ', error);
        return null;
    };
};

module.exports = {
  createTokenPair,
};