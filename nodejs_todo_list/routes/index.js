const express = require('express');
const userLogin = require('./userLogin');
const userCreate = require('./userCreate');
const rootHandler = require('./root');
const users = require('./users');
const { initializeDB } = require('../model/initializeDB');

initializeDB();
const router = express.Router();

router.use('/', rootHandler);
router.use('/user/login', userLogin);
router.use('/user/create', userCreate);
router.use('/users', users);

module.exports = router;
