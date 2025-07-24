// Component helper functions for GlobalMart

// Advanced search functionality
class SearchManager {
    constructor() {
        this.searchHistory = this.loadSearchHistory();
        this.suggestions = [
            'iPhone 15', 'MacBook Pro', 'Headphones', 'Fashion', 'Home Decor',
            'Gaming Laptop', 'Smart Watch', 'Jewelry', 'Books', 'Travel Bags'
        ];
    }

    loadSearchHistory() {
        try {
            return JSON.parse(localStorage.getItem('searchHistory') || '[]');
        } catch {
            return [];
        }
    }

    saveSearch(query) {
        this.searchHistory.unshift(query);
        this.searchHistory = [...new Set(this.searchHistory)].slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }

    getSuggestions(query) {
        const lowerQuery = query.toLowerCase();
        return this.suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(lowerQuery)
        ).slice(0, 5);
    }

    initializeSearchDropdown() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;

        // Remove existing dropdown if any
        const existingDropdown = document.querySelector('.search-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }

        // Create dropdown element
        const dropdown = document.createElement('div');
        dropdown.className = 'search-dropdown d-none';
        dropdown.style.cssText = `
            position: absolute !important;
            top: calc(100% + 5px) !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 9999 !important;
            background: white !important;
            border: 1px solid #e5e7eb !important;
            border-radius: 8px !important;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2) !important;
            max-height: 300px !important;
            overflow-y: auto !important;
        `;

        // Ensure parent has proper positioning
        const searchForm = searchInput.closest('.search-form');
        if (searchForm) {
            searchForm.style.position = 'relative';
            searchForm.style.zIndex = '1005';
            searchForm.appendChild(dropdown);
        }

        // Show/hide dropdown
        searchInput.addEventListener('focus', () => this.showSearchDropdown(dropdown, ''));
        searchInput.addEventListener('input', (e) => this.showSearchDropdown(dropdown, e.target.value));
        searchInput.addEventListener('blur', () => {
            setTimeout(() => dropdown.classList.add('d-none'), 150);
        });
    }

    showSearchDropdown(dropdown, query) {
        const suggestions = query ? this.getSuggestions(query) : this.searchHistory;

        if (suggestions.length === 0) {
            dropdown.classList.add('d-none');
            return;
        }

        dropdown.innerHTML = suggestions.map(suggestion => `
            <div class="dropdown-item search-suggestion px-3 py-2" data-suggestion="${suggestion}">
                <i class="bi bi-search me-2"></i>${suggestion}
            </div>
        `).join('');

        dropdown.classList.remove('d-none');

        // Add click handlers
        dropdown.querySelectorAll('.search-suggestion').forEach(item => {
            item.addEventListener('click', () => {
                const suggestion = item.dataset.suggestion;
                document.querySelector('.search-input').value = suggestion;
                this.saveSearch(suggestion);
                dropdown.classList.add('d-none');
            });
        });
    }
}

// Shopping cart manager
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.cartSidebar = null;
        this.initializeCartSidebar();
    }

    loadCart() {
        try {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        } catch {
            return [];
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartUI();
    }

    addItem(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }

        this.saveCart();
        this.showCartSidebar();
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCartSidebar();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.renderCartSidebar();
            }
        }
    }

    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    initializeCartSidebar() {
        const cartSidebarHtml = `
            <div class="offcanvas offcanvas-end" id="cartSidebar" tabindex="-1">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">Shopping Cart</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <div class="offcanvas-body p-0">
                    <div id="cart-items" class="p-3"></div>
                    <div class="cart-footer border-top p-3 mt-auto">
                        <div class="d-flex justify-content-between mb-3">
                            <strong>Total: <span id="cart-total">$0.00</span></strong>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary">Checkout</button>
                            <button class="btn btn-outline-primary" data-bs-dismiss="offcanvas">Continue Shopping</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', cartSidebarHtml);
        this.cartSidebar = new bootstrap.Offcanvas(document.getElementById('cartSidebar'));
        this.renderCartSidebar();
    }

    showCartSidebar() {
        this.renderCartSidebar();
        this.cartSidebar.show();
    }

    renderCartSidebar() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart display-1 text-muted"></i>
                    <p class="text-muted mt-3">Your cart is empty</p>
                    <button class="btn btn-primary" data-bs-dismiss="offcanvas">Start Shopping</button>
                </div>
            `;
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item border-bottom py-3">
                    <div class="row align-items-center">
                        <div class="col-3">
                            <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                        </div>
                        <div class="col-6">
                            <h6 class="mb-1">${item.name}</h6>
                            <p class="text-muted mb-1">${formatPrice(item.price)}</p>
                            <div class="input-group input-group-sm" style="width: 100px;">
                                <button class="btn btn-outline-secondary" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                <button class="btn btn-outline-secondary" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <div class="col-3 text-end">
                            <button class="btn btn-link text-danger p-0" onclick="cartManager.removeItem(${item.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        cartTotal.textContent = formatPrice(this.getTotal());
    }

    updateCartUI() {
        const cartBadge = document.querySelector('a[href="/cart"] .badge');
        const cartTotal = document.querySelector('a[href="/cart"] .ms-2');

        if (cartBadge) {
            const itemCount = this.getItemCount();
            cartBadge.textContent = itemCount;
            cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';
        }

        if (cartTotal) {
            cartTotal.textContent = formatPrice(this.getTotal());
        }
    }
}

