// Main JavaScript for GlobalMart

// Global state management
const AppState = {
    cart: [],
    wishlist: [],
    location: 'United States',
    currency: 'USD',
    language: 'en',
    isLoading: false
};

// Sample product data
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 1199,
        originalPrice: 1299,
        image: "spark-forge/images/iphone 15.avif",
        rating: 4.8,
        reviews: 1250,
        discount: 8,
        category: "Electronics",
        badge: "Hot Deal"
    },
    {
        id: 2,
        name: "Sony WH-1000XM5 Headphones",
        price: 349,
        originalPrice: 399,
        image: "spark-forge/images/Headphones.avif",
        rating: 4.9,
        reviews: 892,
        discount: 13,
        category: "Electronics",
        badge: "Best Seller"
    },
    {
        id: 3,
        name: "MacBook Pro 16-inch",
        price: 2199,
        originalPrice: 2499,
        image: "spark-forge/images/absolute.avif",
        rating: 4.7,
        reviews: 567,
        discount: 12,
        category: "Electronics",
        badge: "Premium"
    },
    {
        id: 4,
        name: "Designer Fashion Collection",
        price: 89,
        originalPrice: 129,
        image: "spark-forge/images/15.avif",
        rating: 4.6,
        reviews: 342,
        discount: 31,
        category: "Fashion",
        badge: "Trending"
    },
    {
        id: 5,
        name: "Home Essentials Bundle",
        price: 159,
        originalPrice: 199,
        image: "spark-forge/images/Essentials.avif",
        rating: 4.5,
        reviews: 445,
        discount: 20,
        category: "Home",
        badge: "Popular"
    },
    {
        id: 6,
        name: "Gaming Setup Complete",
        price: 899,
        originalPrice: 1199,
        image: "spark-forge/images/Gaming.avif",
        rating: 4.8,
        reviews: 678,
        discount: 25,
        category: "Gaming",
        badge: "Gamer's Choice"
    },
    {
        id: 7,
        name: "Travel Luggage Set",
        price: 229,
        originalPrice: 299,
        image: "spark-forge/images/Travele.avif",
        rating: 4.4,
        reviews: 234,
        discount: 23,
        category: "Travel",
        badge: "Adventure Ready"
    },
    {
        id: 8,
        name: "Luxury Jewelry Collection",
        price: 549,
        originalPrice: 699,
        image: "spark-forge/images/jewelry.avif",
        rating: 4.9,
        reviews: 156,
        discount: 21,
        category: "Jewelry",
        badge: "Luxury"
    }
];

// Utility functions
function formatPrice(price, currency = 'USD') {
    const symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'PKR': '₨'
    };

    return `${symbols[currency] || '$'}${price.toLocaleString()}`;
}

