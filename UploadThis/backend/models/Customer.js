// Customer.js
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  name: String
}, { collection: 'customers' });
module.exports = mongoose.model('Customer', customerSchema);