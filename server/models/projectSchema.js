const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// User Schema
const projectSchema = new Schema({
    id: {type: String, required: true},
    projectName: {type: String, require: true},
    body: {type: String, required: true},
  });
  
  const Project = mongoose.model('project', projectSchema);
  

  module.exports = Project;