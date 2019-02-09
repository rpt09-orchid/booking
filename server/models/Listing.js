const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Details Schema
const DetailsSchema = new Schema({
    booking_id: {
      type: Number,
      required: true,
      index: true
    },
    date: {
      type: Date,
      required: true
    },
    guests: {
      type: Object,
      required: true,
    },
});

//BookedDates Schema
const ListingSchema = new Schema({

    listing_id: {
      type: Number,
      required: true,
      index: true
    },
    details: [DetailsSchema],
    listing_price: {
      type: Number,
      required: true
    }
});


module.exports = Listing = mongoose.model('listing', ListingSchema);