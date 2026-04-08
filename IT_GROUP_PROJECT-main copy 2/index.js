/* ============================================
   ShopEase — Unified Application
   All-in-one: Login, Products, Cart, Comments,
   Notifications, Chat, Payment, Analytics
   ============================================ */

// ─────────────────────────────────────────────
// SECTION 1: DATABASE & INITIALIZATION
// ─────────────────────────────────────────────

const DEFAULT_PRODUCTS = [
    { id: 1, name: 'High-Performance Laptop', price: 1299.99, stock: 50, category: 'electronics', image: 'img/laptop.webp', description: 'Powerful laptop with 16GB RAM and 512GB SSD, perfect for work and gaming.' },
    { id: 2, name: 'Latest Smartphone', price: 899.99, stock: 100, category: 'electronics', image: 'img/smartphone.webp', description: 'Flagship smartphone with OLED display, triple camera, and all-day battery.' },
    { id: 3, name: 'Wireless Headphones', price: 199.99, stock: 200, category: 'audio', image: 'img/headphone.webp', description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.' },
    { id: 4, name: 'Mechanical Keyboard', price: 129.99, stock: 150, category: 'peripherals', image: 'img/keyboard.webp', description: 'RGB mechanical keyboard with tactile switches and customizable backlighting.' },
    { id: 5, name: 'Gaming Mouse', price: 79.99, stock: 180, category: 'peripherals', image: 'img/mouse.webp', description: 'High-precision gaming mouse with adjustable DPI and ergonomic design.' },
    { id: 6, name: 'Smart Watch', price: 349.99, stock: 80, category: 'smart devices', image: 'img/smartwatch.webp', description: 'Fitness tracking smartwatch with heart rate monitor, GPS, and water resistance.' }
];

// Initialize database from localStorage
function initDB() {
    if (!localStorage.getItem('shopEase_initialized')) {
        localStorage.setItem('shopEase_users', JSON.stringify([]));
        localStorage.setItem('shopEase_products', JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem('shopEase_cart', JSON.stringify([]));
        localStorage.setItem('shopEase_orders', JSON.stringify([]));
        localStorage.setItem('shopEase_comments', JSON.stringify([]));
        localStorage.setItem('shopEase_notifications', JSON.stringify([]));
        localStorage.setItem('shopEase_chatMessages', JSON.stringify([]));
        localStorage.setItem('shopEase_returns', JSON.stringify([]));
        localStorage.setItem('shopEase_recentSearches', JSON.stringify([]));
        localStorage.setItem('shopEase_initialized', '1');
    }
}

// Helper: get/set
function getDB(key) {
    return JSON.parse(localStorage.getItem('shopEase_' + key) || '[]');
}

function setDB(key, data) {
    localStorage.setItem('shopEase_' + key, JSON.stringify(data));
}

// ─────────────────────────────────────────────
// SECTION 2: SESSION / CURRENT USER
// ─────────────────────────────────────────────

let currentUser = null;

function getSessionUser() {
    const data = sessionStorage.getItem('shopEase_currentUser');
    return data ? JSON.parse(data) : null;
}

function setSessionUser(user) {
    if (user) {
        sessionStorage.setItem('shopEase_currentUser', JSON.stringify(user));
    } else {
        sessionStorage.removeItem('shopEase_currentUser');
    }
    currentUser = user;
}

function restoreSession() {
    const user = getSessionUser();
    if (user) {
        currentUser = user;
        updateNavbar();
    }
}

// ─────────────────────────────────────────────
// SECTION 3: NAVIGATION & UI
// ─────────────────────────────────────────────

function updateNavbar() {
    const user = currentUser;
    const userBtnText = document.getElementById('userBtnText');
    const userMenu = document.getElementById('userMenuContent');
    const cartBadge = document.getElementById('cartBadge');
    const notifBadge = document.getElementById('notifBadge');

    if (user) {
        userBtnText.innerHTML = `${user.username} <span class="role-badge ${user.role}">${user.role}</span>`;
        userMenu.innerHTML = `
            <div style="padding:10px 16px;font-size:12px;color:#999;border-bottom:1px solid #eee;">
                Signed in as <strong>${user.username}</strong>
            </div>
            ${user.role === 'merchant' ? '<a href="#" onclick="goToSection(\'addProduct\')">Add Product</a>' : ''}
            ${user.role === 'merchant' ? '<a href="#" onclick="goToSection(\'analytics\')">Data Analysis</a>' : ''}
            <a href="#" onclick="goToSection(\'chat\')">Customer Service</a>
            <div class="dropdown-divider"></div>
            <button onclick="doLogout()">Logout</button>
        `;

        // Update chat merchant panel visibility
        const chatMerchantPanel = document.getElementById('chatMerchantPanel');
        if (user.role === 'merchant') {
            chatMerchantPanel.classList.add('active');
        } else {
            chatMerchantPanel.classList.remove('active');
        }

        // Show merchant sections
        const analyticsSection = document.getElementById('analyticsSection');
        const addProductSection = document.getElementById('addProductSection');
        if (user.role === 'merchant') {
            analyticsSection.classList.add('visible');
            addProductSection.classList.add('visible');
        } else {
            analyticsSection.classList.remove('visible');
            addProductSection.classList.remove('visible');
        }
    } else {
        userBtnText.textContent = 'Login';
        userMenu.innerHTML = `
            <a href="#" onclick="openAuthModal('login')">Login</a>
            <a href="#" onclick="openAuthModal('register')">Create Account</a>
        `;
        document.getElementById('chatMerchantPanel').classList.remove('active');
        document.getElementById('analyticsSection').classList.remove('visible');
        document.getElementById('addProductSection').classList.remove('visible');
    }

    updateCartBadge();
    updateNotifBadge();
}

function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('active');
    event.stopPropagation();
}

// Close user menu when clicking outside
document.addEventListener('click', function(e) {
    const menu = document.getElementById('userMenu');
    const dropdown = document.getElementById('userDropdown');
    if (menu && dropdown && !dropdown.contains(e.target)) {
        menu.classList.remove('active');
    }
});

function goHome() {
    goToSection('home');
    renderProducts();
}

function goToSection(section) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById(section + 'Section');
    if (sec) sec.classList.add('active');

    if (section === 'chat') {
        document.getElementById('homeSection').classList.remove('active');
    }
    if (section === 'analytics') {
        renderAnalytics();
    }

    // Close dropdown
    document.getElementById('userMenu').classList.remove('active');
}

