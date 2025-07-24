window.onload = function() {
    updateCartBadge();
};

document.addEventListener('DOMContentLoaded', function () {
    var welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();
  });

// Cart badge update function (same as before)
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.innerText = totalItems;

    if (totalItems > 0) {
        cartBadge.style.display = 'inline';
    } else {
        cartBadge.style.display = 'none';
    }
} 

const profiles = document.querySelectorAll('.profile');
const testimonialParagraph = document.getElementById('testimonial-paragraph');
const testimonialName = document.getElementById('testimonial-name');

let currentIndex = 0;

function showProfile(index) {
    profiles.forEach((profile, i) => {
        profile.classList.remove('active');
        if (i === index) {
            profile.classList.add('active');
            testimonialParagraph.textContent = profile.getAttribute('data-text');
            testimonialName.textContent = profile.getAttribute('data-name');
        }
    });
}

function nextProfile() {
    currentIndex = (currentIndex + 1) % profiles.length; // Loop back to start
    showProfile(currentIndex);
}

setInterval(nextProfile, 3000); // Change profile every 3 seconds
showProfile(currentIndex); // Show the initial profile

