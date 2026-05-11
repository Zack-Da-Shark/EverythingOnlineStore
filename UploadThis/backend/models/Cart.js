/*const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customerID: { type: String, required: true }, // Customer ID for the cart
  contents: [{ // Array of products in the cart
    name: String,
  category: String,
  price: Number,
  units: String
  }],
  totalPrice: { type: Number, default: 0 }, // Total price of the
}, { collection: 'carts' }); // <-- specify collection name

module.exports = mongoose.model('Cart', cartSchema);
*/