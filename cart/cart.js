// 初始化
function init() {
    showProducts();
    showCart();
}

// 显示商品
function showProducts() {
    const div = document.getElementById('products');
    div.innerHTML = db.products.map(p => `
        <div class="product">
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <div>${p.name}</div>
                <div>¥${p.price} (库存: ${p.stock})</div>
            </div>
            <button onclick="addCart(${p.id})" ${p.stock <= 0 ? 'disabled' : ''}>
                ${p.stock <= 0 ? '缺货' : '加入购物车'}
            </button>
        </div>
    `).join('');
}

// 添加到购物车
function addCart(id) {
    const product = db.products.find(p => p.id === id);
    const item = db.cart.find(c => c.productId === id);

    if (item) {
        if (item.quantity < product.stock) item.quantity++;
    } else {
        db.cart.push({ productId: id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    }
    showCart();
}

// 从购物车删除
function removeCart(id) {
    db.cart = db.cart.filter(c => c.productId !== id);
    showCart();
}

// 显示购物车
function showCart() {
    const div = document.getElementById('cart');
    const count = db.cart.reduce((sum, c) => sum + c.quantity, 0);
    const total = db.cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

    div.innerHTML = db.cart.length === 0 ? '<p>购物车是空的</p>' :
        db.cart.map(c => `
            <div class="cart-item">
                <img src="${c.image}" alt="${c.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                <span>${c.name} x ${c.quantity} = ¥${c.price * c.quantity}</span>
                <button onclick="removeCart(${c.productId})">删除</button>
            </div>
        `).join('');

    document.getElementById('count').textContent = count;
    document.getElementById('total').textContent = '总计: ¥' + total;
}

// 结账功能
function checkout() {
    if (db.cart.length === 0) {
        alert('购物车是空的，无法结账');
        return;
    }

    const total = db.cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
    if (confirm(`确认支付 ¥${total} 吗？`)) {
        alert('支付成功！');
        db.cart = []; // 清空购物车
        showCart(); // 更新显示
    }
}

// 页面加载时初始化
window.onload = init;
