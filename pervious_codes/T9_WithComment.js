// combine with other database file or keep it
// ============================================
// DATABASE MODULE / 資料庫模組
// Handles all data storage and retrieval
// 處理所有資料儲存和檢索
// Other group members will complete this with actual database connection
// 其他組員將完成此部分並連接實際資料庫
// ============================================

/**
 * Database Module - In-memory storage for demo
 * 資料庫模組 - 示範用的記憶體儲存
 * English: Simple JavaScript object that simulates database operations
 * Chinese: 模擬資料庫操作的簡單 JavaScript 物件
 * To be replaced with actual database implementation by other team members
 * 將由其他組員替換為實際資料庫實作
 */
var Database = (function() {
    // ============================================
    // PRIVATE STORAGE ARRAYS / 私有儲存陣列
    // In-memory storage for different data types
    // 不同資料類型的記憶體儲存
    // ============================================
    
    /**
     * Chat messages storage / 聊天訊息儲存
     * Stores all chat conversations
     * 儲存所有聊天對話
     */
    var chatMessages = [];
    
    /**
     * Returns storage / 退貨儲存
     * Stores all return requests
     * 儲存所有退貨申請
     */
    var returns = [];
    
    /**
     * Users storage / 用戶儲存
     * Stores user accounts for login system
     * 儲存登入系統的用戶帳戶
     * To be implemented by other group members
     * 將由其他組員實作
     */
    var users = [];
    
    /**
     * Orders storage / 訂單儲存
     * Stores order information
     * 儲存訂單資訊
     * To be implemented by other group members
     * 將由其他組員實作
     */
    var orders = [];
    
    // ============================================
    // PUBLIC METHODS / 公開方法
    // Methods accessible from outside the module
    // 可從模組外部存取的方法
    // ============================================
    
    return {
        // ========================================
        // CHAT METHODS / 聊天方法
        // Methods for handling chat messages
        // 處理聊天訊息的方法
        // ========================================
        
        /**
         * Save chat message to database
         * 儲存聊天訊息到資料庫
         * @param {Object} message - Message object with text, sender, time
         * @returns {boolean} Success status / 成功狀態
         */
        saveChatMessage: function(message) {
            chatMessages.push(message);
            console.log('Chat message saved:', message);
            return true;
        },
        
        /**
         * Get all chat messages
         * 獲取所有聊天訊息
         * @returns {Array} Array of chat messages / 聊天訊息陣列
         */
        getChatMessages: function() {
            return chatMessages;
        },
        
        /**
         * Get chat messages for a specific user
         * 獲取特定用戶的聊天訊息
         * @param {string} userId - User identifier / 用戶識別碼
         * @returns {Array} Filtered chat messages / 過濾後的聊天訊息
         */
        getUserChatMessages: function(userId) {
            // To be implemented / 待實作
            return chatMessages.filter(function(msg) {
                return msg.userId === userId;
            });
        },
        
        /**
         * Get all chat messages (alias for getChatMessages)
         * 獲取所有聊天訊息（別名）
         * @returns {Array} Array of chat messages / 聊天訊息陣列
         */
        getAllChatMessages: function() {
            return chatMessages;
        },
        
        /**
         * Clear all chat messages (for testing)
         * 清除所有聊天訊息（測試用）
         */
        clearChatMessages: function() {
            chatMessages = [];
            console.log('All chat messages cleared');
        },
        
        // ========================================
        // RETURN METHODS / 退貨方法
        // Methods for handling return requests
        // 處理退貨申請的方法
        // ========================================
        
        /**
         * Save return request to database
         * 儲存退貨申請到資料庫
         * @param {Object} returnData - Return request object / 退貨申請物件
         * @returns {boolean} Success status / 成功狀態
         */
        saveReturn: function(returnData) {
            returns.push(returnData);
            console.log('Return saved:', returnData);
            return true;
        },
        
        /**
         * Get all return requests
         * 獲取所有退貨申請
         * @returns {Array} Array of return requests / 退貨申請陣列
         */
        getReturns: function() {
            return returns;
        },
        
        /**
         * Update return status by ID
         * 根據ID更新退貨狀態
         * @param {string} returnId - Return request ID / 退貨申請ID
         * @param {string} newStatus - New status value / 新狀態值
         * @returns {boolean} Success status / 成功狀態
         */
        updateReturn: function(returnId, newStatus) {
            for (var i = 0; i < returns.length; i++) {
                if (returns[i].id == returnId) {
                    returns[i].status = newStatus;
                    console.log('Return updated:', returns[i]);
                    return true;
                }
            }
            return false;
        },
        
        /**
         * Get return request by ID
         * 根據ID獲取退貨申請
         * @param {string} returnId - Return request ID / 退貨申請ID
         * @returns {Object|null} Return object or null / 退貨物件或空值
         */
        getReturnById: function(returnId) {
            for (var i = 0; i < returns.length; i++) {
                if (returns[i].id == returnId) {
                    return returns[i];
                }
            }
            return null;
        },
        
        /**
         * Get all return requests (alias)
         * 獲取所有退貨申請（別名）
         * @returns {Array} Array of return requests / 退貨申請陣列
         */
        getAllReturns: function() {
            return returns;
        },
        
        // ========================================
        // USER METHODS / 用戶方法
        // Methods for user authentication
        // 用戶認證的方法
        // To be completed by other group members
        // 將由其他組員完成
        // ========================================
        
        /**
         * Save user to database
         * 儲存用戶到資料庫
         * @param {Object} user - User object with username, password, role
         * @returns {boolean} Success status / 成功狀態
         */
        saveUser: function(user) {
            users.push(user);
            console.log('User saved:', user);
            return true;
        },
        
        /**
         * Get user by username
         * 根據用戶名獲取用戶
         * @param {string} username - Username to search / 要搜尋的用戶名
         * @returns {Object|null} User object or null / 用戶物件或空值
         */
        getUser: function(username) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    return users[i];
                }
            }
            return null;
        },
        
        /**
         * Authenticate user login
         * 驗證用戶登入
         * @param {string} username - Username / 用戶名
         * @param {string} password - Password / 密碼
         * @returns {Object|null} User object if valid, null otherwise / 有效則返回用戶物件，否則返回空值
         */
        authenticateUser: function(username, password) {
            var user = this.getUser(username);
            if (user && user.password === password) {
                return user;
            }
            return null;
        },
        
        /**
         * Get all users (admin only)
         * 獲取所有用戶（僅限管理員）
         * @returns {Array} Array of users / 用戶陣列
         */
        getAllUsers: function() {
            return users;
        },
        
        // ========================================
        // ORDER METHODS / 訂單方法
        // Methods for handling orders
        // 處理訂單的方法
        // To be completed by other group members
        // 將由其他組員完成
        // ========================================
        
        /**
         * Save order to database
         * 儲存訂單到資料庫
         * @param {Object} order - Order object / 訂單物件
         * @returns {boolean} Success status / 成功狀態
         */
        saveOrder: function(order) {
            orders.push(order);
            console.log('Order saved:', order);
            return true;
        },
        
        /**
         * Get order by ID
         * 根據ID獲取訂單
         * @param {string} orderId - Order ID / 訂單ID
         * @returns {Object|null} Order object or null / 訂單物件或空值
         */
        getOrderById: function(orderId) {
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].id == orderId) {
                    return orders[i];
                }
            }
            return null;
        },
        
        /**
         * Get orders by user
         * 獲取用戶的訂單
         * @param {string} userId - User ID / 用戶ID
         * @returns {Array} Array of orders / 訂單陣列
         */
        getOrdersByUser: function(userId) {
            return orders.filter(function(order) {
                return order.userId === userId;
            });
        },
        
        /**
         * Get all orders
         * 獲取所有訂單
         * @returns {Array} Array of orders / 訂單陣列
         */
        getAllOrders: function() {
            return orders;
        },
        
        // ========================================
        // UTILITY METHODS / 實用方法
        // Helper functions for testing and maintenance
        // 測試和維護用的輔助函數
        // ========================================
        
        /**
         * Clear all data (for testing)
         * 清除所有資料（測試用）
         * English: Resets all storage arrays
         * Chinese: 重置所有儲存陣列
         */
        clearAllData: function() {
            chatMessages = [];
            returns = [];
            users = [];
            orders = [];
            alert('All data cleared!');
            console.log('All data cleared');
        },
        
        /**
         * Export all data as JSON
         * 匯出所有資料為 JSON
         * @returns {Object} All data object / 所有資料物件
         */
        exportAllData: function() {
            return {
                chatMessages: chatMessages,
                returns: returns,
                users: users,
                orders: orders
            };
        },
        
        /**
         * Import data from JSON
         * 從 JSON 匯入資料
         * @param {Object} data - Data object to import / 要匯入的資料物件
         */
        importAllData: function(data) {
            if (data.chatMessages) chatMessages = data.chatMessages;
            if (data.returns) returns = data.returns;
            if (data.users) users = data.users;
            if (data.orders) orders = data.orders;
            console.log('Data imported');
        },
        
        /**
         * Get database statistics
         * 獲取資料庫統計資訊
         * @returns {Object} Statistics object / 統計資訊物件
         */
        getStats: function() {
            return {
                chatCount: chatMessages.length,
                returnCount: returns.length,
                userCount: users.length,
                orderCount: orders.length
            };
        }
    };
})();

// Make it globally available / 使其全局可用
window.Database = Database;
