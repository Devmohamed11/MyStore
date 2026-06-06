// Éléments DOM
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const productModal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close');
const addToCartBtn = document.getElementById('addToCartBtn');
const quantityInput = document.getElementById('quantityInput');

let currentProductId = null;

// Initialiser
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    cart.updateCartCount();
    setupEventListeners();
});

// Configurer les écouteurs d'événements
function setupEventListeners() {
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    closeBtn.addEventListener('click', closeModal);
    addToCartBtn.addEventListener('click', addToCart);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModal();
        }
    });
}

// Afficher les produits
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Aucun produit ne correspond à votre recherche</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Créer une carte de produit
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-body">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price} DH</p>
            <div class="product-footer">
                <button class="btn btn-primary btn-flex" onclick="openProductDetail(${product.id})">Voir les détails</button>
                <button class="btn btn-secondary btn-flex" onclick="quickAddToCart(${product.id})">Ajouter</button>
            </div>
        </div>
    `;
    return card;
}

// Obtenir le nom de la catégorie
function getCategoryName(category) {
    const categoryNames = {
        electronics: 'Électronique',
        clothing: 'Vêtements',
        books: 'Livres'
    };
    return categoryNames[category] || category;
}
