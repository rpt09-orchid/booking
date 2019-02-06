# Exploring performance differences of MongoDB vs. Postgres in a Node based app

This application is one piece of a larger service-oriented AirBnb clone, and is responsible for the booking functionality of the app. I inherited this codebase, and set out to see if I could optimize the performance of the MongoDB it shipped with. Also, I was curious to see if I could make the application more performant by changing the DBMS altogether, and refactoring the application to utilize a SQL based system, such as Postgres.

## Challenge
**Here were my goals:**

1. Develop a seeding script that can generate and save 10 million unique records to the database in less than 30 minutes


<!-- Because my goal was to only optimized database performance, I avoided refactoring anything else in the application that wouldn't impact how quickly the DB could read and write. -->

## How the application works




## Database
This application originally shipped with MongoDB, using Mongoose as an ODM. The data I was dealing with consisted of two models (Listing, and Details) using the following schemas.

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

The "Listing" model represents what each document in the store ultimately looks like, with the "Details" model representing objects that live within each listings "details" field (array).

## Other interesting learnings

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

The cross-env package provides an API that injects the correct syntax for setting environent variables dependent on the current platform. So, in the likely case that the next person is working on a Unix based machine, they would not have to deal with updating my Windows specific syntax to get up and running.