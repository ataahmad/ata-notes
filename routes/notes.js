const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const path = require('path');

router.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, '../html', 'new.html'));

});

router.get('/home', async (req, res) => {
  console.log("Home Page loaded!");
  const notes = await Note.find().sort('-createdAt');
  res.sendFile(path.join(__dirname, '../html', 'home.html'));

});

router.post('/home', async (req, res) => {
    let note = await new Note({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        note = await note.save();
        res.redirect('/home');
    } catch (e) {
        console.log(e);
        res.render('new');
    }
});

router.delete('/:_id', async (req, res) => {
    try {
      res.redirect('/');
    } catch (e) {
      console.log(e);
      res.redirect('/');
    }
  });

module.exports = router;