function calculateDiscount(originalPrice, salePrice) {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Product card generation
function createProductCard(product) {
    const discount = calculateDiscount(product.originalPrice, product.price);

    return `
        <div class="col">
            <div class="card product-card h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    <span class="badge bg-danger product-badge">${product.badge}</span>
                    <div class="product-actions">
                        <button class="btn btn-light btn-sm rounded-circle" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
                            <i class="bi bi-heart"></i>
                        </button>
                        <button class="btn btn-light btn-sm rounded-circle" onclick="quickView(${product.id})" title="Quick View">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <h6 class="card-title">${product.name}</h6>
                    <div class="d-flex align-items-center mb-2">
                        <div class="text-warning me-2">
                            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <small class="text-muted">(${product.reviews})</small>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <div>
                            <span class="h6 price-sale mb-0">${formatPrice(product.price, AppState.currency)}</span>
                            <small class="price-original ms-2">${formatPrice(product.originalPrice, AppState.currency)}</small>
                        </div>
                        <span class="discount-badge">${discount}% OFF</span>
                    </div>
                    <button class="btn btn-primary btn-sm w-100" onclick="addToCart(${product.id})">
                        <i class="bi bi-cart-plus me-1"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Cart management
function addToCart(productId) {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = AppState.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        AppState.cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showNotification(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    AppState.cart = AppState.cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartQuantity(productId, quantity) {
    const item = AppState.cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
        }
        updateCartUI();
    }
}

function updateCartUI() {
    const cartBadge = document.querySelector('.position-relative .badge');
    const cartTotal = document.querySelector('.ms-2.d-none.d-lg-inline');

    const itemCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartBadge) {
        cartBadge.textContent = itemCount;
        cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice, AppState.currency);
    }
}

// Wishlist management
function toggleWishlist(productId) {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = AppState.wishlist.findIndex(item => item.id === productId);

    if (existingIndex >= 0) {
        AppState.wishlist.splice(existingIndex, 1);
        showNotification(`${product.name} removed from wishlist`, 'info');
    } else {
        AppState.wishlist.push(product);
        showNotification(`${product.name} added to wishlist!`, 'success');
    }

    updateWishlistUI();
}

function updateWishlistUI() {
    const wishlistBadge = document.querySelector('a[href="/wishlist"] .badge');

    if (wishlistBadge) {
        wishlistBadge.textContent = AppState.wishlist.length;
        wishlistBadge.style.display = AppState.wishlist.length > 0 ? 'flex' : 'none';
    }
}

// Quick view functionality
function quickView(productId) {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Create and show modal
    const modalHtml = `
        <div class="modal fade" id="quickViewModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${product.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <span class="badge bg-primary">${product.category}</span>
                                    <span class="badge bg-danger ms-2">${product.badge}</span>
                                </div>
                                <div class="d-flex align-items-center mb-3">
                                    <div class="text-warning me-2">
                                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                    </div>
                                    <span class="text-muted">${product.rating} (${product.reviews} reviews)</span>
                                </div>
                                <div class="mb-3">
                                    <span class="h4 text-danger">${formatPrice(product.price, AppState.currency)}</span>
                                    <span class="text-muted text-decoration-line-through ms-2">${formatPrice(product.originalPrice, AppState.currency)}</span>
                                    <span class="badge bg-success ms-2">${product.discount}% OFF</span>
                                </div>
                                <p class="text-muted">High-quality ${product.category.toLowerCase()} product with excellent reviews and fast shipping worldwide.</p>
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary" onclick="addToCart(${product.id}); bootstrap.Modal.getInstance(document.getElementById('quickViewModal')).hide();">
                                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                                    </button>
                                    <button class="btn btn-outline-danger" onclick="toggleWishlist(${product.id})">
                                        <i class="bi bi-heart me-2"></i>Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('quickViewModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    modal.show();

    // Clean up after modal is hidden
    document.getElementById('quickViewModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notificationHtml = `
        <div class="toast align-items-center text-bg-${type} border-0 position-fixed" style="top: 20px; right: 20px; z-index: 9999;" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', notificationHtml);

    const toastElement = document.querySelector('.toast:last-child');
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', function () {
        this.remove();
    });
}

// Search functionality
function handleSearch(event) {
    event.preventDefault();
    const searchQuery = event.target.querySelector('.search-input').value.trim();

    if (searchQuery) {
        showNotification(`Searching for "${searchQuery}"...`, 'info');
        // In a real app, this would redirect to search results
        setTimeout(() => {
            showNotification(`Found products matching "${searchQuery}"`, 'success');
        }, 1000);
    }
}

// Location management
function updateLocation(newLocation) {
    AppState.location = newLocation;

    // Update all location displays
    const locationElements = [
        '#current-location',
        '#hero-location',
        '#recommended-location',
        '#footer-location'
    ];

    locationElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = newLocation;
        }
    });

    showNotification(`Delivery location updated to ${newLocation}`, 'success');
}

// Initialize flash sale products
function loadFlashSaleProducts() {
    const flashSaleContainer = document.getElementById('flash-products');
    if (!flashSaleContainer) return;

    const flashSaleProducts = SAMPLE_PRODUCTS.slice(0, 4);
    flashSaleContainer.innerHTML = flashSaleProducts.map(product => createProductCard(product)).join('');
}

// Initialize recommended products
function loadRecommendedProducts() {
    const recommendedContainer = document.getElementById('recommended-products');
    if (!recommendedContainer) return;

    const recommendedProducts = SAMPLE_PRODUCTS.slice(2, 8);
    recommendedContainer.innerHTML = recommendedProducts.map(product => createProductCard(product)).join('');
}

