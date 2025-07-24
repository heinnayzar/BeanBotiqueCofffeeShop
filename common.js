document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const elements = document.querySelectorAll("body *:not(script):not(style)");

    // Remove previous highlights
    document.querySelectorAll('.highlighted').forEach(el => {
      el.outerHTML = el.textContent;
    });

    if (searchTerm.length > 1) {
      elements.forEach(el => {
        if (el.children.length === 0 && el.textContent.toLowerCase().includes(searchTerm)) {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          el.innerHTML = el.textContent.replace(regex, '<span class="highlighted">$1</span>');
        }
      });
    }
  });