// Wishlist manager
class WishlistManager {
    constructor() {
        this.wishlist = this.loadWishlist();
    }

    loadWishlist() {
        try {
            return JSON.parse(localStorage.getItem('wishlist') || '[]');
        } catch {
            return [];
        }
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistUI();
    }

    toggleItem(product) {
        const existingIndex = this.wishlist.findIndex(item => item.id === product.id);

        if (existingIndex >= 0) {
            this.wishlist.splice(existingIndex, 1);
            showNotification(`${product.name} removed from wishlist`, 'info');
        } else {
            this.wishlist.push(product);
            showNotification(`${product.name} added to wishlist!`, 'success');
        }

        this.saveWishlist();
        return existingIndex < 0; // Return true if added, false if removed
    }

    isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId);
    }

    updateWishlistUI() {
        const wishlistBadge = document.querySelector('a[href="/wishlist"] .badge');

        if (wishlistBadge) {
            wishlistBadge.textContent = this.wishlist.length;
            wishlistBadge.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
        }

        // Update heart icons
        document.querySelectorAll('[onclick^="toggleWishlist"]').forEach(btn => {
            const productId = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
            const heartIcon = btn.querySelector('i');
            if (this.isInWishlist(productId)) {
                heartIcon.classList.remove('bi-heart');
                heartIcon.classList.add('bi-heart-fill');
                btn.classList.add('text-danger');
            } else {
                heartIcon.classList.remove('bi-heart-fill');
                heartIcon.classList.add('bi-heart');
                btn.classList.remove('text-danger');
            }
        });
    }
}

// Product comparison manager
class ComparisonManager {
    constructor() {
        this.compareList = [];
        this.maxCompareItems = 4;
    }

    addToCompare(product) {
        if (this.compareList.length >= this.maxCompareItems) {
            showNotification(`You can only compare up to ${this.maxCompareItems} items`, 'warning');
            return false;
        }

        if (this.compareList.find(item => item.id === product.id)) {
            showNotification(`${product.name} is already in comparison`, 'info');
            return false;
        }

        this.compareList.push(product);
        showNotification(`${product.name} added to comparison`, 'success');
        this.updateCompareUI();
        return true;
    }

    removeFromCompare(productId) {
        this.compareList = this.compareList.filter(item => item.id !== productId);
        this.updateCompareUI();
    }

    clearCompare() {
        this.compareList = [];
        this.updateCompareUI();
    }

    updateCompareUI() {
        // Update compare button visibility
        const compareButtons = document.querySelectorAll('.compare-btn');
        compareButtons.forEach(btn => {
            btn.style.display = this.compareList.length > 0 ? 'block' : 'none';
        });
    }

