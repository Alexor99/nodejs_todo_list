const express = require('express');
const {
    getLoginHandler,
    postLoginHandler,
} = require('../controllers/userLogin');

const router = express.Router();

router.get('/auth', getLoginHandler);
router.post('/auth', postLoginHandler);

module.exports = router;
