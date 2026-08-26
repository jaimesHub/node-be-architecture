'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const SHOP_ROLES = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step: check if email already exists
            const existingShop = await shopModel.findOne({ email }).lean(); // return a plain JavaScript object instead of a Mongoose document

            if (existingShop) {
                return {
                    code: 'xxxx',
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
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                });

                // save collection KeyStore with publicKey and shopId
                console.log('>>> [Private Key]::signUp:: ', privateKey);
                console.log('>>> [Public Key]::signUp:: ', publicKey);
            }
            // step: return result
            
        } catch (error) {
            return {
                code: 'xxx', // define by our documentation
                message: error.message,
                status: 'error',
            }
        }
    }
}

module.exports = AccessService;