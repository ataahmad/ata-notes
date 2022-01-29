const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
require('dotenv').config();

const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');


// app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'this should be secure',
  resave: true,
  saveUninitialized: false
}));


const oidc = new ExpressOIDC({
  issuer: `https://${process.env.OKTADOMAIN}/oauth2/default`,
  client_id: `${process.env.CLIENTID}`,
  client_secret: `${process.env.CLIENTSECRET}`,
  appBaseUrl: 'http://localhost:3000',
  redirect_uri: 'http://localhost:3000/authorization-code/callback',
  scope: 'openid profile',
  appBaseUrl: 'http://localhost:3000'
});

app.use(oidc.router);

app.get('/', async (req, res) => {
  console.log("Home Page loaded!");
  // const notes = await Note.find().sort('-createdAt');
  // // res.render('index', { notes: notes });
  res.sendFile(path.join(__dirname, '/html', 'onload.html'));

});

app.all('*', oidc.ensureAuthenticated());


mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Has Started`);
});