// Loading state management
function setLoading(isLoading) {
    AppState.isLoading = isLoading;

    const loadingElements = document.querySelectorAll('.btn');
    loadingElements.forEach(btn => {
        if (isLoading) {
            btn.disabled = true;
            if (!btn.querySelector('.loading-spinner')) {
                btn.insertAdjacentHTML('afterbegin', '<span class="loading-spinner me-2"></span>');
            }
        } else {
            btn.disabled = false;
            const spinner = btn.querySelector('.loading-spinner');
            if (spinner) {
                spinner.remove();
            }
        }
    });
}

// Newsletter subscription
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (email) {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            showNotification('Successfully subscribed to newsletter!', 'success');
            emailInput.value = '';
        }, 1500);
    }
}

// Authentication management
function checkAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail');

    const accountBtn = document.getElementById('account-text');
    const accountMenu = document.getElementById('account-menu');

    if (isLoggedIn) {
        accountBtn.textContent = userName;
        accountMenu.innerHTML = `
            <li><a class="dropdown-item" href="profile.html">
                <i class="bi bi-person me-2"></i>My Profile
            </a></li>
            <li><a class="dropdown-item" href="orders.html">
                <i class="bi bi-box me-2"></i>My Orders
            </a></li>
            <li><a class="dropdown-item" href="wishlist.html">
                <i class="bi bi-heart me-2"></i>My Wishlist
            </a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="seller-dashboard.html">
                <i class="bi bi-shop me-2"></i>Seller Dashboard
            </a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="logout.html">
                <i class="bi bi-box-arrow-right me-2"></i>Sign Out
            </a></li>
        `;
    } else {
        accountBtn.textContent = 'Account';
        accountMenu.innerHTML = `
            <li><a class="dropdown-item" href="login.html">
                <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
            </a></li>
            <li><a class="dropdown-item" href="register.html">
                <i class="bi bi-person-plus me-2"></i>Create Account
            </a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="seller-register.html">
                <i class="bi bi-shop me-2"></i>Become a Seller
            </a></li>
        `;
    }
}

// Language selector functionality
function initializeLanguageSelector() {
    const languageOptions = document.querySelectorAll('[data-language]');
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const language = this.dataset.language;
            const flag = this.querySelector('.me-2').textContent;

            // Update the button
            const languageBtn = document.querySelector('[data-bs-toggle="dropdown"] .me-2');
            if (languageBtn) {
                languageBtn.textContent = flag;
            }

            showNotification(`Language changed to ${language}`, 'success');
        });
    });
}

// Currency selector functionality
function initializeCurrencySelector() {
    const currencyOptions = document.querySelectorAll('[data-currency]');
    currencyOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const currency = this.dataset.currency;
            const symbol = this.querySelector('.me-2').textContent;

            // Update global currency
            AppState.currency = currency;

            // Update the button
            const currencyBtns = document.querySelectorAll('.dropdown-toggle');
            currencyBtns.forEach(btn => {
                if (btn.textContent.trim() === '$' || btn.textContent.includes('$')) {
                    btn.innerHTML = symbol + ' <i class="bi bi-chevron-down ms-1"></i>';
                }
            });

            // Update all prices on page
            updateAllPrices();

            showNotification(`Currency changed to ${currency}`, 'success');
        });
    });
}

// Update all prices when currency changes
function updateAllPrices() {
    // Re-render product cards with new currency
    loadFlashSaleProducts();
    loadRecommendedProducts();
    updateCartUI();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Load product data
    loadFlashSaleProducts();
    loadRecommendedProducts();

    // Set up search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }

    // Set up newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Set up location selectors
    const locationOptions = document.querySelectorAll('.location-option');
    locationOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const newLocation = this.dataset.location;
            updateLocation(newLocation);
        });
    });

    // Initialize carousel
    const carousel = document.getElementById('bannerCarousel');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    }

    // Initialize cart and wishlist UI
    updateCartUI();
    updateWishlistUI();

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .feature-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    console.log('GlobalMart initialized successfully!');
});

// Expose global functions for inline event handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleWishlist = toggleWishlist;
window.quickView = quickView;
window.updateLocation = updateLocation;
