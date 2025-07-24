    // Handle sign-up form submission
    document.getElementById('signup-form').addEventListener('submit', function (event) {
      event.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Save the user data in localStorage
      localStorage.setItem('signedUp', 'true');
      localStorage.setItem('email', email); 
      localStorage.setItem('password', password);
  
      // Update UI after sign-up
      updateSignInOutStatus(true);
    });
  
    // Handle sign out functionality
    document.getElementById('signout-btn').addEventListener('click', function () {
      // Clear user data from localStorage
      localStorage.removeItem('signedUp');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
  
      // Clear form inputs
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';

      // Update UI after sign-out
      updateSignInOutStatus(false);
    });
  
    // Function to update sign-in/out status dynamically
    function updateSignInOutStatus(isSignedIn) {
      const signoutBtn = document.getElementById('signout-btn');
      const messageDiv = document.getElementById('message');
  
      if (isSignedIn) {
        // Show the sign-out button and success message
        signoutBtn.style.display = 'block';
        messageDiv.innerHTML = '<div class="alert alert-success" role="alert">Thank you for signing up! Your discount is on its way.</div>';
      } else {
        // Hide the sign-out button and show sign-out message
        signoutBtn.style.display = 'none';
        messageDiv.innerHTML = '<div class="alert alert-warning" role="alert">You have been signed out.</div>';
      }
    }
  
    // Check sign-in status on page load
    window.onload = function() {
      const isSignedIn = localStorage.getItem('signedUp') === 'true';
      updateSignInOutStatus(isSignedIn);  // Check and update UI based on sign-in status
      updateCartBadge();  // Update cart badge on page load
    };
  
    // Function to update the cart badge dynamically
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