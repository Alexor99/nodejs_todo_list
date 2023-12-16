const express = require('express');
const userLogin = require('./userProfileActions/userLogin');
const userCreate = require('./adminActions/userCreate');
const userUpdate = require('./userProfileActions/userUpdate');
const rootHandler = require('./root');
const users = require('./users');
const { initializeUsers } = require('../model/initializeUsersDB');
const { initializeUsersToken } = require('../model/initializeUsersTokenDB');

// initialize DB tables if not exists
initializeUsers();
initializeUsersToken();

const router = express.Router();

router.use('/', rootHandler);
router.use('/user/login', userLogin);
router.use('/user/create', userCreate);
router.use('/user/update', userUpdate);
router.use('/users', users);

module.exports = router;
