const mongoose = require('mongoose');
let mongo_uri;

// Loading DB
if (process.env.NODE_ENV === 'development') {
  const keys = require('../config/keys');
  mongo_uri = keys.mongodbUri
} else {
  mongo_uri = process.env.mongo_uri
}

mongoose.connect('mongodb://localhost/booking', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (e) => {
  console.log('mongoose connection error', e);
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});