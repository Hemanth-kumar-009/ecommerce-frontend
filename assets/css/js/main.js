function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
function saveCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); }

function addToCart(id){
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if(item) item.qty++;
  else cart.push({ id, qty:1 });
  saveCart(cart);
  updateCartBadge();
}

function updateCartBadge(){
  const count = getCart().reduce((s, i)=>s+i.qty,0);
  document.querySelectorAll('.cart-badge').forEach(el => el.textContent = count);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