// ─────────────────────────────────────────────
// SECTION 4: TOAST NOTIFICATIONS
// ─────────────────────────────────────────────

function showToast(msg, type = 'default') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ─────────────────────────────────────────────
// SECTION 5: PRODUCT RENDERING & GRID
// ─────────────────────────────────────────────

let currentCategory = 'all';

function renderProducts(products) {
    const grid = document.getElementById('productGrid');
    if (!products) {
        products = getDB('products');
        if (currentCategory !== 'all') {
            products = products.filter(p => p.category === currentCategory);
        }
    }

    if (products.length === 0) {
        grid.innerHTML = '<div class="no-products">No products found. Try a different search or category.</div>';
        return;
    }

    grid.innerHTML = products.map(p => {
        const stockClass = p.stock <= 5 ? 'low' : '';
        const stockText = p.stock === 0 ? 'Out of stock' : `${p.stock} in stock`;
        return `
            <div class="product-card" onclick="openProductDetail(${p.id})">
                <div class="product-image-wrap">
                    <img src="${p.image}" alt="${p.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect fill=%22%23eee%22 width=%22100%22 height=%22100%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2212%22>No Image</text></svg>'">
                    <span class="product-stock-badge ${stockClass}">${stockText}</span>
                </div>
                <div class="product-info">
                    <div class="product-name">${escapeHtml(p.name)}</div>
                    <div class="product-price">$${p.price.toFixed(2)}</div>
                    <div class="product-actions" onclick="event.stopPropagation()">
                        <button class="btn-add-cart" onclick="quickAddToCart(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>
                            ${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button class="btn-detail" onclick="openProductDetail(${p.id})">Details</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterByCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts();
}

// ─────────────────────────────────────────────
// SECTION 6: PRODUCT DETAIL MODAL & COMMENTS
// ─────────────────────────────────────────────

function openProductDetail(productId) {
    const products = getDB('products');
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const comments = getDB('comments').filter(c => c.productId === productId);
    const user = currentUser;

    let commentFormHTML = '';
    if (!user) {
        commentFormHTML = `
            <div class="comment-login-prompt">
                <a onclick="closeDetailModal();openAuthModal('login');">Login</a> to post a comment or review.
            </div>
        `;
    } else if (user.role === 'customer') {
        commentFormHTML = `
            <div class="comment-form-wrap">
                <div class="comment-form-title">Post a Review</div>
                <div class="form-group">
                    <label>Your Rating</label>
                    <div class="star-rating" id="detailStarRating">
                        <button class="star-btn filled" onclick="setRating(1)">&#9733;</button>
                        <button class="star-btn filled" onclick="setRating(2)">&#9733;</button>
                        <button class="star-btn filled" onclick="setRating(3)">&#9733;</button>
                        <button class="star-btn" onclick="setRating(4)">&#9733;</button>
                        <button class="star-btn" onclick="setRating(5)">&#9733;</button>
                    </div>
                </div>
                <div class="form-group">
                    <textarea id="detailCommentText" rows="3" placeholder="Share your thoughts about this product..."></textarea>
                </div>
                <button class="btn-primary" onclick="postCustomerComment(${productId})">Submit Review</button>
            </div>
        `;
    } else if (user.role === 'merchant') {
        const commentOptions = comments.length === 0
            ? '<option value="">No comments yet</option>'
            : comments.map(c => `<option value="${c.id}">#${c.id} - ${escapeHtml(c.productName)} (Rating: ${c.rating} stars)</option>`).join('');
        commentFormHTML = `
            <div class="comment-form-wrap">
                <div class="comment-form-title">Reply to Customer Review</div>
                <div class="form-group">
                    <label>Select Comment</label>
                    <select id="detailMerCommentId">${commentOptions}</select>
                </div>
                <div class="form-group">
                    <textarea id="detailMerReply" rows="3" placeholder="Write your reply..."></textarea>
                </div>
                <button class="btn-secondary" onclick="postMerchantReply()">Submit Reply</button>
            </div>
        `;
    }

    let commentsHTML = '';
    if (comments.length === 0) {
        commentsHTML = '<p style="color:#999;font-size:13px;text-align:center;padding:10px;">No reviews yet. Be the first to review!</p>';
    } else {
        commentsHTML = comments.map(c => `
            <div class="comment-item">
                <div class="comment-customer">${escapeHtml(c.customerId)} &nbsp;<span class="comment-stars">${'&#9733;'.repeat(c.rating)}</span></div>
                <div class="comment-text">${escapeHtml(c.customerComment)}</div>
                <div class="comment-time">${new Date(c.timestamp).toLocaleString()}</div>
                ${c.merchantReply ? `
                    <div class="comment-merchant">
                        <div class="comment-merchant-label">Merchant Reply</div>
                        <div class="comment-text">${escapeHtml(c.merchantReply)}</div>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    document.getElementById('detailBody').innerHTML = `
        <div class="detail-content">
            <img class="detail-image" src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22280%22><rect fill=%22%23eee%22 width=%22280%22 height=%22280%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2214%22>No Image</text></svg>'">
            <div class="detail-info">
                <h2>${escapeHtml(product.name)}</h2>
                <div class="detail-price">$${product.price.toFixed(2)}</div>
                <div class="detail-meta">Category: ${escapeHtml(product.category)}</div>
                <div class="detail-meta">Stock: ${product.stock > 0 ? product.stock + ' available' : '<span style="color:#f56565">Out of stock</span>'}</div>
                ${product.description ? `<div class="detail-desc">${escapeHtml(product.description)}</div>` : ''}
                <div class="detail-actions">
                    <button class="btn-primary" onclick="quickAddToCart(${product.id});closeDetailModal();" ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <button class="btn-secondary" onclick="quickAddToCart(${product.id});closeDetailModal();openCart();">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
        <div class="comments-section">
            <h4>Reviews (${comments.length})</h4>
            ${commentFormHTML}
            <div class="comment-list">${commentsHTML}</div>
        </div>
    `;

    window.detailSelectedRating = 3;
    document.getElementById('detailModal').classList.add('active');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

function setRating(n) {
    window.detailSelectedRating = n;
    const stars = document.querySelectorAll('#detailStarRating .star-btn');
    stars.forEach((btn, i) => {
        btn.classList.toggle('filled', i < n);
    });
}

function postCustomerComment(productId) {
    const text = document.getElementById('detailCommentText').value.trim();
    if (!text) {
        showToast('Please enter a comment.', 'error');
        return;
    }
    const products = getDB('products');
    const product = products.find(p => p.id === productId);
    const comments = getDB('comments');
    const newComment = {
        id: Date.now(),
        productId: productId,
        productName: product.name,
        customerId: currentUser.username,
        rating: window.detailSelectedRating || 3,
        customerComment: text,
        merchantReply: '',
        timestamp: Date.now()
    };
    comments.push(newComment);
    setDB('comments', comments);

    // Notify merchant
    sendNotification('merchant', 'New Review', `${currentUser.username} reviewed "${product.name}"`, `Rating: ${window.detailSelectedRating || 3} stars. "${text}"`);

    showToast('Review posted successfully!', 'success');
    document.getElementById('detailCommentText').value = '';
    openProductDetail(productId);
}

function postMerchantReply() {
    const commentId = parseInt(document.getElementById('detailMerCommentId').value);
    const reply = document.getElementById('detailMerReply').value.trim();
    if (!commentId || !reply) {
        showToast('Please select a comment and enter a reply.', 'error');
        return;
    }
    const comments = getDB('comments');
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
        comment.merchantReply = reply;
        setDB('comments', comments);
        sendNotification(comment.customerId, 'customer', 'Merchant Replied', `Merchant replied to your review on "${comment.productName}": "${reply}"`);
        showToast('Reply posted successfully!', 'success');
        document.getElementById('detailMerReply').value = '';
        openProductDetail(comment.productId);
    }
}

// ─────────────────────────────────────────────
// SECTION 7: SEARCH WITH RECENT SUGGESTIONS
// ─────────────────────────────────────────────

const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');

searchInput.addEventListener('input', function() {
    const recent = getDB('recentSearches');
    const val = this.value.trim().toLowerCase();

    if (!val) {
        renderRecentSuggestions(recent);
        searchSuggestions.classList.add('active');
        return;
    }

    // Filter recent searches that match
    const filtered = recent.filter(s => s.toLowerCase().includes(val));
    if (filtered.length > 0) {
        searchSuggestions.innerHTML = filtered.map(s =>
            `<div class="suggestion-item" onclick="useSuggestion('${escapeHtml(s)}')">${escapeHtml(s)}</div>`
        ).join('') + '<div class="suggestion-item suggestion-clear" onclick="clearRecentSearches()">Clear recent searches</div>';
        searchSuggestions.classList.add('active');
    } else {
        searchSuggestions.classList.remove('active');
    }
});

searchInput.addEventListener('focus', function() {
    const recent = getDB('recentSearches');
    if (recent.length > 0) {
        renderRecentSuggestions(recent);
        searchSuggestions.classList.add('active');
    }
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-search-container')) {
        searchSuggestions.classList.remove('active');
    }
});

function renderRecentSuggestions(recent) {
    searchSuggestions.innerHTML = recent.slice(0, 5).map(s =>
        `<div class="suggestion-item" onclick="useSuggestion('${escapeHtml(s)}')">${escapeHtml(s)}</div>`
    ).join('') + '<div class="suggestion-item suggestion-clear" onclick="clearRecentSearches()">Clear recent searches</div>';
}

function useSuggestion(term) {
    searchInput.value = term;
    searchSuggestions.classList.remove('active');
    performSearch();
}

function clearRecentSearches() {
    setDB('recentSearches', []);
    searchSuggestions.classList.remove('active');
    showToast('Recent searches cleared', 'success');
}

function performSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) {
        renderProducts();
        return;
    }

    // Save to recent searches
    let recent = getDB('recentSearches');
    recent = recent.filter(s => s.toLowerCase() !== keyword);
    recent.unshift(keyword);
    recent = recent.slice(0, 5);
    setDB('recentSearches', recent);

    const products = getDB('products');
    const results = products.filter(p =>
        p.name.toLowerCase().includes(keyword) ||
        p.category.toLowerCase().includes(keyword)
    );
    renderProducts(results);
    searchSuggestions.classList.remove('active');
}

