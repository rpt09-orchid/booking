const mongoose = require('mongoose');
var test = process.env.NODE_ENV;
let mongo_uri;
console.log(process.env.NODE_ENV === 'development')

// Loading DB
if (process.env.NODE_ENV === 'development') {
  console.log('poop')
  const keys = require('../config/keys')
  mongo_uri = keys.mongodbUri
  console.log('mongo_uri')
} else {
  mongo_uri = process.env.mongo_uri
}


// mongoose.connect(mongo_uri, { useNewUrlParser: true });

// const db = mongoose.connection;

// // Connecting to DB
// db.on('error', function() {
//   console.log('mongoose connection error');
// });

// db.once('open', function() {
//   console.log('mongoose connected successfully');
// });