// Données des Produits
const products = [
    {
        id: 1,
        name: "Casque Audio Sans Fil",
        category: "electronics",
        price: 299,
        image: "assets/images/headphones.jpg",
        description: "Casque audio de haute qualité avec technologie Bluetooth 5.0",
        fullDescription: "Casque audio sans fil professionnel offrant une qualité sonore exceptionnelle avec technologie Bluetooth 5.0 avancée. Doté d'une autonomie de batterie jusqu'à 30 heures et d'un design confortable pour une utilisation prolongée.",
        specs: [
            "Technologie Bluetooth 5.0",
            "Autonomie: 30 heures",
            "Poids: 250 grammes",
            "Compatibilité: Tous les appareils"
        ]
    },
    {
        id: 2,
        name: "Téléphone Intelligent 5G",
        category: "electronics",
        price: 1999,
        image: "assets/images/smartphone.jpg",
        description: "Téléphone intelligent moderne avec technologie 5G et caméra haute résolution",
        fullDescription: "Téléphone intelligent avancé combinant performance élevée et technologie 5G rapide. Équipé d'une caméra 108 mégapixels et d'un écran AMOLED 120Hz.",
        specs: [
            "Processeur Snapdragon 888",
            "RAM: 12 Go",
            "Stockage: 256 Go",
            "Caméra: 108 mégapixels"
        ]
    },
    {
        id: 3,
        name: "Montre Intelligente",
        category: "electronics",
        price: 599,
        image: "assets/images/smartwatch.jpg",
        description: "Montre intelligente avec surveillance de santé avancée",
        fullDescription: "Montre intelligente qui suit votre activité physique toute la journée avec surveillance du rythme cardiaque et de la qualité du sommeil. Écran AMOLED et autonomie de batterie longue.",
        specs: [
            "Écran AMOLED",
            "Surveillance du rythme cardiaque",
            "Suivi d'activité",
            "Autonomie: 14 jours"
        ]
    },
    {
        id: 4,
        name: "Chemise Décontractée",
        category: "clothing",
        price: 89,
        image: "assets/images/shirt.jpg",
        description: "Chemise décontractée confortable en coton 100%",
        fullDescription: "Chemise décontractée confectionnée en coton naturel 100% avec un design moderne et confortable. Disponible en plusieurs couleurs et tailles.",
        specs: [
            "Matière: Coton 100%",
            "Couleurs: Noir, Blanc, Bleu",
            "Tailles: XS - XXL",
            "Facile à entretenir"
        ]
    },
    {
        id: 5,
        name: "Jean Classique",
        category: "clothing",
        price: 149,
        image: "assets/images/jeans.jpg",
        description: "Jean classique de haute qualité",
        fullDescription: "Jean classique confectionné en denim de haute qualité. Doté d'un design intemporel et d'un confort optimal pour une utilisation quotidienne.",
        specs: [
            "Matière: Denim 100%",
            "Couleur: Bleu foncé",
            "Tailles: 28 - 40",
            "Résistant à la décoloration"
        ]
    },
    {
        id: 6,
        name: "Chaussure de Sport",
        category: "clothing",
        price: 199,
        image: "assets/images/shoes.jpg",
        description: "Chaussure de sport confortable pour la course et l'exercice",
        fullDescription: "Chaussure de sport spécialisée pour la course et l'exercice physique. Dotée de technologie d'absorption des chocs et d'une excellente ventilation.",
        specs: [
            "Technologie d'absorption des chocs",
            "Matière respirante",
            "Tailles: 36 - 46",
            "Poids léger"
        ]
    },
    {
        id: 7,
        name: "Livre: JavaScript Éloquent",
        category: "books",
        price: 79,
        image: "assets/images/js_book.jpg",
        description: "Livre complet pour apprendre la programmation en JavaScript",
        fullDescription: "Livre éducatif complet couvrant les bases et les techniques avancées de la programmation en JavaScript. Inclut des exemples pratiques et des exercices applicables.",
        specs: [
            "Nombre de pages: 450",
            "Langue: Français",
            "Éditeur: Éditions Techniques",
            "Année: 2023"
        ]
    },
    {
        id: 8,
        name: "Livre: Design Web",
        category: "books",
        price: 99,
        image: "assets/images/design_book.jpg",
        description: "Guide pratique pour concevoir des sites web professionnels",
        fullDescription: "Livre pratique expliquant les bases et techniques modernes de conception de sites web. Inclut des exemples de projets réels.",
        specs: [
            "Nombre de pages: 520",
            "Langue: Français",
            "Inclut des exemples pratiques",
            "Année: 2024"
        ]
    },
    {
        id: 9,
        name: "Livre: Marketing Numérique",
        category: "books",
        price: 119,
        image: "assets/images/marketing_book.jpg",
        description: "Stratégies modernes du marketing numérique",
        fullDescription: "Livre complet couvrant tous les aspects du marketing numérique, des réseaux sociaux à l'optimisation des moteurs de recherche.",
        specs: [
            "Nombre de pages: 480",
            "Langue: Français",
            "Inclut des études de cas",
            "Année: 2023"
        ]
    }
];

// Gestion du Panier
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const savedCart = localStorage.getItem('mystore_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        localStorage.setItem('mystore_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        return true;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getCartItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalItems = this.getTotalItems();
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
}

// Initialiser le panier
const cart = new ShoppingCart();
