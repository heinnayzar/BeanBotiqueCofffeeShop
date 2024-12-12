document.addEventListener("DOMContentLoaded", function() {
    // Example of dynamic product display
    const coffeeItems = document.querySelectorAll('.coffee-item');
    const searchInput = document.getElementById('search-coffee');
  
    searchInput.addEventListener('input', function() {
      const filter = searchInput.value.toLowerCase();
      coffeeItems.forEach(item => {
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        if (title.includes(filter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  