const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/blend', { useNewUrlParser: true,  useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', (req, res) => {
  res.render('landing'); 
});

app.get('/campgrounds', (req, res) => {
  //Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    }

    res.render('campgrounds', { campgrounds: allCampgrounds });
  });
});

app.post('/campgrounds', (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCampground = {
    name,
    image
  };

  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/campgrounds');
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
})


app.listen(3000, () => {
  console.log(`Blend server up and running!`);
});