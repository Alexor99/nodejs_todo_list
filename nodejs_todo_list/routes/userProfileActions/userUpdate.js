const express = require('express');
const { putUpdateUserHandler } = require('../../controllers/userProfileActions/userUpdate');

const router = express.Router();

router.put('/:userId', putUpdateUserHandler);

module.exports = router;
