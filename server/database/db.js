const mongoose = require('mongoose');
let mongo_uri;

// Loading DB
if (process.env.NODE_ENV === 'development') {
  mongo_uri = 'mongodb://localhost/booking'
} else {
  mongo_uri = process.env.MONGODB_URI;
}

mongoose.connect(mongo_uri, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (e) => {
  console.log('mongoose connection error', e);
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});