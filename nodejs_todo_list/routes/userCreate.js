const express = require('express');
const { postCreateHandler } = require('../controllers/userProfileActions/userCreate');

const router = express.Router();

router.post('/', postCreateHandler);

module.exports = router;
