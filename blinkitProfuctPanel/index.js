const LS_KEY = "blinkit_products";

// ── HELPERS ──────────────────────────────

function getProducts() {
  return JSON.parse(localStorage.getItem(LS_KEY)) || [];
}

function saveProducts(products) {
  localStorage.setItem(LS_KEY, JSON.stringify(products));
}

function generateId() {
  return "prod_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function calcDiscount(price, mrp) {
  if (!mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}

function renderProducts(filter = "", category = "") {
  const products = getProducts();
  const grid = document.getElementById("productGrid");
  const emptyState = document.getElementById("emptyState");
  const listingCount = document.getElementById("listingCount");
  const totalCount = document.getElementById("totalCount");

  // filter logic
  let filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(filter.toLowerCase()));
    const matchCat = category ? p.category === category : true;
    return matchSearch && matchCat;
  });

  // update counts
  totalCount.textContent = `${products.length} Product${products.length !== 1 ? "s" : ""}`;
  listingCount.textContent = filtered.length
    ? `Showing ${filtered.length} of ${products.length} product${products.length !== 1 ? "s" : ""}`
    : "No products match your filters";

  // clear old cards (keep empty state el)
  const oldCards = grid.querySelectorAll(".product-card");
  oldCards.forEach((c) => c.remove());

  // show/hide empty state
  emptyState.style.display = filtered.length === 0 ? "block" : "none";

  // render cards
  filtered.forEach((product, i) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.style.animationDelay = `${i * 40}ms`;

    const discount = calcDiscount(product.price, product.mrp);

    card.innerHTML = `
      <div class="card-top">
        <span class="card-category-badge">${product.category}</span>
        <span class="card-status ${product.inStock ? "in" : "out"}">
          ${product.inStock ? "● In Stock" : "○ Out of Stock"}
        </span>
      </div>

      <div>
        <div class="card-name">${product.name}</div>
        ${product.brand ? `<div class="card-brand">${product.brand}</div>` : ""}
      </div>

      <div class="card-pricing">
        <span class="card-price">₹${parseFloat(product.price).toFixed(2)}</span>
        ${product.mrp ? `<span class="card-mrp">₹${parseFloat(product.mrp).toFixed(2)}</span>` : ""}
        ${discount ? `<span class="card-discount">${discount}% off</span>` : ""}
      </div>

      <div class="card-meta-row">
        ${product.weight ? `<span>⚖️ ${product.weight}</span>` : ""}
        <span>📦 Qty: ${product.stock}</span>
      </div>

      ${product.description ? `<div class="card-desc">${product.description}</div>` : ""}

      <div class="card-actions">
        <button class="btn-edit" onclick="openEditModal('${product.id}')">✏️ Edit</button>
        <button class="btn-delete" onclick="deleteProduct('${product.id}')">🗑 Delete</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// add product
document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newProduct = {
    id: generateId(),
    name: document.getElementById("name").value.trim(),
    price: parseFloat(document.getElementById("price").value),
    mrp: parseFloat(document.getElementById("mrp").value) || null,
    category: document.getElementById("category").value,
    weight: document.getElementById("weight").value.trim(),
    stock: parseInt(document.getElementById("stock").value),
    brand: document.getElementById("brand").value.trim(),
    description: document.getElementById("description").value.trim(),
    inStock: document.getElementById("inStock").checked,
    createdAt: new Date().toISOString(),
  };

  const products = getProducts();
  products.unshift(newProduct); // latest first
  saveProducts(products);

  renderProducts(
    document.getElementById("searchInput").value,
    document.getElementById("filterCategory").value,
  );

  this.reset();
  document.getElementById("inStock").checked = true;

  showToast(`✅ "${newProduct.name}" added successfully!`);
});

// delete product
function deleteProduct(id) {
  const products = getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return;

  if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;

  const updated = products.filter((p) => p.id !== id);
  saveProducts(updated);

  renderProducts(
    document.getElementById("searchInput").value,
    document.getElementById("filterCategory").value,
  );

  showToast(`🗑 "${product.name}" deleted`);
}

// edit modal
function openEditModal(id) {
  const products = getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return;

  // populate modal fields
  document.getElementById("editId").value = product.id;
  document.getElementById("editName").value = product.name;
  document.getElementById("editPrice").value = product.price;
  document.getElementById("editMrp").value = product.mrp || "";
  document.getElementById("editCategory").value = product.category;
  document.getElementById("editWeight").value = product.weight || "";
  document.getElementById("editStock").value = product.stock;
  document.getElementById("editBrand").value = product.brand || "";
  document.getElementById("editDescription").value = product.description || "";
  document.getElementById("editInStock").checked = product.inStock;

  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("cancelEdit").addEventListener("click", closeModal);

// close on overlay click
document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// update
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("editId").value;
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return;

  // update the product in place
  products[index] = {
    ...products[index],
    name: document.getElementById("editName").value.trim(),
    price: parseFloat(document.getElementById("editPrice").value),
    mrp: parseFloat(document.getElementById("editMrp").value) || null,
    category: document.getElementById("editCategory").value,
    weight: document.getElementById("editWeight").value.trim(),
    stock: parseInt(document.getElementById("editStock").value),
    brand: document.getElementById("editBrand").value.trim(),
    description: document.getElementById("editDescription").value.trim(),
    inStock: document.getElementById("editInStock").checked,
    updatedAt: new Date().toISOString(),
  };

  saveProducts(products);
  closeModal();

  renderProducts(
    document.getElementById("searchInput").value,
    document.getElementById("filterCategory").value,
  );

  showToast(`✏️ "${products[index].name}" updated!`);
});

// search and filter

document.getElementById("searchInput").addEventListener("input", function () {
  renderProducts(this.value, document.getElementById("filterCategory").value);
});

document
  .getElementById("filterCategory")
  .addEventListener("change", function () {
    renderProducts(document.getElementById("searchInput").value, this.value);
  });

// initial products 
renderProducts();
