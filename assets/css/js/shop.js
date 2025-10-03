function renderProducts(filterCategory = "all", searchQuery = "") {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  let filtered = products.filter(p => 
    (filterCategory === "all" || p.category === filterCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if(filtered.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p><strong>₹${p.price}</strong></p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Filters
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  document.getElementById("categoryFilter").addEventListener("change", (e) => {
    renderProducts(e.target.value, document.getElementById("searchInput").value);
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    renderProducts(document.getElementById("categoryFilter").value, e.target.value);
  });
});
