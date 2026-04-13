// 模拟数据库
const db = {
  // 用户数据
  users: [
    { id: 1, username: 'customer', password: '123456', role: 'customer', name: '普通用户' },
    { id: 2, username: 'merchant', password: '123456', role: 'merchant', name: '商家用户' }
  ],
  // 产品数据
  products: [
    { id: 1, name: '高性能笔记本电脑', price: 5999, stock: 50, category: '电脑', image: '../img/laptop.jpg' },
    { id: 2, name: '最新智能手机', price: 3999, stock: 100, category: '手机', image: '../img/smartphone.jpg' },
    { id: 3, name: '无线蓝牙耳机', price: 899, stock: 200, category: '音频', image: '../img/headphones.jpg' },
    { id: 4, name: '机械键盘', price: 499, stock: 150, category: '外设', image: '../img/keyboard.jpg' },
    { id: 5, name: '游戏鼠标', price: 299, stock: 180, category: '外设', image: '../img/mouse.jpg' },
    { id: 6, name: '智能手表', price: 1299, stock: 80, category: '智能设备', image: '../img/smartwatch.jpg' }
  ],
  // 购物车数据
  cart: [],
  // 订单数据
  orders: [],
  // 评论数据
  reviews: [],
  // 通知数据
  notifications: []
};

// 页面加载时初始化
if (typeof window !== 'undefined') {
  window.onload = init;
}