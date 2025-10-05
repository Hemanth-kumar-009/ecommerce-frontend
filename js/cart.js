// Add product to cart or increment quantity
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  let item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity++;
  } else {
    let product = products.find(p => p.id === productId);
    if (!product) {
      alert('Product not found!');
      return;
    }
    cart.push({...product, quantity: 1});
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  updateCartUI();
}

// Retrieve cart items
function getCartItems() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Remove item by id
function removeItem(productId) {
  let cart = getCartItems();
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  updateCartUI();
}

// Update item quantity
function updateQuantity(productId, qty) {
  let cart = getCartItems();
  let item = cart.find(i => i.id === productId);
  if (item && qty > 0) {
    item.quantity = qty;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    updateCartBadge();
  }
}

// Calculate total price
function calculateTotalPrice() {
  let cart = getCartItems();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Update cart icon badge count
function updateCartBadge() {
  let cart = getCartItems();
  let badge = document.getElementById('badge');
  if (!badge) return;
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
}

// Update total items display
function updateTotalItems() {
  let cart = getCartItems();
  let totalItemsElem = document.getElementById('totalItem');
  if (!totalItemsElem) return;
  let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  totalItemsElem.textContent = 'Total Items: ' + totalCount;
}

// Update cart UI
function updateCartUI() {
  let cart = getCartItems();
  let container = document.getElementById('cartContainer');
  if (!container) return;
  container.innerHTML = '';

  cart.forEach(item => {
    let div = document.createElement('div');
    div.className = 'cart-item';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '15px';
    div.style.marginBottom = '15px';

    div.innerHTML = `
      <img src="${item.images[0]}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: contain; border-radius: 6px;" />
      <div style="flex:1;">
        <div><strong>${item.name}</strong></div>
        <div>Price: Rs ${item.price}</div>
        <div>
          Quantity: 
          <input type="number" min="1" value="${item.quantity}" style="width: 50px;" data-id="${item.id}" class="qty-input" />
        </div>
      </div>
      <button style="background:#d32f2f;color:white;border:none;padding:8px 14px;border-radius:6px;cursor:pointer" data-id="${item.id}" class="remove-btn">Remove</button>
    `;
    container.appendChild(div);
  });

  let totalDiv = document.createElement('div');
  totalDiv.style.marginTop = '20px';
  totalDiv.style.fontWeight = 'bold';
  totalDiv.style.fontSize = '18px';
  totalDiv.textContent = `Total: Rs ${calculateTotalPrice()}`;
  container.appendChild(totalDiv);

  // Place Order Button
  let placeOrderButton = document.createElement('button');
  placeOrderButton.textContent = 'Place Order';
  placeOrderButton.style.marginTop = '20px';
  placeOrderButton.style.padding = '12px 25px';
  placeOrderButton.style.fontSize = '18px';
  placeOrderButton.style.backgroundColor = '#388e3c';
  placeOrderButton.style.color = 'white';
  placeOrderButton.style.border = 'none';
  placeOrderButton.style.borderRadius = '6px';
  placeOrderButton.style.cursor = 'pointer';

  placeOrderButton.onclick = function() {
    let cart = getCartItems();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    localStorage.removeItem('cart');
    updateCartBadge();
    updateCartUI();
    updateTotalItems();
    window.location.href = 'orderPlaced.html';
  };

  container.appendChild(placeOrderButton);

  container.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = function() {
      let id = Number(this.getAttribute('data-id'));
      removeItem(id);
    }
  });

  container.querySelectorAll('.qty-input').forEach(input => {
    input.onchange = function() {
      let id = Number(this.getAttribute('data-id'));
      let qty = Number(this.value);
      if (qty > 0) {
        updateQuantity(id, qty);
      }
    }
  });

  updateTotalItems();
}

// Initialize UI and badge on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  updateCartUI();
  updateTotalItems();
});
