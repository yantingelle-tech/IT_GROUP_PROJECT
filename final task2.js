//First step：先構建一個categories庫來引導商家輸入商品類別，方便後續用戶搜索
let categoriesDataBase=["electronics","clothing","daily necessities","food","book","drinks"]
//Second step：構建商品庫
let productsDataBase=new Array()

//Third step:商家添加商品函數
function addProduct(){
    let Categoriesmenu="Categories List:\n" //製作一個categories菜單給商家輸入（在後續收集商家輸入商品類別時候用到）
    for(let x=0; x<categoriesDataBase.length; x++){
        Categoriesmenu+=(x+1)+": "+categoriesDataBase[x]+"\n"    
    }

    
    function creatProduct(name,price,category){
        this.name=name
        this.price=price
        this.category=category
    }

    let realName=window.prompt("Please enter the name of product")
    if(realName===null){
        alert("You chose to cancel!")
        return    
    }
    let realPrice=window.prompt("Please enter the price of product(Notice:adding $)")
    if(realPrice===null){
        alert("You chose to cancel!")
        return    
    }

    //讓商家選擇商品所屬類別
    while(true){
        let merchantChoice=window.confirm("Are your products in the product category table below?\n"+Categoriesmenu)
        if (merchantChoice==true){//列表有所屬的商品
            let realCategory=window.prompt("Please select the category of your product(Notice: You need to input a specific category name )\n"+Categoriesmenu)
            if(realCategory===null){
                alert("You chose to cancel!")
                return    
            } 
            let product=new creatProduct(realName,realPrice,realCategory)
            productsDataBase.push(product)
            return true   
        }
        else{//列表沒有所屬的商品,讓用戶自行在類別庫裏添加新類別
            let merchantChoice=window.confirm("Do you want to add a new category to categories data base?")
            if(merchantChoice==true){//用戶想自行添加新類別
                let newCategory=window.prompt("Please enter the new category of your product")
                if(newCategory===null){
                    alert("You chose to cancel!")
                    return    
                }
                categoriesDataBase.push(newCategory)
                let productCategory=newCategory 
                let product=new creatProduct(realName,realPrice,productCategory)
                productsDataBase.push(product)
                return true
            }
            else{
                return false
            }
        }
    }
}
//接下來完成用戶搜索的相關函數
function searchFunction(){
    let keyword=window.prompt("Please enter the name of the item or item category you want to search for:")
    
    
    if (keyword===null){//用戶沒有輸入東西
        return "The user clicked Cancel!",false
    }
    
    //開始搜索(爲了方便需要將所有結果轉為小寫，再用includes（）判斷每個商品是否符合要求，最後用filter（）來返回一個包含所有符合要求物品的數組)
    let result=productsDataBase.filter(item => {return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase())})

    //搜索完畢，接下來展示結果給用戶
    if (result.length==0){//沒有搜索到符合用戶要求的產品
        window.alert("Sorry! We do not search for a product that met your requirements")
        return
    }
    else{//展示結果
        let displayResult="Find the result for you:\n"
        result.forEach((item,index) => displayResult+=(index+1)+": "+item.name+" "+item.price+"$"+"\n") 
        window.alert(displayResult)
        return true      
    }
}