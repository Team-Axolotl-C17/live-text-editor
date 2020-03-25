/*  MongoDB Connection Logic */
const mongoose = require('mongoose');
const db = require('./config/mongoKey.js').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('We are now connected to the MongoDB'))
  .catch(err => console.log('We have failed to connect to the MongoDB'))

const Schema = mongoose.Schema;

module.exports = {
    // export Schemas
}