// ─────────────────────────────────────────────
// SECTION 8: CART
// ─────────────────────────────────────────────

function updateCartBadge() {
    const cart = getDB('cart');
    const badge = document.getElementById('cartBadge');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (total > 0) {
        badge.textContent = total;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function quickAddToCart(productId) {
    if (!currentUser) {
        showToast('Please login first!', 'error');
        openAuthModal('login');
        return;
    }

    const products = getDB('products');
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) {
        showToast('Product is out of stock!', 'error');
        return;
    }

    const cart = getDB('cart');
    const existing = cart.find(c => c.productId === productId);
    if (existing) {
        if (existing.quantity < product.stock) {
            existing.quantity++;
        } else {
            showToast('Maximum stock reached!', 'error');
            return;
        }
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    setDB('cart', cart);
    updateCartBadge();
    showToast(`"${product.name}" added to cart!`, 'success');
}

function openCart() {
    renderCart();
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartBackdrop').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartBackdrop').style.display = 'none';
}

function renderCart() {
    const cart = getDB('cart');
    const itemsEl = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    const countEl = document.getElementById('cartSidebarCount');

    countEl.textContent = cart.reduce((s, i) => s + i.quantity, 0);

    if (cart.length === 0) {
        itemsEl.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        footer.style.display = 'none';
        return;
    }

    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22><rect fill=%22%23eee%22 width=%2260%22 height=%2260%22/></svg>'">
            <div class="cart-item-info">
                <div class="cart-item-name">${escapeHtml(item.name)}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="changeCartQty(${item.productId}, -1)">-</button>
                    <span class="qty-num">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeCartQty(${item.productId}, 1)">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.productId})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cartTotalAmount').textContent = '$' + total.toFixed(2);
    footer.style.display = 'block';
}

function changeCartQty(productId, delta) {
    const cart = getDB('cart');
    const item = cart.find(c => c.productId === productId);
    const products = getDB('products');
    const product = products.find(p => p.id === productId);
    if (!item || !product) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart.splice(cart.indexOf(item), 1);
    } else if (item.quantity > product.stock) {
        showToast('Maximum stock reached!', 'error');
        item.quantity = product.stock;
    }
    setDB('cart', cart);
    renderCart();
    updateCartBadge();
}

