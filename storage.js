let merchantList = {};
function addNewProduct(merchantId, productId, productName, productPrice, productStock){
    if(!merchantList[merchantId]){
        merchantList[merchantId] = {};
    }
    merchantList[merchantId][productId] = {
        name: productName, price: productPrice, stock: productStock
    }
    window.alert(`New product:${productName} (Price: ${productPrice}, Stock: ${productStock})`);
    return true
}
function viewProduct(merchantId) {
    let products = merchantList[merchantId] || {};
    return products;
}
function saleProduct(merchantId, productId, quantity) {
    let product = merchantList[merchantId]?.[productId];
    if (!product) {
        window.alert("Product ID (" + productId + ") does not exist");
        return false;
    }
    if (product.stock < quantity) {
        window.alert("No enough stock, stock left: " + product.stock);
        return false;
    }
    product.stock -= quantity;
    window.alert("Success, stock left: " + product.stock);
    return true;
}