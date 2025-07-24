// Cart badge update
    function updateCartBadge() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      const cartBadge = document.getElementById('cart-badge');
      cartBadge.innerText = totalItems;
      cartBadge.style.display = totalItems > 0 ? 'inline' : 'none';
    }

    // Delivery form logic
    document.getElementById('deliveryForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const total = parseFloat(document.getElementById('orderTotal').value);
      const resultBox = document.getElementById('deliveryResult');

      if (isNaN(total) || total < 0) {
        resultBox.innerHTML = `<span style="color:red;">❌ Please enter a valid order amount.</span>`;
        return;
      }

      if (total >= 50) {
        resultBox.innerHTML = `<span style="color:green;">✅ Congrats! You're eligible for free delivery.</span>`;
      } else {
        const diff = (50 - total).toFixed(2);
        resultBox.innerHTML = `<span style="color:orange;">⚠️ Spend $${diff} more to unlock free delivery.</span>`;
      }
    });

  // Subscription Modal Info
  const subscribeModal = document.getElementById('subscribeModal');
  subscribeModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const plan = button.getAttribute('data-plan');
    const price = button.getAttribute('data-price');
    document.getElementById('selectedPlanName').innerText = plan;
    document.getElementById('selectedPlanPrice').innerText = price;
  });

  // Handle subscription form
  document.getElementById('subscribeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const result = document.getElementById('subscribeResult');
    result.innerHTML = `<span style="color:green;">✅ Subscription successful! Welcome to Bean Boutique.</span>`;
  });

    document.addEventListener('DOMContentLoaded', updateCartBadge);