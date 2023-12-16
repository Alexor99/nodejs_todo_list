const express = require('express');
const {
    getLoginUserHandler,
    postLoginUserHandler,
} = require('../../controllers/userProfileActions/userLogin');

const router = express.Router();

router.get('/auth', getLoginUserHandler);
router.post('/auth', postLoginUserHandler);

module.exports = router;
