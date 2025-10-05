function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  // Corrected link to use ?id=...
  let boxLink = document.createElement("a");
  boxLink.href = "contentDetails.html?id=" + ob.id;

  // Updated to use correct image paths based on your folder structure
  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  h3.textContent = ob.name;

  let h4 = document.createElement("h4");
  h4.textContent = ob.brand;

  let h2 = document.createElement("h2");
  h2.textContent = "Rs " + ob.price;

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

// All preview paths use your folder structure (e.g., img/img5.jpg/image51.jpg)
let contentTitle = [
  {
    id: 1,
    name: "Men Navy Blue Solid Sweatshirt",
    preview: "img/img5.jpg/image51.jpg",
    brand: "United Colors Of Benetton",
    price: 2599,
    isAccessory: false
  },
  {
    id: 2,
    name: "Men Black MAMGP T7 Sweat Sporty Jacket",
    preview: "img/img6.jpg/image61.jpg",
    brand: "Puma",
    price: 7999,
    isAccessory: false
  },
  {
    id: 3,
    name: "Women Black Solid Lightweight Leather Jacket",
    preview: "img/img7.jpg/image71.jpg",
    brand: "BARESKIN",
    price: 9999,
    isAccessory: false
  },
  {
    id: 4,
    name: "Men Brown Leather Jacket",
    preview: "img/img8.jpg/image81.jpg",
    brand: "Woodland",
    price: 8500,
    isAccessory: false
  },
  {
    id: 5,
    name: "Women Blue Solid Shirt Dress",
    preview: "img/img9.jpg/image91.jpg",
    brand: "SASSAFRAS",
    price: 5200,
    isAccessory: false
  },
  {
    id: 6,
    name: "Unisex Silver-Toned Series 3 Smart Watch",
    preview: "img/img10.jpg",
    brand: "Apple",
    price: 31999,
    isAccessory: true
  },
  {
    id: 7,
    name: "Women Black Strappy Heels",
    preview: "img/img11.jpg",
    brand: "Fossil",
    price: 4599,
    isAccessory: true
  },
  {
    id: 8,
    name: "Men Black Action Parkview Shoes",
    preview: "img/img12.jpg",
    brand: "Hush Puppies",
    price: 6999,
    isAccessory: true
  },
  {
    id: 9,
    name: "Leather Handbag",
    preview: "img/img13.jpg",
    brand: "Caprese",
    price: 3999,
    isAccessory: true
  },
  {
    id: 10,
    name: "Sport Bluetooth Earphones",
    preview: "img/img14.jpg",
    brand: "Realme",
    price: 2999,
    isAccessory: true
  }
];

let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");

containerClothing.innerHTML = "";
containerAccessories.innerHTML = "";

for (let i = 0; i < contentTitle.length; i++) {
  if (contentTitle[i].isAccessory) {
    containerAccessories.appendChild(
      dynamicClothingSection(contentTitle[i])
    );
  } else {
    containerClothing.appendChild(
      dynamicClothingSection(contentTitle[i])
    );
  }
}
