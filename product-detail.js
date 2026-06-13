// Éléments DOM
const detailProductImage = document.getElementById('detailProductImage');
const detailProductName = document.getElementById('detailProductName');
const detailProductPrice = document.getElementById('detailProductPrice');
const detailProductDescription = document.getElementById('detailProductDescription');
const specsList = document.getElementById('specsList');
const detailQuantity = document.getElementById('detailQuantity');
const detailAddToCartBtn = document.getElementById('detailAddToCartBtn');
const relatedProductsContainer = document.getElementById('relatedProductsContainer');
const notification = document.getElementById('notification');

let currentProductId = null;

// Initialiser
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    
    loadProductDetail(productId);
    cart.updateCartCount();
    setupEventListeners();
});

// Configurer les écouteurs d'événements
function setupEventListeners() {
    detailAddToCartBtn.addEventListener('click', addToCart);
}

// Charger les détails du produit
function loadProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    currentProductId = productId;

    // Mettre à jour le contenu de la page
    detailProductImage.src = product.image;
    detailProductImage.alt = product.name;
    detailProductName.textContent = product.name;
    detailProductPrice.textContent = `${product.price} DH`;
    detailProductDescription.textContent = product.fullDescription;

    // Charger les caractéristiques
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });

    // Charger les produits connexes
    loadRelatedProducts(productId, product.category);

    // Mettre à jour le titre de la page
    document.title = `${product.name} - MyStore`;
}

// Charger les produits connexes
function loadRelatedProducts(currentProductId, category) {
    const relatedProducts = products.filter(p => 
        p.category === category && p.id !== currentProductId
    ).slice(0, 4);

    relatedProductsContainer.innerHTML = '';

    if (relatedProducts.length === 0) {
        relatedProductsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Aucun produit connexe</p>';
        return;
    }

    relatedProducts.forEach(product => {
        const card = createRelatedProductCard(product);
        relatedProductsContainer.appendChild(card);
    });
}

// Créer une carte de produit connexe
function createRelatedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-body">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price} DH</p>
            <div class="product-footer">
                <button class="btn btn-primary btn-flex" onclick="goToProduct(${product.id})">Voir les détails</button>
                <button class="btn btn-secondary btn-flex" onclick="quickAddToCart(${product.id})">Ajouter</button>
            </div>
        </div>
    `;
    return card;
}

// Aller aux détails du produit
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Ajout rapide au panier
function quickAddToCart(productId) {
    cart.addItem(productId, 1);
    showNotification('Produit ajouté au panier');
}

// Ajouter au panier
function addToCart() {
    if (!currentProductId) return;

    const quantity = parseInt(detailQuantity.value) || 1;
    
    if (quantity <= 0) {
        showNotification('La quantité doit être supérieure à zéro', 'error');
        return;
    }

    cart.addItem(currentProductId, quantity);
    showNotification(`${quantity} article(s) ajouté(s) au panier`);
    
    // Réinitialiser la quantité
    detailQuantity.value = 1;
}

// Afficher la notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.style.backgroundColor = type === 'error' ? '#e74c3c' : '#27ae60';
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === detailQuantity) {
        addToCart();
    }
});
