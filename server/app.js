const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const db = require('./database/db');
const cors = require('cors');
const moment = require('moment');
const morgan = require('morgan');
const _ = require('lodash')
require('newrelic');

const app = express();
app.use(morgan('tiny'))
app.use(cors());

// Handling errors to be communicated to client
const errors = {}

// CORS Middleware
app.use(cors())

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// Serving Static Files
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/:id', express.static(path.join(__dirname, '../client/public')));
app.use('/loaderio-927e368995a5ba705678096770accb6c.txt', express.static(path.join(__dirname, '../client/public/loaderio-927e368995a5ba705678096770accb6c.txt')));


// Load Listings Model
const Listing = require('./models/Listing');


// @route     GET api/:id
// @desc      Gets all booked dates for a listing
// @access    Public
app.get('/booking/:id', (req, res) => {
  Listing.findOne({listing_id: req.params.id})
    .then(listing => {
      if(listing === null){
        res.status(404).json({listingnotfound: 'No listing found'})
      }
      let currentListing = {};
      currentListing.price = listing.listing_price
      currentListing.days = [];
      listing.details.forEach((detail) => {
        currentListing.days.push(detail.date)
      })
      res.json(currentListing)
    })
 });



// @route     POST api/dates/:id
// @desc      Books date(s) to the database
// @access    Public
app.post('/booking/:id', (req, res) => {
    let guests = req.body.guests
    let startDate = moment(req.body.startDate);
    let endDate = moment(req.body.endDate);
    
    if(guests.adults < 1){
      res.status(400).send({invalid: 'At least one adult must be in your party'});
      return;
    }

    Listing.findOne({listing_id: req.params.id})
      .then((listing) => {
         if(checkForConflictingDates(listing, startDate, endDate)){
           res.status(400).send({invalid: 'Unfortunately this date range is unavailable'})
           return;
         } else {

          bookDates(listing, startDate, endDate, guests)
            .then(() => {
              listing.save().then(() =>{
                res.status(201).send({validDates: 'Congrats, your dates have been booked!'})
              });
            })
         }
      });
  });

  // Delete a single day from UI
  app.delete('/booking/:id', (req, res) => {
    const bookingId = req.body.bookingId;
    Listing.findOneAndUpdate(
      { listing_id: req.params.id}, 
      { $pull: { "details": { 'booking_id': bookingId } } }, 
      {new: true},
      function(err, data){
        if (err) { console.log(err) }
        res.json(data);
      });
  });

    // Delete a single day from API
    app.delete('/:listingId/:bookingId', (req, res) => {
      Listing.findOneAndUpdate(
        { listing_id: req.params.listingId}, 
        { $pull: { "details": { 'booking_id': req.params.bookingId } } }, 
        {new: true},
        function(err, data){
          if (err) { console.log(err) }
          res.json(data);
        });
    });


  const checkForConflictingDates = (listing, startDate, endDate) => {

    let day = startDate;

    while(day <= endDate){
      if(_.find(listing.details, {'date': day.toDate()})){
        return true;
      } 
     day = day.clone().add(1, 'd');
    }
  }


  const bookDates = (listing, startDate, endDate, guests) => {
    return new Promise(function(resolve, reject){
      
      let day = startDate;

      while(day <= endDate){
      
      listing.details.push({
        date: day.toDate(),
        guests: guests
      })
      
      day = day.clone().add(1, 'd');
      } 
      resolve()

      reject(Error('Something broke'))
      
    })
  }


module.exports = app

