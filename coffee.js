let selectedGrind = {};
let selectedSize = {};
let prices = [10, 12, 14, 15, 16, 11]; // Initial prices for each coffee
let quantities = [1, 1, 1, 1, 1, 1]; // Initial quantities for each coffee

function chooseGrind(coffeeId, grindType, event) {
    // Deselect all grind buttons
    const buttons = event.target.parentNode.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected');
    }
      // Select the chosen grind
    event.target.classList.add('selected');
    selectedGrind[coffeeId] = grindType;
}

function chooseSize(coffeeId, size, price, event) {
    // Deselect all size buttons
    const buttons = event.target.parentNode.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected');
    }
    // Select the chosen size
    event.target.classList.add('selected');
    selectedSize[coffeeId] = { size: size, price: price };
    updatePrice(coffeeId);
}

function changeQuantity(coffeeId, change) {
    const quantityInput = document.getElementById(`quantity${coffeeId}`);
    let newQuantity = parseInt(quantityInput.value) + change;
    if (newQuantity < 1) return; // Don't allow quantity to go below 1
    quantityInput.value = newQuantity;
    quantities[coffeeId - 1] = newQuantity; // Update quantity
    updatePrice(coffeeId);
}

function updatePrice(coffeeId) {
    const priceElement = document.getElementById(`price${coffeeId}`);
    if (selectedSize[coffeeId]) {
        const selectedPrice = selectedSize[coffeeId].price;
        const quantity = quantities[coffeeId - 1];
        const totalPrice = selectedPrice * quantity;
        priceElement.textContent = totalPrice.toFixed(2);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    new Viewer(document.getElementById('coffee-list'), {
      navbar: false,
      toolbar: true,
      title: false
    });
  });

function addToCart(coffeeId) {
const shopNowButton = document.getElementById(`shopNow${coffeeId}`);

// Check if both grind type and size have been selected
if (!selectedGrind[coffeeId] || !selectedSize[coffeeId]) {
    showAlert('Please select both grind type and size before adding to cart.');
    return;
}
// Create a unique ID for each item based on coffeeId, grind type, and size
  const itemId = `coffee-${coffeeId}-${selectedGrind[coffeeId]}-${selectedSize[coffeeId].size}`;


  console.log("Adding to cart:", itemId);


const item = {
    id: itemId, // Unique identifier for this combination of coffee, grind type, and size
    coffeeId: coffeeId,
    name: document.querySelector(`.coffee-item[data-name="${document.querySelector(`.coffee-item:nth-child(${coffeeId})`).getAttribute('data-name')}"] h5`).innerText,
    grindType: selectedGrind[coffeeId],
    size: selectedSize[coffeeId].size,
    price: selectedSize[coffeeId].price,
    quantity: quantities[coffeeId - 1],
    image: document.querySelector(`.coffee-item:nth-child(${coffeeId}) img`).src
};

// Retrieve the existing cart from localStorage or create a new array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Check if an identical item (same grind type, size, and coffeeId) already exists in the cart
const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

if (existingItemIndex !== -1) {
    // If the item exists, just update the quantity
    cart[existingItemIndex].quantity += item.quantity;
} else {
    // Otherwise, add the new item to the cart
    cart.push(item);
}

// Save the updated cart back to localStorage
localStorage.setItem('cart', JSON.stringify(cart));

// Update the cart badge dynamically
updateCartBadge();

// Show a confirmation alert
    showAlert(`Added ${item.quantity} of ${item.name} (${item.grindType}, ${item.size}) to your cart.`);
}


function showAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
    alertModal.show();
}

// Ensure the cart badge is updated when the page loads
document.addEventListener('DOMContentLoaded', updateCartBadge);

function showAlert(message) {
    document.getElementById('alertMessage').innerText = message;
    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
    alertModal.show();
}

function searchCoffee() {
    const input = document.getElementById('search-coffee').value.toLowerCase();
    const coffeeItems = document.querySelectorAll('.coffee-item');
    let found = false;
    coffeeItems.forEach(item => {
        const coffeeName = item.getAttribute('data-name').toLowerCase();
        if (coffeeName.includes(input)) {
          item.style.display = 'flex'; // Show item
          found = true;
        } else {
          item.style.display = 'none'; // Hide item
        }
    });
    document.getElementById('no-results').style.display = found ? 'none' : 'block';
}

function clearSearch() {
    document.getElementById('search-coffee').value = '';
    searchCoffee();
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.innerText = totalItems;
    // Show badge only if there are items in the cart
    if (totalItems > 0) {
        cartBadge.style.display = 'inline';
    } else {
        cartBadge.style.display = 'none';
    }
}

// Call updateCartBadge when the page loads
window.onload = function() {
    updateCartBadge();
};