const path = require('path');
//does NOT work
//import express from 'express';
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//this extracts the port heroku sets and sets it to 3000 locally
const port = process.env.PORT || 3000;

// define paths for express config
//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));
// handle bars defaults to looking for templeates in veiws directory in ROOT of project
// reset it with the new location and name
// this gets the name app.set ('views' viewsPath); below changes it
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handle bars and views(templates) location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// sets up static directory to serve
app.use(express.static(publicDirectoryPath));

//'' is default route
app.get('', (req, res) => {
  //name of view to render
  res.render('index', {
    title: 'Weather',
    name: 'Studio Gee!'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Studio Gee!'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help Message',
    title: 'Help',
    name: 'Studio Gee!'
  });
});

// app.get('/help', (req, res) => {
//   res.send('Help Express!');
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>about!</h1>');
// });

//localhost:3000/weather?address=Detroit
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  // {} with latitude is destructuring
  // = {} is default parameter of a empty object if none is provided
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      //if some when wrong with geocode
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, { forecast }) => {
        //if some when wrong with forecast
        if (error) {
          return res.send({ error });
        }

        return res.send({
          forecast: forecast,
          location: location,
          address: req.query.address
        });
      });
    }
  );
  // res.send({
  //   forecast: 'rain',
  //   location: 'Hazel Park',
  //   address: req.query.address
  // });
});

//http://localhost:3000/products?search=game&rating=5
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help topic not found',
    name: 'Studio Gee!',
    message: 'No information on that link'
  });
});

// this app.get must be last
// * matches any path not defined
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page not found',
    name: 'Studio Gee!',
    message: 'Page not found'
  });
});

//port 3000 is for dev env, 80 is default for http
//this process runs until stopped
//callback is optional
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// nodemon app.js
// nodemon src/app.js
// -e flags check is any files with listed extensions changed
// nodemon src/app.js -e js,hbs
