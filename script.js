const products = [
    { id: 1, name: "ARIANA GRANDe HOODIE", price: 30, img: "images/arianahoodie.jpg", categories: ["women"] },
    { id: 2, name: "yes,and? totebag", price: 25, img: "images/yesandtote.png", categories: ["accessories"] },
    { id: 3, name: "printed t-shirt= always late but worth the wait~", price: 22, img: "images/tshirtprintlate.jpg", categories: ["men", "women" ] },
    { id: 4, name: "NYC Baseball stylish jacket", price: 38, img: "images/nycjacket.jpg", categories: ["men", "women"] },
    { id: 5, name: "Vintage Wide-leg blue jeans", price: 25, img: "images/widelegblue.jpg", categories: ["women"] },
    { id: 6, name: "Srtriped cat ears hanging star beanie", price: 20, img: "images/catearsbeanie.jpg", categories: ["accessories"] }
];

const grid = document.getElementById("product-grid");

function showProducts(list) {
    grid.innerHTML = "";
    list.forEach(function (item) {
    grid.innerHTML += `
        <div class="card">
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <button data-id="${item.id}">Add to cart</button>
        </div>
        `;
    });
}

showProducts(products);

let cart = JSON.parse(localStorage.getItem("Cart")) || [];

function addToCart(id) {
    const found = products.find(function (p) {
        return p.id === id;
    }); 
    cart.push(found);
    document.getElementById("cart-count").textContent = cart.length;
    cart.push(found);
    saveCart();
    document.getElementById("cart-count").textContent = cart.length;
    renderCart();
}

grid.addEventListener("click", function (e) {
    if 
    (e.target.tagName === "BUTTON") {
        addToCart(Number(e.target.dataset.id));
    }
});

function renderCart() {
    const list = document.getElementById("cart-items");
    let total = 0;
    list.innerHTML = "";
    cart.forEach(function (item) {
        list.innerHTML += `<li>${item.name} - $${item.price}</li>`;
        total += item.price;
    });
    document.getElementById("cart-total").textContent = total;
}

document.getElementById("cart-btn").addEventListener("click", function () {
    document.getElementById("cart-panel").classList.toggle("hidden");
});

document.getElementById("checkout-btn").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("thanks for your order!");
    cart = [];
    saveCart();
    document.getElementById("cart-count").textContent = 0;
    renderCart();
});

const filters = document.getElementById("filters");

filters.addEventListener("click", function (e) {
    if (e.target.tagName != "BUTTON") return;

    const choice = e.target.dataset.filter;
    let list;

    if (choice === "all") {
        list = products;
    } else if (choice === "outside") {
        list = products.filter(function (p) { return p.place === "outside"; });
    } else {
        list = products.filter(function (p) { return p.categories.includes(choice); });
    }

    showProducts(list);
    document.body.classList.toggle("outside-mode", choice === "outside");
});

function saveCart() {
    localStorage.setItem("Cart", JSON.stringify(cart));
}

document.getElementById("cart-count").textContent = cart.length;
renderCart();