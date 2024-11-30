const products = [
  {
    id: 1,
    name: "Waffle",
    fullname: "Waffle with Berries",
    price: "$6.50",
    image: "./assets/images/image-waffle-desktop.jpg",
    quantity: 0,
    inCart: false,
  },
  {
    id: 2,
    name: "Créme Brûlée",
    fullname: "Vanilla Bean Crème Brûlée",
    price: "$7.00",
    image: "./assets/images/image-creme-brulee-desktop.jpg",
    quantity: 0,
    inCart: false,
  },
  {
    id: 3,
    name: "Macaron",
    fullname: "Macaron Mix of Five",
    price: "$8.00",
    image: "./assets/images/image-macaron-desktop.jpg",
    quantity: 0,
    inCart: false,
  },
  {
    id: 4,
    name: "Tiramisu",
    fullname: "Classic Tiramisu",
    price: "$5.50",
    image: "./assets/images/image-tiramisu-desktop.jpg",
    quantity: 0,
    inCart: false,
  },
  {
    id: 5,
    name: "Baklava",
    fullname: "Pistachio Baklava",
    price: "$4.00",
    image: "./assets/images/image-baklava-desktop.jpg",
    quantity: 0,
    inCart: false,
  },
  {
    id: 6,
    name: "Pie",
    fullname: "Lemon Meringue Pie",
    price: "$5.00",
    image: "./assets/images/image-meringue-desktop.jpg",
    quantity: 0,
    inCart: false,
  },
  {
    id: 7,
    name: "Cake",
    fullname: "Red Velvet Cake",
    price: "$4.50",
    image: "./assets/images/image-cake-desktop.jpg",
    quantity: 0,
    inCart: false,
  },
  {
    id: 8,
    name: "Brownie",
    fullname: "Salted Caramel Brownie",
    price: "$5.50",
    image: "./assets/images/image-brownie-desktop.jpg",
    quantity: 0,
    inCart: false,
  },
  {
    id: 9,
    name: "Panna Cotta",
    fullname: "Vanilla Panna Cotta",
    price: "$6.50",
    image: "./assets/images/image-panna-cotta-desktop.jpg",
    quantity: 0,
    inCart: false,
  },
];

// Inject products into HTML
const container = document.querySelector(".grids");

// Wait until the DOM is loaded before executing the code
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".grids");
  const detailsContainer = document.querySelector(".product-details");

  // Ensure the product container exists
  if (!container) {
    console.error("Product container not found!");
    return;
  }

  // Loop through each product and inject it into the HTML
  products.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.className = "option";

    productElement.innerHTML = `
      <div class="background">
        <img class="centered-image" src="${product.image}" alt="${product.fullname}">
        <button class="add_button" onclick="addToCart(${index})">
          <img class="shop_icon" src="./assets/images/icon-add-to-cart.svg">
          <p class="add_to_cart">Add to Cart</p>
        </button>
      </div>
      <div class="product_data">
        <p class="name">${product.name}</p>
        <p class="fullname">${product.fullname}</p>
        <p class="price">${product.price}</p>
      </div>
    `;

    container.appendChild(productElement);
  });

  // Show product details when clicked
  window.showProductDetails = function (product) {
    if (detailsContainer) {
      const existingProduct = detailsContainer.querySelector(
        `[data-id="${product.id}"]`
      );
      if (existingProduct) {
        existingProduct.querySelector(
          ".quantity"
        ).textContent = `Quantity: ${product.quantity}`;
      } else {
        const productDetail = document.createElement("div");
        productDetail.className = "product-detail";
        productDetail.setAttribute("data-id", product.id); // Unique ID for each product

        productDetail.innerHTML = `
          <p><strong>Full Name:</strong> ${product.fullname}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p class="quantity">Quantity: ${product.quantity}</p>
          <button class="remove-btn" onclick="removeFromCart(${product.id})">
            <i class="fas fa-minus"></i> <!-- Minus icon for removal -->
          </button>
        `;

        detailsContainer.appendChild(productDetail);
      }

      detailsContainer.style.display = "block"; // Show the product details section
    } else {
      console.error("Product details container not found!");
    }
  };

  // Update the total item count in the cart
  function updateCartCount() {
    const totalItems = products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    document.getElementById("total").textContent = totalItems;

    const itemsContainer = document.querySelector(".items");
    itemsContainer.style.display = totalItems > 0 ? "none" : "block"; // Hide items if none are in the cart

    updateTotalPrice(); // Update the total price of all items
  }

  // Update the total price in the UI
  function updateTotalPrice() {
    const totalPrice = products.reduce((sum, product) => {
      const price = parseFloat(product.price.replace("$", ""));
      return sum + price * product.quantity;
    }, 0);

    document.getElementById(
      "total-price"
    ).textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  }

  // Add product to the cart
  window.addToCart = function (index) {
    const product = products[index];
    product.quantity += 1;
    product.inCart = true;

    updateCartUI(); // Update the cart UI
    updateCartCount(); // Update the total count and price
    showProductDetails(product); // Show the details of the added product
  };

  // Remove product from the cart
  window.removeFromCart = function (productId) {
    const product = products.find((p) => p.id === productId);

    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }

    if (product.quantity > 0) {
      product.quantity -= 1;
      if (product.quantity === 0) {
        product.inCart = false;
        // Remove product details if quantity is 0
        const productDetail = detailsContainer.querySelector(
          `[data-id="${productId}"]`
        );
        if (productDetail) {
          productDetail.remove();
        }

        // Hide details if no products are in the cart
        if (!detailsContainer.querySelector(".product-detail")) {
          detailsContainer.style.display = "none";
        }
      } else {
        // Update the displayed quantity
        const existingProduct = detailsContainer.querySelector(
          `[data-id="${productId}"]`
        );
        if (existingProduct) {
          existingProduct.querySelector(
            ".quantity"
          ).textContent = `Quantity: ${product.quantity}`;
        }
      }
    }

    updateCartUI(); // Update the cart UI
    updateCartCount(); // Update the total count and price
  };

  // Update the cart UI with current items
  function updateCartUI() {
    const cartContainer = document.querySelector(".slice2_countainer .items");
    cartContainer.innerHTML = "";

    const cartItems = products.filter(
      (product) => product.inCart && product.quantity > 0
    );

    if (cartItems.length > 0) {
      cartItems.forEach((product, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";

        itemElement.innerHTML = `
          <div class="cart-item-content">
            <p><strong>${product.fullname}</strong></p>
            <p>Price: ${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
          </div>
          <div class="cart-item-actions">
            <button onclick="addToCart(${index})">+</button>
            <button onclick="removeFromCart(${product.id})">-</button>
          </div>
        `;

        cartContainer.appendChild(itemElement);
      });
    } else {
      cartContainer.innerHTML = `
        <img class="cake" src="./assets/images/illustration-empty-cart.svg" alt="Empty Cart">
        <h6>Your added items will appear here</h6>
      `;
    }
  }
});
