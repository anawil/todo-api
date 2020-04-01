var debug = require('debug')('http')
var mongoose = require('mongoose')
const Schema = mongoose.Schema;


var Task = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('tasks', Task);
