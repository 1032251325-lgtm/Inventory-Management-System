let products = [
    { id: 101, name: "Notebook", price: 50, quantity: 20 },
    { id: 102, name: "Keyboard", price: 700, quantity: 10 }
];

const form = document.getElementById("productForm");
const table = document.getElementById("inventoryTable");
const totalValue = document.getElementById("totalValue");
const searchInput = document.getElementById("searchInput");
const message = document.getElementById("message");

// 6. LocalStorage
const savedProducts = localStorage.getItem("inventoryProducts");

if (savedProducts) {
    products = JSON.parse(savedProducts);
}

function saveProducts() {
    localStorage.setItem("inventoryProducts", JSON.stringify(products));
}

function displayProducts(list = products) {
    table.innerHTML = "";
    let total = 0;

    for (let i = 0; i < list.length; i++) {
        const product = list[i];
        const stockValue = product.price * product.quantity;
        total += stockValue;

        const row = document.createElement("tr");

        row.innerHTML =
            "<td>" + product.id + "</td>" +
            "<td>" + product.name + "</td>" +
            "<td>₹" + product.price + "</td>" +
            "<td>" + product.quantity + "</td>" +
            "<td>₹" + stockValue + "</td>" +
            "<td>" +
            '<button class="action-btn purchase-btn" onclick="purchaseProduct(' + product.id + ')">Purchase</button>' +
            '<button class="action-btn edit-btn" onclick="editProduct(' + product.id + ')">Edit</button>' +
            '<button class="action-btn delete-btn" onclick="deleteProduct(' + product.id + ')">Delete</button>' +
            "</td>";

        table.appendChild(row);
    }

    totalValue.textContent = "Total Stock Value: ₹" + total;
}

// Add Product
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = Number(document.getElementById("productId").value);
    const name = document.getElementById("productName").value.trim();
    const price = Number(document.getElementById("productPrice").value);
    const quantity = Number(document.getElementById("productQuantity").value);

    const existingProduct = products.find(function(product) {
        return product.id === id;
    });

    if (existingProduct) {
        showMessage("Product ID already exists.", true);
        return;
    }

    products.push({ id, name, price, quantity });

    saveProducts();
    form.reset();
    displayProducts();
    showMessage("Product added successfully.", false);
});

// 1. Search Product
searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchText) ||
               String(product.id).includes(searchText);
    });

    displayProducts(filteredProducts);
});

// 2. Edit Product
function editProduct(id) {
    const product = products.find(function(item) {
        return item.id === id;
    });

    if (!product) return;

    const newName = prompt("Enter product name:", product.name);
    if (newName === null || newName.trim() === "") return;

    const newPrice = Number(prompt("Enter price:", product.price));
    const newQuantity = Number(prompt("Enter quantity:", product.quantity));

    if (!Number.isFinite(newPrice) || newPrice < 0 ||
        !Number.isInteger(newQuantity) || newQuantity < 0) {
        showMessage("Invalid product details.", true);
        return;
    }

    product.name = newName.trim();
    product.price = newPrice;
    product.quantity = newQuantity;

    saveProducts();
    displayProducts();
    showMessage("Product updated successfully.", false);
}

// 3. Delete Product
function deleteProduct(id) {
    const product = products.find(function(item) {
        return item.id === id;
    });

    if (!product) return;

    if (!confirm("Are you sure you want to delete " + product.name + "?")) {
        return;
    }

    products = products.filter(function(item) {
        return item.id !== id;
    });

    saveProducts();
    displayProducts();
    showMessage("Product deleted successfully.", false);
}

// 4. Purchase Product
function purchaseProduct(id) {
    const product = products.find(function(item) {
        return item.id === id;
    });

    if (!product) {
        showMessage("Product not found.", true);
        return;
    }

    const purchaseQuantity = Number(prompt("Enter quantity to purchase:"));

    if (!Number.isInteger(purchaseQuantity) || purchaseQuantity <= 0) {
        showMessage("Enter a valid quantity.", true);
        return;
    }

    if (purchaseQuantity > product.quantity) {
        showMessage("Insufficient stock.", true);
        return;
    }

    const purchaseTotal = product.price * purchaseQuantity;
    product.quantity -= purchaseQuantity;

    saveProducts();
    displayProducts();

    showMessage("Purchase successful. Total: ₹" + purchaseTotal, false);
}

function showMessage(text, error) {
    message.textContent = text;
    message.style.color = error ? "#dc2626" : "#15803d";
}

displayProducts();
