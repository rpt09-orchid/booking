const mongoose = require('mongoose');
let mongo_uri;

// Loading DB
if (process.env.NODE_ENV === 'development') {
  const keys = require('../config/keys');
  mongo_uri = keys.mongodbUri
} else {
  mongo_uri = process.env.mongo_uri
}

<<<<<<< HEAD
// FIX ME: Need to figure out why pulling in the uri from keys is not working
=======
>>>>>>> a32f86824732d142b714d41a9120410dc46f6c87
mongoose.connect('mongodb://localhost/booking', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (e) => {
  console.log('mongoose connection error', e);
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});