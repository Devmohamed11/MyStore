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

// Filtrer les produits
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                             product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

// Ouvrir la fenêtre modale de détails du produit
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentProductId = productId;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.fullDescription;
    document.getElementById('modalProductPrice').textContent = `${product.price} DH`;
    quantityInput.value = 1;

    productModal.classList.add('show');
}

// Fermer la fenêtre modale
function closeModal() {
    productModal.classList.remove('show');
    currentProductId = null;
}

// Ajouter au panier depuis la fenêtre modale
function addToCart() {
    if (!currentProductId) return;

    const quantity = parseInt(quantityInput.value) || 1;
    cart.addItem(currentProductId, quantity);

    showNotification(`Produit ajouté au panier (${quantity} article(s))`);
    closeModal();
}

// Ajout rapide au panier
function quickAddToCart(productId) {
    cart.addItem(productId, 1);
    showNotification('Produit ajouté au panier');
}

// Afficher la notification
function showNotification(message) {
    // Créer la notification si elle n'existe pas
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