function removeFromCart(productId) {
    let cart = getDB('cart');
    cart = cart.filter(c => c.productId !== productId);
    setDB('cart', cart);
    renderCart();
    updateCartBadge();
    showToast('Item removed from cart', 'success');
}

function goToCheckout() {
    closeCart();
    openPaymentModal();
}

// ─────────────────────────────────────────────
// SECTION 9: PAYMENT
// ─────────────────────────────────────────────

function openPaymentModal() {
    const cart = getDB('cart');
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderItems = cart.map(item => `${item.name} x${item.quantity}`).join(', ');

    document.getElementById('paymentBody').innerHTML = `
        <div id="paymentForm">
            <div class="payment-summary">
                <div class="payment-summary-row">
                    <span>Items</span>
                    <span>${cart.length} product(s)</span>
                </div>
                <div class="payment-summary-row total">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            </div>
            <div class="form-group">
                <label>Payment Method</label>
                <select id="paymentMethod">
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="apple_pay">Apple Pay</option>
                    <option value="google_pay">Google Pay</option>
                    <option value="alipay">Alipay</option>
                    <option value="wechat_pay">WeChat Pay</option>
                </select>
            </div>
            <div class="form-group">
                <label>Card Number</label>
                <input type="text" id="paymentCard" placeholder="1234 5678 9012 3456" maxlength="19">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Expiry</label>
                    <input type="text" id="paymentExpiry" placeholder="MM/YY" maxlength="5">
                </div>
                <div class="form-group">
                    <label>CVV</label>
                    <input type="text" id="paymentCvv" placeholder="123" maxlength="4">
                </div>
            </div>
            <button class="btn-primary" onclick="processPayment('${escapeHtml(orderItems)}', ${total.toFixed(2)})">Pay $${total.toFixed(2)}</button>
        </div>
    `;
    document.getElementById('paymentModal').classList.add('active');
}

