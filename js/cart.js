// Éléments DOM
const cartItemsContainer = document.getElementById('cartItemsContainer');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const totalItemsEl = document.getElementById('totalItems');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialiser
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartSummary();
    cart.updateCartCount();
    setupCheckout();
});

// Afficher les articles du panier
function displayCartItems() {
    const cartItems = cart.getCartItems();

    if (cartItems.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        return;
    }

    cartItemsContainer.style.display = 'block';
    emptyCartMessage.style.display = 'none';
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItem);
    });
}

// Créer un élément d'article du panier
function createCartItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p class="cart-item-price">${item.price} DH</p>
            <p>Prix total: <strong>${item.price * item.quantity} DH</strong></p>
        </div>
        <div class="cart-item-actions">
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${item.id})">−</button>
                <input type="number" value="${item.quantity}" readonly>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Supprimer</button>
        </div>
    `;
    return itemElement;
}

// Augmenter la quantité
function increaseQuantity(productId) {
    const item = cart.items.find(item => item.id === productId);
    if (item) {
        cart.updateQuantity(productId, item.quantity + 1);
        displayCartItems();
        updateCartSummary();
    }
}

// Diminuer la quantité
function decreaseQuantity(productId) {
    const item = cart.items.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        cart.updateQuantity(productId, item.quantity - 1);
        displayCartItems();
        updateCartSummary();
    }
}

// Supprimer du panier
function removeFromCart(productId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit du panier?')) {
        cart.removeItem(productId);
        displayCartItems();
        updateCartSummary();
    }
}

// Mettre à jour le résumé du panier
function updateCartSummary() {
    const totalItems = cart.getTotalItems();
    const subtotal = cart.getTotalPrice();
    const total = subtotal;

    totalItemsEl.textContent = totalItems;
    subtotalEl.textContent = `${subtotal.toFixed(2)} DH`;
    totalEl.textContent = `${total.toFixed(2)} DH`;

    // Désactiver le paiement si le panier est vide
    checkoutBtn.disabled = totalItems === 0;
}

// Configurer le paiement
function setupCheckout() {
    checkoutBtn.addEventListener('click', () => {
        const total = cart.getTotalPrice();
        alert(`Merci! Total de la commande: ${total.toFixed(2)} DH\n\nVous serez redirigé vers la page de paiement bientôt.`);
    });
}

// Mise à jour automatique du panier lorsque le stockage change
window.addEventListener('storage', () => {
    cart.items = cart.loadCart();
    displayCartItems();
    updateCartSummary();
});
