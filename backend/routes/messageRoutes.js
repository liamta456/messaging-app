const express = require('express');
const router = express.Router();
const { saveMessage, getMessages } = require('../controllers/messageControllers');

router
    .post('/', saveMessage)
    .get('/', getMessages);

module.exports = router;