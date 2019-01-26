const faker = require('faker');
const moment = require('moment');
const mongoose = require('mongoose');
const Listing = require('./models/Listing');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/booking', { useNewUrlParser: true });
let db = mongoose.connection;

db.on('error', (err) => {
  console.log('error connecting', err);
});

db.once('open', () => {
  console.log('Connected to DB');
});

let recordId = 0;
const batches = 1;
const recordsPerBatch = 500;

const seeder = async () => {
  let batchCounter = 0;

  while (batchCounter < batches) {
    const data = await generateBatch();
    await Listing.insertMany(data)
      .catch((err) => {
        console.log(err);
      });
    await batchCounter++;
  }
};

const generateBatch = async () => {
  let batch = [];
  let recordsCounter = 1;

  while (recordsCounter <= recordsPerBatch) {
    let details = [];
    let bookingsCounter = 1;

    while (bookingsCounter <= 50) {
      let d = faker.date.between('2018-01-01', '2019-09-30');
      const newD = moment(d).startOf('day');
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
          })
        }
      }
      details.push(detail);
      bookingsCounter++;
    }

    const newListing = {
      listing_id: recordId,
      details: details,
      listing_price: faker.commerce.price(50, 100)
    };
    recordId++;
    recordsCounter++;
    batch.push(newListing);
  }
  return batch;
}

const timer = async (testFunction) => {
  let startTime = Date.now(); 
  await testFunction();
  let timeElapsed = (Date.now() - startTime) / 1000;
  console.log(`Inserting ${batches} batches of ${recordsPerBatch} records per batch...`);
  console.log('Runtime:', timeElapsed, 'seconds');
}

timer(seeder);