function processPayment(orderItems, total) {
    const method = document.getElementById('paymentMethod').value;
    const card = document.getElementById('paymentCard').value.trim();
    const expiry = document.getElementById('paymentExpiry').value.trim();
    const cvv = document.getElementById('paymentCvv').value.trim();

    if (!card || card.length < 13) {
        showToast('Please enter a valid card number.', 'error');
        return;
    }

    // Create order
    const cart = getDB('cart');
    const products = getDB('products');
    const orders = getDB('orders');

    const order = {
        id: 'ORD-' + Date.now(),
        userId: currentUser.username,
        items: cart.map(item => ({ ...item })),
        total: total,
        paymentMethod: method,
        status: 'Processing',
        date: new Date().toLocaleString()
    };
    orders.push(order);
    setDB('orders', orders);

    // Reduce stock
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            product.stock = Math.max(0, product.stock - item.quantity);
        }
    });
    setDB('products', products);

    // Clear cart
    setDB('cart', []);

    // Show success
    document.getElementById('paymentBody').innerHTML = `
        <div class="payment-success">
            <div class="big-icon">&#10004;</div>
            <h4>Payment Successful!</h4>
            <p style="color:#666;font-size:14px;">Order ID: <strong>${order.id}</strong></p>
            <p style="color:#666;font-size:13px;margin-top:6px;">Total paid: <strong>$${total.toFixed(2)}</strong></p>
            <p style="color:#999;font-size:12px;margin-top:4px;">Payment method: ${method.replace('_', ' ')}</p>
            <button class="btn-primary" style="margin-top:20px;" onclick="closePaymentModal();renderProducts();updateCartBadge();">Continue Shopping</button>
        </div>
    `;

    // Notify
    sendNotification(currentUser.username, currentUser.role, 'Order Confirmed', `Your order ${order.id} for $${total.toFixed(2)} has been placed!`);

    updateCartBadge();
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

