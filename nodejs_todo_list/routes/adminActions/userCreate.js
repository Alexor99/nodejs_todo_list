const express = require('express');
const { postCreateUserHandler } = require('../../controllers/adminActions/userCreate');

const router = express.Router();

router.post('/', postCreateUserHandler);

module.exports = router;
