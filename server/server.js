const express = require('express');
const {Pantry} = require('./models/pantry.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash')
const path = require('path');
const hbs = require('hbs')
const methodOverride = require('method-override')

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

const database = process.env.MONGODB_URI || 'mongodb://localhost:27017/pantry_connection';
mongoose.connect(database)
  .then(() => {
    console.log("connected to database");
  }).catch(() => {
    console.log('unable to connect to database');
  })

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../app/views"));
hbs.registerPartials(path.join(__dirname, "../app/views/partials"))
app.use(express.static(path.join(__dirname, "../public")))

app.get('/', (req, res) => {
  pantry.find()
  .then(pantry => {
    res.render("pantry/index", {pantry:pantry});
  })
  .catch(e => {
    res.status(404).send();
  })
})

app.get('/new', (req, res) => {
  res.render('pantry/new')
})
app.post('/pantry', (req, res) => {
  const pantry = new Pantry({
    name: req.body.name,
    address: req.body.address,
    img: req.body.img,
    phone: req.body.phone,
    website: req.body.website,
    wishlist: req.body.wishlist,
    starthr: req.body.starthr,
    endhr: req.body.endhr,
    fbname: req.body.fbname,
    fblink: req.body.fblink
  })
  pantry.save()
  .then(pantry => {
    res.redirect('/new')
  }).catch(e => {
    console.log(e);
    res.status(400).send();
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
