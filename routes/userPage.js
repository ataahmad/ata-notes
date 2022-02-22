const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const path = require('path');

router.get('/users', async (req, res) => {
    res.sendFile(path.join(__dirname, '../html', 'userPage.html'));
})