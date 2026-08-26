'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');

const SHOP_ROLES = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            if (!name || !email || !password) {
                return { code: 400, status: 'error', message: 'name, email, and password are required' };
            }

            // step: check if email already exists
            const existingShop = await shopModel.findOne({ email }).lean(); // return a plain JavaScript object instead of a Mongoose document

            if (existingShop) {
                return {
                    code: 409,
                    message: 'Shop already exists with this email!',
                    status: 'error',
                }
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
                // create privateKey - sending to user after creating for signing tokens, DO NOT store privateKey in database/system
                // create publicKey - saving in database/system for verifying tokens, DO NOT send publicKey to user
                // why? - hacker can not generate valid tokens without privateKey, and hacker can not verify tokens without publicKey
                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem',
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem',
                //     },
                // });

                // using a simpler way to generate privateKey, publicKey
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');

                // save collection KeyStore (Keys Collection) with publicKey and shopId
                console.log('>>> [Private Key]::signUp:: ', privateKey);
                console.log('>>> [Public Key]::signUp:: ', publicKey);
                
                // save publicKey to database
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey,
                });

                if (!keyStore) {
                    return {
                        code: 500,
                        status: 'error',
                        message: 'Failed to create key store',
                    }
                };

                console.log('>>> [Key Store]::signUp:: ', keyStore);

                // create tokens (accessToken, refreshToken) for shop - using privateKey to sign tokens
                const tokens = await createTokenPair(
                    { userId: newShop._id, email },
                    publicKey,
                    privateKey,
                );

                if (!tokens) {
                    return {
                        code: 500,
                        status: 'error',
                        message: 'Failed to create tokens',
                    }
                };

                console.log('>>> [Tokens]::signUp:: ', tokens);

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
            
        } catch (error) {
            console.error('>>> [Error]::signUp:: ', error);
            return {
                code: 500, // define by our documentation
                message: error.message,
                status: 'error',
            }
        }
    }
}

module.exports = AccessService;