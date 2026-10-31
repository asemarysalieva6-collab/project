const products = [
    {
        id: 1,
        name: "Бежевая рубашка",
        price: 1800,
        category: "Верх",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Классические брюки",
        price: 2500,
        category: "Низ",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Белая футболка",
        price: 1200,
        category: "Верх",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Повседневная обувь",
        price: 3200,
        category: "Обувь",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Джинсы",
        price: 2800,
        category: "Низ",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Повседневная рубашка",
        price: 2100,
        category: "Верх",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80"
    }
];

let cart = [];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function renderProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(search);
        const matchesCategory =
            category === "all" || product.category === category;

        return matchesName && matchesCategory;
    });

    productsContainer.innerHTML = filteredProducts.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>Категория: ${product.category}</p>
                <p class="product-price">${product.price} сом</p>
                <button onclick="addToCart(${product.id})">
                    Добавить в корзину
                </button>
            </div>
        </article>
    `).join("");

    if (filteredProducts.length === 0) {
        productsContainer.textContent = "Товары не найдены.";
    }
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (product) {
        cart.push(product);
        document.getElementById("cartCount").textContent = cart.length;
        alert("Товар добавлен в корзину!");
    }
}

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

document.getElementById("searchBtn").addEventListener("click", () => {
    searchInput.focus();
    document.getElementById("catalog").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("cartBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пока пустая.");
        return;
    }

    const cartText = cart
        .map(item => `${item.name} — ${item.price} сом`)
        .join("\n");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    alert(`${cartText}\n\nИтого: ${total} сом`);
});

renderProducts();