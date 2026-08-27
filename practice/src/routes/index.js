'use strict'

const express = require('express');
const router = express.Router();

const { apiKey, permission } = require('../auth/checkAuth');

// check apiKey
router.use(apiKey);

// check permissions
router.use(permission('0000'));

router.get('', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome to BE NodeJS Architecture Project!',
  })
});

router.use('/v1/api', require('./access'));

module.exports = router;