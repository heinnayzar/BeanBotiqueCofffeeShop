    function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const discountPriceElement = document.getElementById('discount-price');
    const finalPriceElement = document.getElementById('final-price');
    
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        // Display message and reset prices if the cart is empty
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('total-price').textContent = 'Total Price: $0.00';
        discountPriceElement.style.display = 'none';
        finalPriceElement.style.display = 'none';
        return;
    }

    let totalPrice = 0;
    const cartTable = document.createElement('table');
    cartTable.className = 'table table-hover';
    cartTable.innerHTML = `
        <thead>
            <tr>
                <th>Item</th>
                <th>Grind Type</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = cartTable.querySelector('tbody');
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const grindType = item.grindType ? item.grindType : '-';
        const cartItemRow = document.createElement('tr');
        cartItemRow.innerHTML = `
            <td><img src="${item.image || 'default-image.jpg'}" alt="${item.name || 'Item'}">${item.name || 'Unknown Item'}</td>
            <td>${grindType}</td>
            <td>${item.size || '-'}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td class="text-center">
                <div class="input-group me-2 justify-content-center" style="flex: 0 0 30%;"> 
                <button class="btn btn-outline-secondary" onclick="updateQuantity('${item.id}', -1)">-</button>
                <input class="text-center" type="number" value="${item.quantity || 1}" min="1" style="width: 50px;" readonly>
                <button class="btn btn-outline-secondary" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </td>
            <td><button class="btn btn-danger" onclick="removeFromCart('${item.id}')">Remove</button></td>
        `;
        tbody.appendChild(cartItemRow);
    });
    cartItemsContainer.appendChild(cartTable);
    document.getElementById('total-price').textContent = `Total Price: $${totalPrice.toFixed(2)}`;

    // Check if the user is signed up for discount
    const signedUp = localStorage.getItem('signedUp') === 'true';

    if (signedUp) {
        const discountPercentage = 5;
        const discountAmount = (totalPrice * discountPercentage) / 100;
        const finalPrice = totalPrice - discountAmount;

        discountPriceElement.textContent = `Discount: -$${discountAmount.toFixed(2)}`;
        finalPriceElement.textContent = `Final Price: $${finalPrice.toFixed(2)}`;
        
        discountPriceElement.style.display = 'block';
        finalPriceElement.style.display = 'block';
    } else {
        discountPriceElement.style.display = 'none';
        finalPriceElement.style.display = 'none';
    }
}

        
        function generateReceipt() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        const receiptDetails = document.getElementById('receipt-details');
        receiptDetails.innerHTML = "Your cart is empty, no receipt to generate.";
        new bootstrap.Modal(document.getElementById('receiptModal')).show();
        return;
    }

    let receiptContent = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        receiptContent += `${item.name} (${item.quantity} x $${item.price.toFixed(2)}) = $${itemTotal.toFixed(2)}<br><hr>`;
        totalPrice += itemTotal;
    });

    const signedUp = localStorage.getItem('signedUp') === 'true';
    if (signedUp) {
        const discountPercentage = 5;
        const discountAmount = (totalPrice * discountPercentage) / 100;
        const finalPrice = totalPrice - discountAmount;

        receiptContent += `<br>Total Price: $${totalPrice.toFixed(2)}<br>`;
        receiptContent += `Discount (${discountPercentage}%): -$${discountAmount.toFixed(2)}<br>`;
        receiptContent += `<strong>Final Price: $${finalPrice.toFixed(2)}</strong>`;
    } else {
        receiptContent += `<br><strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
    }

    document.getElementById('receipt-details').innerHTML = receiptContent;
    new bootstrap.Modal(document.getElementById('receiptModal')).show();
}

// Function to show discount message if user is signed up
function showDiscountMessage() {
    const signedUp = localStorage.getItem('signedUp') === 'true';
    const discountMessage = document.getElementById('discount-message');
    if (signedUp) {
        discountMessage.style.display = 'block';
    } else {
        discountMessage.style.display = 'none';
    }
}

// Call showDiscountMessage when the page loads
window.onload = function () {
    updateCartBadge();
    loadCart();
    showDiscountMessage();
};


        // Clear cart function (you may need to implement this based on your logic)
        function clearCart() {
            localStorage.removeItem('cart');
            loadCart();
        }
    
        function updateQuantity(itemId, change) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.id === itemId);
            if (itemIndex > -1) {
                cart[itemIndex].quantity += change;
                if (cart[itemIndex].quantity < 1) cart[itemIndex].quantity = 1; // Ensure quantity is at least 1
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart(); // Reload cart to update display
                updateCartBadge(); // Update the cart badge
            }
        }

        function removeFromCart(itemId) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== itemId); // Remove item from cart
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart(); // Reload cart to update display
            updateCartBadge(); // Update the cart badge
        }

        function clearCart() {
            // Clear the cart from localStorage
            localStorage.removeItem('cart');
            // Reload the cart display
            loadCart();
            // Update the cart badge
            updateCartBadge();
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