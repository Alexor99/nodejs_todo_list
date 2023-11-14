const express = require('express');
const { getrootHandler } = require('../controllers/root');

const router = express.Router();

router.get('/', getrootHandler);

module.exports = router;
