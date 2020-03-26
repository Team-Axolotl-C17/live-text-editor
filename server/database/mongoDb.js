/*  MongoDB Connection Logic */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/mongoKey.js').mongoURI;

console.log(db)

mongoose
  .connect(db)
  .then(() => console.log('We are now connected to the MongoDB'))
  .catch(err => console.log('We have failed to connect to the MongoDB'))

// User Schema
const projectSchema = new Schema({
    project_id: {type: String, required: true},
    project_name: {type: String, require: true},
    body: {type: String, required: true},
  });
  
const Project = mongoose.model('project', projectSchema);
  
module.exports = Project;
