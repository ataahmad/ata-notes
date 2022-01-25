// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config()
// const app = express();

// app.get('/', (req, res) => {
//     console.log("request hit!");
//     res.send("We are on the front page of the app!");
// })


// app.set('view engine', 'ejs');

// app.use(express.urlencoded({ extended: false }));

// mongoose.connect(process.env.SERVER, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// app.listen(process.env.PORT || 3000, () => {
//     console.log("server is started!");
// })


const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index', { notes: notes });
});

mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Has Started`);
});