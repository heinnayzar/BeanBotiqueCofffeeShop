function registerEvent(eventName) {
      document.getElementById('eventName').value = eventName;
      document.getElementById('successAnimation').style.display = 'none';
      const modal = new bootstrap.Modal(document.getElementById('registrationModal'));
      modal.show();
    }

    document.getElementById('registrationForm').addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('successAnimation').style.display = 'block';
      document.getElementById('registrationForm').reset();
    });

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