// ─────────────────────────────────────────────
// SECTION 10: NOTIFICATIONS
// ─────────────────────────────────────────────

function updateNotifBadge() {
    const notifs = getDB('notifications').filter(n => n.userId === (currentUser ? currentUser.username : '') && !n.isRead);
    const badge = document.getElementById('notifBadge');
    if (notifs.length > 0) {
        badge.textContent = notifs.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function openNotifications() {
    renderNotifications();
    document.getElementById('notifPanel').classList.add('active');
    document.getElementById('notifBackdrop').style.display = 'block';
}

function closeNotifications() {
    document.getElementById('notifPanel').classList.remove('active');
    document.getElementById('notifBackdrop').style.display = 'none';
}

function renderNotifications() {
    const notifs = getDB('notifications');
    const userNotifs = notifs.filter(n => n.userId === (currentUser ? currentUser.username : ''))
        .sort((a, b) => b.id - a.id);

    const listEl = document.getElementById('notifList');
    if (userNotifs.length === 0) {
        listEl.innerHTML = '<div class="notif-empty">No notifications yet</div>';
        return;
    }

    listEl.innerHTML = userNotifs.map(n => `
        <div class="notif-item ${n.isRead ? '' : 'unread'}" onclick="markNotifRead(${n.id})">
            <div class="notif-title">${escapeHtml(n.title)}</div>
            <div class="notif-msg">${escapeHtml(n.message)}</div>
            <div class="notif-time">${new Date(n.id).toLocaleString()}</div>
        </div>
    `).join('');
}

function markNotifRead(notifId) {
    const notifs = getDB('notifications');
    const notif = notifs.find(n => n.id === notifId);
    if (notif) {
        notif.isRead = true;
        setDB('notifications', notifs);
        updateNotifBadge();
    }
}

function sendNotification(userId, userType, title, message) {
    const notifs = getDB('notifications');
    notifs.push({
        id: Date.now(),
        userId: userId,
        userType: userType,
        title: title,
        message: message,
        isRead: false
    });
    setDB('notifications', notifs);
    updateNotifBadge();
}

// ─────────────────────────────────────────────
// SECTION 11: CUSTOMER SERVICE CHAT
// ─────────────────────────────────────────────

function sendChatMsg() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    if (!currentUser) {
        showToast('Please login first!', 'error');
        return;
    }

    addChatBubble(text, 'user');
    input.value = '';

    setTimeout(() => {
        const reply = getChatAutoResponse(text);
        addChatBubble(reply, 'support');
        const messages = getDB('chatMessages');
        messages.push({ text, sender: 'user', time: getChatTime() });
        messages.push({ text: reply, sender: 'support', time: getChatTime() });
        setDB('chatMessages', messages.slice(-50));
    }, 600);
}

function sendMerchantChat() {
    const input = document.getElementById('merchantChatInput');
    const text = input.value.trim();
    if (!text) return;
    if (!currentUser || currentUser.role !== 'merchant') {
        showToast('Only merchants can reply!', 'error');
        return;
    }

    addChatBubble(text, 'merchant');
    input.value = '';
    const messages = getDB('chatMessages');
    messages.push({ text, sender: 'merchant', time: getChatTime() });
    setDB('chatMessages', messages.slice(-50));
}

function addChatBubble(text, sender) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-message ' + sender;
    div.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div><div class="chat-time">${getChatTime()}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function getChatTime() {
    const d = new Date();
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
}

function getChatAutoResponse(msg) {
    const m = msg.toLowerCase();
    if (m.includes('order')) return "Please provide your order number and I'll help track it.";
    if (m.includes('return')) return "Use the cart checkout to request a return. Our team will process it within 1-3 days.";
    if (m.includes('shipping')) return "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 days.";
    if (m.includes('payment')) return "We accept Credit Card, PayPal, Apple Pay, Google Pay, Alipay, and WeChat Pay.";
    if (m.includes('hello') || m.includes('hi')) return "Hello! How can I help you today?";
    return "Thanks for your message! Our team will get back to you shortly. You can also call us at 1800-123-456.";
}

function loadChatHistory() {
    const messages = getDB('chatMessages');
    const container = document.getElementById('chatMessages');
    container.innerHTML = '<div class="chat-message support"><div class="chat-bubble">Hello! How can I help you today?<br><small>Type "shipping", "return", or "order" for quick help.</small></div><div class="chat-time">Just now</div></div>';
    messages.slice(-20).forEach(m => {
        addChatBubble(m.text, m.sender);
    });
}

// ─────────────────────────────────────────────
// SECTION 12: AUTHENTICATION (LOGIN/REGISTER)
// ─────────────────────────────────────────────

function openAuthModal(tab) {
    switchAuthTab(tab || 'login');
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');

    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
}

function doLogin() {
    const id = document.getElementById('loginId').value.trim();
    const pwd = document.getElementById('loginPwd').value;
    const msg = document.getElementById('loginMsg');

    if (!id || !pwd) {
        showAuthMsg(msg, 'Please enter both ID and password.', 'error');
        return;
    }

    const users = getDB('users');
    const user = users.find(u => u.id === id && u.password === pwd);
    if (!user) {
        showAuthMsg(msg, 'Invalid ID or password.', 'error');
        return;
    }

    setSessionUser(user);
    closeAuthModal();
    updateNavbar();
    renderProducts();
    showToast(`Welcome back, ${user.username}!`, 'success');
}

function doRegister() {
    const id = document.getElementById('regId').value.trim();
    const pwd = document.getElementById('regPwd').value;
    const pwd2 = document.getElementById('regPwd2').value;
    const email = document.getElementById('regEmail').value.trim();
    const role = document.getElementById('regRole').value;
    const msg = document.getElementById('registerMsg');

    if (!id || !pwd || !email) {
        showAuthMsg(msg, 'All fields are required.', 'error');
        return;
    }
    if (pwd !== pwd2) {
        showAuthMsg(msg, 'Passwords do not match.', 'error');
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        showAuthMsg(msg, 'Invalid email format.', 'error');
        return;
    }

    const users = getDB('users');
    if (users.find(u => u.id === id)) {
        showAuthMsg(msg, 'This ID is already taken.', 'error');
        return;
    }

    const newUser = { id, password: pwd, email, role };
    users.push(newUser);
    setDB('users', users);
    setSessionUser(newUser);
    closeAuthModal();
    updateNavbar();
    renderProducts();
    showToast(`Account created! Welcome, ${id}!`, 'success');
}

function showAuthMsg(el, text, type) {
    el.textContent = text;
    el.className = 'auth-msg ' + type;
}

function doLogout() {
    setSessionUser(null);
    currentUser = null;
    document.getElementById('userMenu').classList.remove('active');
    updateNavbar();
    renderProducts();
    showToast('Logged out successfully', 'success');
}

// ─────────────────────────────────────────────
// SECTION 13: MERCHANT ADD PRODUCT
// ─────────────────────────────────────────────

function merchantAddProduct() {
    if (!currentUser || currentUser.role !== 'merchant') return;

    const name = document.getElementById('merProductName').value.trim();
    const price = parseFloat(document.getElementById('merProductPrice').value);
    const stock = parseInt(document.getElementById('merProductStock').value);
    const category = document.getElementById('merProductCategory').value;
    const image = document.getElementById('merProductImage').value.trim();
    const desc = document.getElementById('merProductDesc').value.trim();

    if (!name || isNaN(price) || isNaN(stock)) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    const products = getDB('products');
    const newProduct = {
        id: Date.now(),
        name,
        price,
        stock,
        category,
        image: image || 'img/placeholder.webp',
        description: desc
    };
    products.push(newProduct);
    setDB('products', products);

    // Clear form
    document.getElementById('merProductName').value = '';
    document.getElementById('merProductPrice').value = '';
    document.getElementById('merProductStock').value = '';
    document.getElementById('merProductImage').value = '';
    document.getElementById('merProductDesc').value = '';

    renderProducts();
    showToast(`"${name}" added successfully!`, 'success');
}

// ─────────────────────────────────────────────
// SECTION 14: DATA ANALYSIS (MERCHANT)
// ─────────────────────────────────────────────

function renderAnalytics() {
    const users = getDB('users');
    const orders = getDB('orders');
    const comments = getDB('comments');
    const products = getDB('products');

    const customers = users.filter(u => u.role === 'customer');
    const merchants = users.filter(u => u.role === 'merchant');

    // Revenue
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    // Avg rating
    const avgRating = comments.length > 0
        ? (comments.reduce((sum, c) => sum + (c.rating || 0), 0) / comments.length).toFixed(1)
        : '0.0';

    // Response rate
    const responded = comments.filter(c => c.merchantReply && c.merchantReply.trim()).length;
    const responseRate = comments.length > 0
        ? ((responded / comments.length) * 100).toFixed(1) + '%'
        : '0%';

    // Top spenders
    const userSpending = {};
    orders.forEach(o => {
        userSpending[o.userId] = (userSpending[o.userId] || 0) + (o.total || 0);
    });
    const topSpenders = Object.entries(userSpending)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, amount]) => ({ name, amount: amount.toFixed(2) }));

    const grid = document.getElementById('analyticsGrid');
    grid.innerHTML = `
        <div class="analytics-card">
            <div class="label">Total Customers</div>
            <div class="value info">${customers.length}</div>
        </div>
        <div class="analytics-card">
            <div class="label">Total Merchants</div>
            <div class="value">${merchants.length}</div>
        </div>
        <div class="analytics-card">
            <div class="label">Total Products</div>
            <div class="value">${products.length}</div>
        </div>
        <div class="analytics-card">
            <div class="label">Total Orders</div>
            <div class="value">${orders.length}</div>
        </div>
        <div class="analytics-card">
            <div class="label">Total Revenue</div>
            <div class="value highlight">$${totalRevenue.toFixed(2)}</div>
        </div>
        <div class="analytics-card">
            <div class="label">Total Reviews</div>
            <div class="value">${comments.length}</div>
        </div>
        <div class="analytics-card">
            <div class="label">Avg Rating</div>
            <div class="value">${avgRating} / 5</div>
        </div>
        <div class="analytics-card">
            <div class="label">Response Rate</div>
            <div class="value success">${responseRate}</div>
        </div>
        ${topSpenders.length > 0 ? `
        <div class="analytics-card" style="grid-column: 1/-1;">
            <div class="label">Top Customers (by spending)</div>
            ${topSpenders.map((s, i) => `<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0;color:#333;"><span>${i + 1}. ${escapeHtml(s.name)}</span><strong style="color:var(--primary)">$${s.amount}</strong></div>`).join('')}
        </div>
        ` : ''}
    `;
}

// ─────────────────────────────────────────────
// SECTION 15: UTILITY
// ─────────────────────────────────────────────

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ─────────────────────────────────────────────
// SECTION 16: BOOTSTRAP ON PAGE LOAD
// ─────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', function() {
    initDB();
    restoreSession();
    renderProducts();
    loadChatHistory();
    updateNavbar();
});

// Also handle Enter key on auth inputs
document.addEventListener('keypress', function(e) {
    if (e.target.tagName === 'INPUT') {
        if (e.key === 'Enter') {
            if (e.target.closest('#loginForm')) doLogin();
            if (e.target.closest('#registerForm')) doRegister();
        }
    }
});
