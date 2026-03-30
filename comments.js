// 全局变量：存储评论列表 & 评论ID
window.commentList = [];
window.commentId = 1;

// 客户：检查评论内容是否为空
function checkCusContent() {
    var content = document.getElementById("cusContent").value.trim();
    if (content === "") {
        alert("Customer comment cannot be empty!");
        return false;
    }
    window.curCusContent = content;
    return true;
}

// 客户：获取商品和评分信息
function getCusInfo() {
    var product = document.getElementById("cusProduct").value;
    var rating = document.getElementById("cusRating").value;
    window.curCusProduct = product;
    window.curCusRating = rating;
    return true;
}

// 客户：保存评论并刷新界面
function saveCustomerComment() {
    var newComment = {
        id: window.commentId,
        product: window.curCusProduct,
        rating: window.curCusRating,
        cusContent: window.curCusContent,
        merReply: ""
    };
    window.commentList.push(newComment);
    updateMerCommentSelect();
    renderCommentList();
    document.getElementById("cusContent").value = "";
    window.commentId++;
    alert("Customer comment posted successfully!");
    return true;
}

// 商家：检查回复内容是否为空
function checkMerContent() {
    var content = document.getElementById("merContent").value.trim();
    if (content === "") {
        alert("Merchant reply cannot be empty!");
        return false;
    }
    window.curMerContent = content;
    return true;
}

// 商家：获取要回复的评论ID
function getMerCommentId() {
    var commentId = document.getElementById("merCommentId").value;
    if (commentId === "") {
        alert("Please select a comment to reply!");
        return false;
    }
    window.curMerCommentId = parseInt(commentId);
    return true;
}

// 商家：保存回复并刷新界面
function saveMerchantReply() {
    for (var i = 0; i < window.commentList.length; i++) {
        if (window.commentList[i].id === window.curMerCommentId) {
            window.commentList[i].merReply = window.curMerContent;
            break;
        }
    }
    renderCommentList();
    document.getElementById("merContent").value = "";
    alert("Merchant reply posted successfully!");
    return true;
}

// 更新商家下拉框选项
function updateMerCommentSelect() {
    var select = document.getElementById("merCommentId");
    select.innerHTML = "";
    for (var i = 0; i < window.commentList.length; i++) {
        var option = document.createElement("option");
        option.value = window.commentList[i].id;
        option.textContent = "Comment ID " + window.commentList[i].id + " (" + window.commentList[i].product + ")";
        select.appendChild(option);
    }
    if (window.commentList.length === 0) {
        var option = document.createElement("option");
        option.textContent = "No comments yet";
        select.appendChild(option);
    }
}

// 渲染评论到页面
function renderCommentList() {
    var list = document.getElementById("commentList");
    list.innerHTML = "";
    if (window.commentList.length === 0) {
        list.innerHTML = "<p style='color:#718096; text-align:center;'>No comments yet!</p>";
        return;
    }
    for (var i = 0; i < window.commentList.length; i++) {
        var c = window.commentList[i];
        var item = document.createElement("div");
        item.className = "comment-item";
        item.innerHTML = `
            <div class="cus-info">ID: ${c.id} | ${c.product} | ⭐${c.rating}</div>
            <p><b>Customer:</b> ${c.cusContent}</p>
            ${c.merReply ? `<div class="mer-reply"><p><b>Merchant:</b> ${c.merReply}</p></div>` : ""}
        `;
        list.appendChild(item);
    }
}

// 客户评论主流程：
function startCustomerComment() {
    var step = 1;
    while (step <= 3) {
        switch (step) {
            case 1:
                if (checkCusContent()) step++; else return;
                break;
            case 2:
                if (getCusInfo()) step++; else return;
                break;
            case 3:
                saveCustomerComment();
                return;
        }
    }
}

// 商家回复主流程：
function startMerchantReply() {
    var step = 1;
    while (step <= 3) {
        switch (step) {
            case 1:
                if (checkMerContent()) step++; else return;
                break;
            case 2:
                if (getMerCommentId()) step++; else return;
                break;
            case 3:
                saveMerchantReply();
                return;
        }
    }
}

// 页面加载初始化
window.onload = function() {
    renderCommentList();
    updateMerCommentSelect();
};