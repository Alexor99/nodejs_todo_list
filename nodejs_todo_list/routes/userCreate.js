const express = require('express');
const { postCreateHandler } = require('../controllers/userCreate');

const router = express.Router();

router.post('/', postCreateHandler);

module.exports = router;
