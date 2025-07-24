    let quantities = [1, 1]; // Initial quantities for each equipment

    function changeQuantity(equipmentId, change) {
      const quantityInput = document.getElementById(`quantity${equipmentId}`);
      let newQuantity = parseInt(quantityInput.value) + change;
      if (newQuantity < 1) newQuantity = 1;
      quantityInput.value = newQuantity;
      updatePrice(equipmentId, newQuantity);
    }

    function updatePrice(equipmentId, newQuantity) {
      const basePrices = [500, 40, 50, 45, 25, 20]; // Base prices for equipment
      const priceElement = document.getElementById(`price${equipmentId}`);
      const newPrice = basePrices[equipmentId - 1] * newQuantity;
      priceElement.textContent = newPrice.toFixed(2);
    }
  

    function addToCart(equipmentId, equipmentName, basePrice) {
        const quantity = parseInt(document.getElementById(`quantity${equipmentId}`).value);
        const totalPrice = quantity * basePrice;

        // Use a unique identifier for equipment items
        const itemId = `equipment-${equipmentId}`;

        const item = {
          id: itemId,
          name: equipmentName,
          quantity: quantity,
          price: basePrice,
          totalPrice: totalPrice,
          image: document.querySelector(`.equipment-item:nth-child(${equipmentId}) img`).src // Get image for equipment
        };

        // Retrieve existing cart data from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the equipment item is already in the cart
        const existingItemIndex = cart.findIndex(item => item.id === itemId);

        if (existingItemIndex !== -1) {
            // If the item exists, update quantity and price
            cart[existingItemIndex].quantity += quantity;
            cart[existingItemIndex].totalPrice += totalPrice;
        } else {
            // If the item is new, add to cart
            cart.push(item);
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart notification
        updateCartBadge();

        // Show modal alert
        document.getElementById('alertMessage').textContent = `Added ${quantity} of ${equipmentName} to your cart.`;
        const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
        alertModal.show();
    }


    function searchEquipment() {
      const query = document.getElementById('search-equipment').value.toLowerCase();
      const equipmentItems = document.querySelectorAll('.equipment-item');
      let found = false;

      equipmentItems.forEach(item => {
        const name = item.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
          item.style.display = 'flex';
          found = true;
        } else {
          item.style.display = 'none';
        }
      });

      document.getElementById('no-results').style.display = found ? 'none' : 'block';
    }

    function clearSearch() {
      document.getElementById('search-equipment').value = '';
      searchEquipment();
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

    document.addEventListener("DOMContentLoaded", updateCartBadge);
    // document.querySelector(`.equipment-item[data-name="${equipmentName}"] img`).src;