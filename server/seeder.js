const faker = require('faker');
<<<<<<< HEAD
const db = require('./database/db');
const moment = require('moment');

// Load Listings Model
const Listing = require('./models/Listing');

const seeder = () => {
  // Droping existing sample data
  Listing.deleteMany({}, () => {
    for (let j = 1; j <= 100; j++) {
      let details = [];
      for (let i = 1; i <= 50; i++) {
        let d = faker.date.between('2018-01-01', '2019-09-30');
        const newD = moment(d).startOf('day')
        detail = {
          date: newD,
          guests: {
            adults: faker.random.number({
              'min': 1,
              'max': 3
            }),
            children: faker.random.number({
              'min': 0,
              'max': 3
            }),
            infants: faker.random.number({
              'min': 0,
              'max': 3
            }),
          }
=======
const moment = require('moment');
const mongoose = require('mongoose');
const Listing = require('./models/Listing');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/booking');
let db = mongoose.connection;

db.on('error', (err) => {
  console.log('error connecting', err);
});

db.once('open', () => {
  console.log('Connected to DB');
});


const seeder = async () => {
const batches = 2;
  for (let i = 0; i < batches; i++) {
    const data = await generateBatch();
    Listing.insertMany(data)
      .catch((err) => {
        console.log(err);
      });
  }
};

// Generate batch
const generateBatch = async () => {
  let batch = [];
  const recordsPerBatch = 100000;

  for (let j = 1; j <= recordsPerBatch; j++) {
    let details = [];
    for (let i = 1; i <= 50; i++) {
      let d = faker.date.between('2018-01-01', '2019-09-30');
      const newD = moment(d).startOf('day')
      detail = {
        date: newD,
        guests: {
          adults: faker.random.number({ 'min': 1, 'max': 3 }),
          children: faker.random.number({ 'min': 0, 'max': 3 }),
          infants: faker.random.number({ 'min': 0, 'max': 3 }),
>>>>>>> a32f86824732d142b714d41a9120410dc46f6c87
        }
      }
      details.push(detail)
    }

<<<<<<< HEAD
      const newListing = new Listing({
        listing_id: j,
        details: details,
        listing_price: faker.commerce.price(50, 100)
      })

      newListing.save((err) => {
        if (err) {
          console.log(err)
        }
      })
    }
  })
}

// Call Seeder func
seeder();
=======
    const newListing = {
      listing_id: j,
      details: details,
      listing_price: faker.commerce.price(50, 100)
    };

    batch.push(newListing)
  }
  return batch;
};

seeder();







>>>>>>> a32f86824732d142b714d41a9120410dc46f6c87
