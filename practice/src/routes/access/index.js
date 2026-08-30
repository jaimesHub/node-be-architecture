'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

// signUp
router.post('/shop/signup', asyncHandler(accessController.signUp));
// login
router.post('/shop/login', asyncHandler(accessController.login));

// authentication middleware
router.use(authentication);

module.exports = router;