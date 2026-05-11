const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  units: String
}, { collection: 'inventory' }); // <-- specify collection name

module.exports = mongoose.model('Product', productSchema);