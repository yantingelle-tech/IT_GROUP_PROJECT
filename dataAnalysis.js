// Customer & Merchant Analytics 

const DataAnalysis = (function() {

    // get data from the entire app
    function getUsers() {
        if (window.Database && typeof window.Database.getAllUsers === 'function') {
            return window.Database.getAllUsers();
        }
        if (window.db && window.db.users) {
            return window.db.users;
        }
        return [];
    }

    function getOrders() {
        if (window.Database && typeof window.Database.getAllOrders === 'function') {
            return window.Database.getAllOrders();
        }
        if (window.db && window.db.orders) {
            return window.db.orders;
        }
        return [];
    }

    function getReviews() {
        if (window.db && window.db.reviews) return window.db.reviews;
        if (window.commentList) return window.commentList; // ref comments.js
        return [];
    }

    function getProducts() {
        if (window.db && window.db.products) return window.db.products;
        return [];
    }

    // new func customer anaylsis 
    function analyseCustomers() {
        const users = getUsers().filter(u => 
            u.role === 'customer' || u.identity === 'customer'
        );
        
        const orders = getOrders();
        const reviews = getReviews();

        let customerData = users.map(customer => {
            const customerOrders = orders.filter(o => 
                o.userId === customer.id || 
                o.customerId === customer.id || 
                o.customer === customer.username
            );

            const totalSpent = customerOrders.reduce((sum, order) => {
                return sum + (order.total || order.amount || 0);
            }, 0);

            const customerReviews = reviews.filter(r => 
                r.customerId === customer.id || r.username === customer.username
            );

            return {
                id: customer.id || customer.username,
                name: customer.name || customer.username,
                orderCount: customerOrders.length,
                totalSpent: parseFloat(totalSpent.toFixed(2)),
                averageOrderValue: customerOrders.length > 0 
                    ? parseFloat((totalSpent / customerOrders.length).toFixed(2)) 
                    : 0,
                reviewCount: customerReviews.length
            };
        });

        const totalRevenue = orders.reduce((sum, o) => 
            sum + (o.total || o.amount || 0), 0
        );

        return {
            totalCustomers: users.length,
            totalOrders: orders.length,
            totalRevenue: parseFloat(totalRevenue.toFixed(2)),
            averageOrdersPerCustomer: users.length > 0 
                ? (orders.length / users.length).toFixed(2) 
                : 0,
            topSpenders: [...customerData]
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5),
            customerList: customerData
        };
    }

    //  new func merchant anaylsis 
    function analyseMerchants() {
        const users = getUsers().filter(u => 
            u.role === 'merchant' || u.identity === 'merchant'
        );
        
        const products = getProducts();
        const reviews = getReviews();

        let merchantData = users.map(merchant => {
            const merchantProducts = products.filter(p => 
                p.merchantId === merchant.id
            );
            
            const repliesGiven = reviews.filter(r => 
                r.merReply && r.merReply.trim() !== ''
            ).length;

            return {
                id: merchant.id || merchant.username,
                name: merchant.name || merchant.username,
                productCount: merchantProducts.length,
                repliesGiven: repliesGiven
            };
        });

        const totalComments = reviews.length;
        const respondedComments = reviews.filter(r => 
            r.merReply && r.merReply.trim() !== ''
        ).length;
        
        const responseRate = totalComments > 0 
            ? ((respondedComments / totalComments) * 100).toFixed(1) 
            : 0;

        return {
            totalMerchants: users.length,
            totalProducts: products.length,
            merchantResponseRate: responseRate + '%',
            merchantList: merchantData
        };
    }

    //  new func Overall sythesis anaylsis 
    function getFullAnalysis() {
        const customers = analyseCustomers();
        const merchants = analyseMerchants();
        const reviews = getReviews();

        const averageRating = reviews.length > 0 && reviews[0]?.rating 
            ? (reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length).toFixed(2) 
            : 0;

        return {
            summary: {
                totalUsers: getUsers().length,
                totalCustomers: customers.totalCustomers,
                totalMerchants: merchants.totalMerchants,
                totalRevenue: customers.totalRevenue,
                totalReviews: reviews.length,
                merchantResponseRate: merchants.merchantResponseRate
            },
            customers: customers,
            merchants: merchants,
            reviews: {
                totalReviews: reviews.length,
                averageRating: averageRating
            }
        };
    }

    // Print analysis to console 
    function printAnalysis() {
        console.log("%c=== SHOPPING SYSTEM DATA ANALYSIS ===", 
            "font-weight: bold; color: #3182ce; font-size: 16px;");

        const analysis = getFullAnalysis();
        console.log(analysis);
        
        console.log("\n%cTop 5 Customer Spenders:", 
            "font-weight: bold; color: #2b6cb0;");

        analysis.customers.topSpenders.forEach((c, i) => {
            console.log(`${i+1}. ${c.name} - ${c.totalSpent} (${c.orderCount} orders)`);
        });

        console.log(`\nMerchant Response Rate: ${analysis.merchants.merchantResponseRate}`);
    }

    return {
        analyseCustomers,
        analyseMerchants,
        getFullAnalysis,
        printAnalysis
    };
})();

