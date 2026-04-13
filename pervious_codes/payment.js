// 检查金额
function checkAmount() {
    var amount = document.getElementById("amount").value;
    if (amount <= 0 || isNaN(amount)) {
        alert("Invalid amount");
        return false;
    }
    window.amount = amount;
    return true;
}

// 获取支付方式
function getMethod() {
    var method = document.getElementById("method").value;
    window.method = method;
    return true;
}

// 支付处理
function processPayment() {
    alert("Payment Successful!\nAmount: " + window.amount + "\nMethod: " + window.method);
    return true;
}

// 主流程 switch
function startPayment() {
    var step = 1;

    while (step <= 3) {
        switch (step) {
            case 1:
                if (checkAmount()) step++;
                else return;
                break;

            case 2:
                if (getMethod()) step++;
                else return;
                break;

            case 3:
                processPayment();
                return;
        }
    }
}