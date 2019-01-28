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
let insertData = [];
const batches = 100;
const recordsPerBatch = 100000;

const seeder = async () => {
  let batchCounter = 0;

  while (batchCounter < batches) {
    generateBatch();
    await Listing.insertMany(insertData)
      .catch((err) => {
        console.log(err);
      });
      insertData = [];
    batchCounter++;
  }
  console.log(insertData);
};

const generateBatch = () => {

    let recordsCounter = 1;
    let batch = [];
  
    while (recordsCounter <= recordsPerBatch) {
      let details = [];
      let bookingsCounter = 1;
  
      while (bookingsCounter <= 1) {
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
        listing_id: 1,
        details: details,
        listing_price: faker.commerce.price(50, 100)
      };
  
      recordId++;
      recordsCounter++;
      insertData.push(newListing);
    }
}

const timer = async (testFunction) => {
  let startTime = Date.now(); 
  await testFunction();
  let timeElapsed = (Date.now() - startTime) / 1000;
  console.log(`Inserting ${batches} batches of ${recordsPerBatch} records per batch...`);
  console.log('Runtime:', timeElapsed, 'seconds');
}

timer(seeder);