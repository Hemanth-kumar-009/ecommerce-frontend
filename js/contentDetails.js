// Get product id from URL (?id=6)
let id = new URLSearchParams(window.location.search).get('id');

// Find product in array
const product = products.find(p => String(p.id) === id);

// Render function
function dynamicContentDetails(product) {
  const mainContainer = document.createElement('div');
  mainContainer.id = 'containerD';
  mainContainer.style.display = 'flex';
  mainContainer.style.gap = '40px';
  mainContainer.style.padding = '36px';
  mainContainer.style.backgroundColor = '#fff';
  mainContainer.style.borderRadius = '10px';
  mainContainer.style.margin = '25px auto';
  mainContainer.style.maxWidth = '1200px';
  mainContainer.style.boxShadow = '0 4px 18px rgba(0,0,0,0.08)';

  // Images
  const imageSectionDiv = document.createElement('div');
  imageSectionDiv.id = 'imageSection';
  imageSectionDiv.style.display = 'flex';
  imageSectionDiv.style.flexDirection = 'row';
  imageSectionDiv.style.gap = '20px';

  const thumbnailsDiv = document.createElement('div');
  thumbnailsDiv.style.display = 'flex';
  thumbnailsDiv.style.flexDirection = 'column';
  thumbnailsDiv.style.gap = '12px';

  // Main image
  const imgTag = document.createElement('img');
  imgTag.id = 'imgDetails';
  imgTag.src = product.images[0];
  imgTag.style.width = '360px';
  imgTag.style.height = '420px';
  imgTag.style.objectFit = 'contain';
  imgTag.style.borderRadius = '10px';
  imgTag.style.boxShadow = '0 2px 10px #ddd';

  // Thumbnails (works with 1 or more images)
  product.images.forEach(imgSrc => {
    const thumbImg = document.createElement('img');
    thumbImg.src = imgSrc;
    thumbImg.style.width = '60px';
    thumbImg.style.height = '70px';
    thumbImg.style.objectFit = 'cover';
    thumbImg.style.cursor = 'pointer';
    thumbImg.style.borderRadius = '6px';
    thumbImg.style.border = '2px solid #eee';
    thumbImg.onclick = () => { imgTag.src = imgSrc; };
    thumbnailsDiv.appendChild(thumbImg);
  });

  imageSectionDiv.appendChild(thumbnailsDiv);
  imageSectionDiv.appendChild(imgTag);

  // Product Info
  const productDetailsDiv = document.createElement('div');
  productDetailsDiv.id = 'productDetails';
  productDetailsDiv.style.flex = '1';
  productDetailsDiv.style.display = 'flex';
  productDetailsDiv.style.flexDirection = 'column';
  productDetailsDiv.style.gap = '14px';

  const h1 = document.createElement('h1');
  h1.textContent = product.name;
  productDetailsDiv.appendChild(h1);

  const h4 = document.createElement('h4');
  h4.textContent = product.brand;
  productDetailsDiv.appendChild(h4);

  const priceDiv = document.createElement('div');
  priceDiv.innerHTML = `<span style="font-size: 22px; font-weight: 800; color: #388e3c;">Rs ${product.price}</span>`;
  productDetailsDiv.appendChild(priceDiv);

  const descDiv = document.createElement('div');
  descDiv.id = 'details';
  const h3Desc = document.createElement('h3');
  h3Desc.textContent = 'Description';
  descDiv.appendChild(h3Desc);
  const para = document.createElement('p');
  para.textContent = product.description;
  descDiv.appendChild(para);
  productDetailsDiv.appendChild(descDiv);

  // Add to Cart button with click event
  const buttonDiv = document.createElement('div');
  buttonDiv.id = 'button';
  const buttonTag = document.createElement('button');
  buttonTag.textContent = 'Add to Cart';
  buttonTag.style.backgroundColor = '#388e3c';
  buttonTag.style.color = 'white';
  buttonTag.style.fontWeight = 'bold';
  buttonTag.style.borderRadius = '5px';
  buttonTag.style.padding = '14px 50px';
  buttonTag.style.cursor = 'pointer';
  buttonTag.style.border = 'none';

  // Updated Add to Cart behavior
  buttonTag.addEventListener('click', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      alert('Increased product quantity in cart!');
    } else {
      cart.push({ ...product, quantity: 1 });
      alert('Added to cart!');
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Optionally call function to update cart badge here
  });

  buttonDiv.appendChild(buttonTag);
  productDetailsDiv.appendChild(buttonDiv);

  mainContainer.appendChild(imageSectionDiv);
  mainContainer.appendChild(productDetailsDiv);

  document.getElementById('containerProduct').innerHTML = '';
  document.getElementById('containerProduct').appendChild(mainContainer);
}

// Show product or error
if (product) {
  dynamicContentDetails(product);
} else {
  document.getElementById('containerProduct').innerHTML = "<h2>Product Not Found</h2>";
}
