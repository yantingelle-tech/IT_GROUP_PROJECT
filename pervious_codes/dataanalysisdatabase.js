// Add this to your existing db object in new_database.js
const db = {
    users: [
        { id: 1, username: 'customer1', password: '123456', role: 'customer', name: 'John Doe' },
        { id: 2, username: 'customer2', password: '123456', role: 'customer', name: 'Jane Smith' },  // NEW customer
        { id: 3, username: 'merchant', password: '123456', role: 'merchant', name: 'Merchant User' }
    ],

    products: [
        { id: 1, name: 'High-Performance Laptop', price: 5999, stock: 50, category: 'Computer', image: './img/laptop.webp', merchantId: 3 },
        { id: 2, name: 'Smart Phone', price: 3999, stock: 100, category: 'Phone', image: './img/smartphone.webp', merchantId: 3 },
        { id: 3, name: 'Wireless Headphones', price: 899, stock: 200, category: 'Audio', image: './img/headphone.webp', merchantId: 3 },
        { id: 4, name: 'Mechanical Keyboard', price: 499, stock: 150, category: 'Peripherals', image: './img/keyboard.webp', merchantId: 3 },
        { id: 5, name: 'Gaming Mouse', price: 299, stock: 180, category: 'Peripherals', image: './img/mouse.webp', merchantId: 3 },
        { id: 6, name: 'Smart Watch', price: 1299, stock: 80, category: 'Smart Device', image: './img/smartwatch.webp', merchantId: 3 }
    ],

    cart: [],

    orders: [
        // Orders for customer 1 (John)
        { id: 1, userId: 1, customerId: 1, customer: 'customer1', total: 5999, amount: 5999 },
        { id: 2, userId: 1, customerId: 1, customer: 'customer1', total: 899, amount: 899 },

        // Orders for customer 2 (Jane) - NEW
        { id: 3, userId: 2, customerId: 2, customer: 'customer2', total: 3999, amount: 3999 },
        { id: 4, userId: 2, customerId: 2, customer: 'customer2', total: 499, amount: 499 },
        { id: 5, userId: 2, customerId: 2, customer: 'customer2', total: 299, amount: 299 }
    ],

    reviews: [
        // Reviews for customer 1
        { id: 1, customerId: 1, username: 'customer1', rating: 5, merReply: 'Thank you for your purchase!' },
        { id: 2, customerId: 1, username: 'customer1', rating: 4, merReply: '' },

        // Reviews for customer 2 - NEW
        { id: 3, customerId: 2, username: 'customer2', rating: 5, merReply: 'Great choice!' }
    ],

    notifications: []
};
if (typeof window !== 'undefined') {
    window.db = db;
}

console.log('Database loaded successfully!', window.db);
