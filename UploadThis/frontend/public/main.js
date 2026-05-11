//Customer data rerieval
//Fetch custiomer data first

console.log("AM AWAKE"); // Debugging line to check if the script is running

fetch('http://localhost:3000/customers')
  .then(res => res.json())
  .then(customers => {
    const customer = customers.find(c => c.name === "Zack Kayle"); //Zack is the only example for now
    const header = document.getElementById("header"); //Displayes welcome message
    console.log(customers); // See what's returned
    if (customer) {
      header.textContent = `Welcome ${customer.name} to the EveryMart where we have everything!`;
    }
    else {
      console.log("Customer not found!");
      header.textContent = "HOW ARE YOU HERE? HOW DID THIS HAPPEN?!";
    }
  });

  //cart code
let inventory = document.getElementById("cartItems");
let price = document.getElementById("totalPrice");
let cart = [];
let products = 0; // Number of products in the cart
let totalPrice = 0; // Total price of the cart

function updateCartDisplay(){
if(products == 0)
  {
    inventory.textContent = "Your cart is empty";
    price.textContent = "Total Price: $0.00";
  }
  else{
    inventory.textContent = `You have ${products} products in your cart`;
    price.textContent = `Total Price: $${totalPrice}`;
  }
}
// Product showcase assignment
let unit1 = document.getElementById("unit1"); // product name
let unit2 = document.getElementById("unit2"); // product name
let unit4 = document.getElementById("unit4"); // product name
let unit1button = document.getElementById("unit1addtocart"); // add to cart button
let unit2button = document.getElementById("unit2addtocart"); // add to cart button
let unit1price = document.getElementById("unit1price"); // product price
let unit2price = document.getElementById("unit2price"); // product price
let unit4price = document.getElementById("unit4price"); // product price
let unit1stock = document.getElementById("unit1stock"); // stock indicator for unit1
let unit2stock = document.getElementById("unit2stock"); // stock indicator for unit2

fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(products => {
    console.log(products); // See what's returned
    const milk = products.find(p => p.name === "Full Fat Milk");
    if (milk) {
      unit4.textContent = milk.name;
      unit4price.textContent = `$${milk.price.toFixed(2)}`;
      console.log(`Milk price set to: $${milk.price.toFixed(2)}`);
    } else {
      console.log("Milk product not found!");
    }
  });

fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(products => {
    const apple = products.find(p => p.name === "Red Apple");
    if (apple) {
      unit2.textContent = apple.name;
      unit2price.textContent = `$${apple.price.toFixed(2)}`;
      if( apple.units > 0) {
        unit2stock.textContent = "In Stock";
        unit2button.disabled = false; // Enable the button if in stock
      }
      else {
        unit2stock.textContent = "Out of Stock";
        unit2button.disabled = true; // Disable the button if out of stock
      }
      console.log(`Apple price set to: $${apple.price.toFixed(2)}`);
    }
  });

  fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(products => {
    console.log(products); // See what's returned
    const fan = products.find(p => p.name === "Blue Desk Fan");
    if (fan) {
      unit1.textContent = fan.name;
      unit1price.textContent = `$${fan.price.toFixed(2)}`;
      if( fan.units > 0) {
        unit1stock.textContent = "In Stock";
        unit1button.disabled = false; // Enable the button if in stock
      }
      else {
        unit1stock.textContent = "Out of Stock";
        unit1button.disabled = true; // Disable the button if out of stock
      }
      console.log(`Fan price set to: $${fan.price.toFixed(2)}`);
    } else {
      console.log("Fan product not found!");
    }
  });

unit1button.addEventListener("click", function() {
  const quantity = document.getElementById("unit1quantity").value;
  showPopup(`Added quantity of ${quantity} ${unit1.textContent} to cart`);
  products += parseInt(quantity);
  updateCartDisplay();
});

function showPopup(message) {
  const popup = document.getElementById('popup');
  popup.textContent = message;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 2000); // Popup disappears after 2 seconds
}

unit2button.addEventListener("click", function() {
  const quantity = document.getElementById("unit2quantity").value;
  if (quantity < 1) {
    showPopup("Please select a valid quantity");
    return;
  }
  else if (quantity == 1)
  {
    showPopup(`Added ${quantity} ${unit2.textContent} to cart`);
    products += 1;
    totalPrice += parseFloat(unit2price.textContent.replace('$', ''));
    updateCartDisplay();
  }
  else
  {
    showPopup(`Added ${quantity} ${unit2.textContent}s to cart`);
    products += parseInt(quantity);
    totalPrice += parseFloat(unit2price.textContent.replace('$', '')) * parseInt(quantity);
    updateCartDisplay();
  }
});

