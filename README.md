# Database optimization for the FireBnb booking service

This application is one piece of a larger service-oriented application, and is responsible for the booking functionality of the app. I inherited this codebase, and set out to see if I could optimize it's database performance through testing and refactoring based upon the results.

Because my goal was to only optimized database performance, I avoided refactoring anything else in the application that wouldn't impact how quickly the DB could read and write.

## How the application works


## Initial challenges

### ENV variables between Unix and Windows in package.json
I was working on a Windows machine for this exercise. Upon first trying to run the start-up script for this application, I learned that there are differences between how environemnt variables work between Unix and Windows, specifically when trying to set configuration variables.

Initially, I simply added the required "set" keyword before setting NODE_ENV to fix this, but opted in the end to use an NPM package called ["cross-env"](https://github.com/kentcdodds/cross-env) to handle this, and remove this as a roadblock for anyone who may inherit this codebase in the future.

**Before:**
```json
    "start-dev": "NODE_ENV=development nodemon server/server.js"
```

**After:**
```json
    "start-dev": "cross-env NODE_ENV=development nodemon server/server.js"
```

The cross-env package provides an API that injects the correct syntax for setting environent variables dependent on the currently platform. So, in the likely case that the next person is working on a unix based machine, they would not have to deal with updating my Windows specific syntax to get up and running.

## Database performance and optimizations
This application originally shipped with MongoDB, using Mongoose as an ODM. The data I was dealing with consisted of two different models:

```javascript
  const DetailsSchema = new Schema({
    date: {
      type: Date,
      required: true
    },
    guests: {
      type: Object,
      required: true,
    },
});

const ListingSchema = new Schema({
    listing_id: {
      type: Number,
      required: true
    },
    details: [DetailsSchema],
    listing_price: {
      type: Number,
      required: true
    }
});
```



## Outcome