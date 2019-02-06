const faker = require('faker');
const moment = require('moment');
const mongoose = require('mongoose');
const Listing = require('./models/Listing');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/booking', {
  useNewUrlParser: true
});
let db = mongoose.connection;

db.on('error', (err) => {
  console.log('error connecting', err);
});

db.once('open', () => {
  console.log('Connected to DB');
});

let recordId = 0;
let insertData = [];
const useModel = false;
const batches = 100;
const recordsPerBatch = 100000;
let progressInserted = 0;
let uniqId = 1;

const seeder = async () => {
  let batchCounter = 0;
  while (batchCounter < batches) {
    if (progressInserted === 0) {
      console.log(`Starting to insert ${recordsPerBatch * batches} records. Standby...`)
    } else {
      console.log(`${progressInserted} of ${recordsPerBatch * batches} inserted. Standby...`)
    }
    generateBatch();
    await insert(useModel);
    progressInserted += recordsPerBatch;
    insertData = [];
    batchCounter++;
  }

  if (progressInserted === (recordsPerBatch * batches)) {
    console.log('Done!');
  }
};

const insert = (useModel) => {
  if (useModel) {
    return new Promise(function (resolve, reject) {
      Listing.insertMany(insertData, function (error, doc) {
        if (error) {
          console.log(error);
        } else {
          resolve();
        }
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      db.collection('listings').insertMany(insertData, function (error, doc) {
        if (error) {
          console.log(error);
        } else {
          resolve();
        }
      });
    });
  }
}

const generateBatch = () => {
  let recordsCounter = 1;
  let batch = [];

  while (recordsCounter <= recordsPerBatch) {
    let details = [];
    let bookingsCounter = 1;

    while (bookingsCounter <= 10) {
      let d = faker.date.between('2018-01-01', '2019-09-30');
      detail = {
        date: d,
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
      listing_id: uniqId,
      details: details,
      listing_price: faker.commerce.price(50, 100)
    };
    
    uniqId++;
    recordId++;
    recordsCounter++;
    insertData.push(newListing);
  }
}

const timer = async (testFunction) => {
  let startTime = Date.now();
  await testFunction();
  let timeElapsed = (Date.now() - startTime) / 1000;
  console.log('Runtime:', timeElapsed, 'seconds');
}

timer(seeder);