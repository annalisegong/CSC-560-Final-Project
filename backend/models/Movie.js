const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
const Movie = new Schema({
   name: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   status: {
      type: String,
      required: true
   }
}, {
   collection: 'movies'
})
module.exports = mongoose.model('Movie', Movie)