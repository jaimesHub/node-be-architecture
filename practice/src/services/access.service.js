'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { 
    BadRequestError, 
    ConflictRequestError, 
    InternalServerError,
    AuthFailureError,
} = require('../core/error.response');

const SHOP_ROLES = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
};

// service //
const { findByEmail } = require('./shop.service');

class AccessService {
    static logout = async (keyStore) => {
        return await KeyTokenService.removeKeyById(keyStore._id);
    }

    /**
     *  steps
     *   1. check email in DB
     *   2. match password
     *   3. create accessToken, refreshToken and save to DB
     *   4. generate tokens
     *   5. get data return login
     */
    static login = async ({ email, password, refreshToken = null }) => {
        // 1.
        const foundShop = await findByEmail({ email });
        if (!foundShop) {
            throw new BadRequestError('Shop not registered');
        }

        // 2.
        const match = await bcrypt.compare(password, foundShop.password);
        if (!match) {
            throw new AuthFailureError('Authentication failure');
        }

        // 3.
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        // 4.
        const { _id } = foundShop;
        const tokens = await createTokenPair(
            { userId: _id, email },
            publicKey,
            privateKey,
        );

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId: _id,
        });

        // 5.
        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
            tokens,
        }
    };

    static signUp = async ({ name, email, password }) => {
        if (!name || !email || !password) {
            throw new BadRequestError('name, email, and password are required');
        }

        // step: check if email already exists
        const existingShop = await shopModel.findOne({ email }).lean(); // return a plain JavaScript object instead of a Mongoose document
        if (existingShop) {
            throw new ConflictRequestError('Shop already exists with this email!');
        }

        // step: hash password
        const passwordHash = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // step: create new shop
        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: [SHOP_ROLES.SHOP],
        });

        if (newShop) {
            // using a simpler way to generate privateKey, publicKey
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');

            // save collection KeyStore (Keys Collection) with publicKey and shopId
            // save publicKey to database
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
            });

            if (!keyStore) {
                throw new InternalServerError('Failed to create key store');
            };

            // create tokens (accessToken, refreshToken) for shop - using privateKey to sign tokens
            const tokens = await createTokenPair(
                { userId: newShop._id, email },
                publicKey,
                privateKey,
            );

            if (!tokens) {
                throw new InternalServerError('Failed to create tokens');
            };

            // step: return result
            return {
                code: 201,
                status: 'created',
                metadata: {
                    shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                    tokens,
                },
                message: 'Sign up successfully!',
            }
        }

        return {
            code: 200, // define by our documentation
            status: 'error',
            message: 'Failed to create new shop',
            metadata: null,
        }
    }
}

module.exports = AccessService;