const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  project: String,
  message: String
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