    showComparisonModal() {
        if (this.compareList.length < 2) {
            showNotification('Add at least 2 products to compare', 'warning');
            return;
        }

        // Create comparison modal
        const modalHtml = `
            <div class="modal fade" id="comparisonModal" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Product Comparison</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            ${this.compareList.map(product => `
                                                <th class="text-center">
                                                    <img src="${product.image}" alt="${product.name}" class="img-thumbnail mb-2" style="width: 100px;">
                                                    <br><strong>${product.name}</strong>
                                                </th>
                                            `).join('')}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Price</strong></td>
                                            ${this.compareList.map(product => `
                                                <td class="text-center">
                                                    <span class="h5 text-danger">${formatPrice(product.price)}</span>
                                                    <br><small class="text-muted text-decoration-line-through">${formatPrice(product.originalPrice)}</small>
                                                </td>
                                            `).join('')}
                                        </tr>
                                        <tr>
                                            <td><strong>Rating</strong></td>
                                            ${this.compareList.map(product => `
                                                <td class="text-center">
                                                    <div class="text-warning">${'★'.repeat(Math.floor(product.rating))}</div>
                                                    <small>${product.rating} (${product.reviews} reviews)</small>
                                                </td>
                                            `).join('')}
                                        </tr>
                                        <tr>
                                            <td><strong>Discount</strong></td>
                                            ${this.compareList.map(product => `
                                                <td class="text-center">
                                                    <span class="badge bg-success">${product.discount}% OFF</span>
                                                </td>
                                            `).join('')}
                                        </tr>
                                        <tr>
                                            <td><strong>Actions</strong></td>
                                            ${this.compareList.map(product => `
                                                <td class="text-center">
                                                    <button class="btn btn-primary btn-sm mb-1" onclick="addToCart(${product.id})">Add to Cart</button>
                                                    <br><button class="btn btn-outline-danger btn-sm" onclick="comparisonManager.removeFromCompare(${product.id})">Remove</button>
                                                </td>
                                            `).join('')}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" onclick="comparisonManager.clearCompare()">Clear All</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal
        const existingModal = document.getElementById('comparisonModal');
        if (existingModal) existingModal.remove();

        // Add and show modal
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = new bootstrap.Modal(document.getElementById('comparisonModal'));
        modal.show();
    }
}

// Filter and sort manager
class FilterManager {
    constructor() {
        this.filters = {
            category: '',
            priceRange: [0, 10000],
            rating: 0,
            brand: '',
            inStock: true
        };
        this.sortBy = 'relevance'; // relevance, price-low, price-high, rating, newest
    }

    applyFilters(products) {
        return products.filter(product => {
            if (this.filters.category && product.category !== this.filters.category) return false;
            if (product.price < this.filters.priceRange[0] || product.price > this.filters.priceRange[1]) return false;
            if (product.rating < this.filters.rating) return false;
            return true;
        });
    }

    sortProducts(products) {
        const sorted = [...products];

        switch (this.sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return sorted.sort((a, b) => b.id - a.id);
            default:
                return sorted; // relevance
        }
    }

    updateFilter(filterName, value) {
        this.filters[filterName] = value;
        this.refreshProducts();
    }

    updateSort(sortBy) {
        this.sortBy = sortBy;
        this.refreshProducts();
    }

    refreshProducts() {
        // This would trigger a re-render of the product list
        const event = new CustomEvent('filtersChanged', {
            detail: { filters: this.filters, sortBy: this.sortBy }
        });
        document.dispatchEvent(event);
    }
}

// Initialize all managers
let searchManager, cartManager, wishlistManager, comparisonManager, filterManager;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    searchManager = new SearchManager();
    cartManager = new CartManager();
    wishlistManager = new WishlistManager();
    comparisonManager = new ComparisonManager();
    filterManager = new FilterManager();

    // Initialize search dropdown
    searchManager.initializeSearchDropdown();

    // Update initial UI
    cartManager.updateCartUI();
    wishlistManager.updateWishlistUI();

    // Set up cart link to open sidebar instead of navigation
    const cartLink = document.querySelector('a[href="/cart"]');
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            cartManager.showCartSidebar();
        });
    }

    console.log('Component managers initialized successfully!');
});

// Expose managers globally for inline event handlers
window.searchManager = () => searchManager;
window.cartManager = cartManager;
window.wishlistManager = () => wishlistManager;
window.comparisonManager = () => comparisonManager;
window.filterManager = () => filterManager;

// Update global functions to use managers
window.addToCart = function(productId) {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (product) {
        cartManager.addItem(product);
    }
};

window.toggleWishlist = function(productId) {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (product) {
        wishlistManager.toggleItem(product);
    }
};
