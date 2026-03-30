var customerDataBase=new Array()//先創建一個用戶賬號的數據庫



//创建账户,爲了避免登錄時難操作不允許相同id存在
function create() {
    
   function creatAccount (accountID,password,emailAdress,identity){
    this.id=accountID
    this.password=password
    this.email=emailAdress
    this.identity=identity
    } 
    var accountID=window.prompt("Please input the account id name :")
    if(accountID===null){
        alert("You chose to cancel!")
        return
    }
    
    
    
    while(true){
        let id=customerDataBase.findIndex(item => item.id==accountID)        
        if(id !=-1) {//id被使用過，不允許創建
            window.alert("This id is already being used by someone else.")
            let userchoice=window.confirm("Do you want to try angin?")
            if(userchoice==true){//想繼續嘗試
                accountID=window.prompt("Please input the account name :")    
            }
            else{//不想繼續嘗試
                return false
            }
        }
        else{//id沒有被使用過，可以創建
            window.alert("Your id is "+accountID)
            break
        }
    }
    
    var password1=window.prompt("Please input the account password :")
    var password2=window.prompt("Please ensure your account password again:")
    if(password1===null || password2===null){
        alert("You chose to cancel!")
        return
    }

    while (true){
        if(password1==password2){//兩次輸入的密碼一樣
            var password=password2
            break
        }
        else{//兩次輸入的密碼不一樣
            window.alert("The password entered twice is inconsistent")
            let userchoice=window.confirm("Do you want to try again?")
            if(userchoice==true){ //繼續嘗試           
                var password1=window.prompt("Please input the account password :")
                var password2=window.prompt("Please ensure your account password again:")
                if(password1===null || password2===null){
                    alert("You chose to cancel!")
                    return
    }
            }
            else{//放棄創建
                return false
            }
        }
    }
    var email1=window.prompt("Please input your email to reset password if you forget the password")       
    var email2=window.prompt("Please input your email to reset password if you forget the password again")  
    if(email1===null || email2===null){
        alert("You chose to cancel!")
        return    
    }
    while(true){
       if(email1==email2){//兩次輸入的email一樣
           var email=email2
           //判斷郵件的基本格式是否正確，避免用戶輸入假郵箱
           let EmailFormat1=email.includes("@")
           let EmailFormat2=email.includes(".")
            if(EmailFormat1 && EmailFormat2){//基本格式正確
               break
            }
            else{//基本格式不正確
                window.alert("Your email format is incorrect")
                let choice=window.confirm("Do you want to try again?")
                if(choice==true){//想繼續嘗試
                    email1=window.prompt("Please input your email to reset password if you forget the password")       
                    email2=window.prompt("Please input your email to reset password if you forget the password again")
                    if(email1===null || email2===null){
                        alert("You chose to cancel!")
                        return    
                    }     
                }
                else{//用戶不想繼續嘗試
                    return false
                }
            } 
        } 
       else{//兩次輸入的Email不一樣
           window.alert("The email entered twice is inconsistent")
           let userchoice=window.confirm("Do you want to try again?")
           if (userchoice==true){  //想繼續嘗試      
               var email1=window.prompt("Please input your email to reset password if you forget the password")       
               var email2=window.prompt("Please input your email to reset password if you forget the password again")
               if(email1===null || email2===null){
                   alert("You chose to cancel!")
                    return    
                }
            }
            else{//不想繼續
                return false
            }
        }
    }

    //用戶選擇身份
    let Identity=window.prompt("Please enter your identity(Notice:you just need to enter (customer or merchant))")
    if(Identity===null){
        alert("You chose to cancel!")
        return    
    }
    let realIdentity=null
    while(true){        
        if(Identity===null){//用戶沒有輸入東西
            alert("You did not enter anything")
            let userchoice=window.confirm("Do you want to try again?")
            if(userchoice==true){//想繼續嘗試
                Identity=window.prompt("Please enter your identity(Notice:you just need to enter (customer or merchant))")
                if(Identity===null){
                    alert("You chose to cancel!")
                    return    
                }    
            }
            else{//不想繼續嘗試
                return false
            }
        }
        else{//用戶選擇了身份
            Identity=Identity.toLowerCase()
            if(Identity==="customer"){//選擇customer
                realIdentity="customer"
                break
            }
            else if(Identity==="merchant"){//選擇merchant
                realIdentity="merchant"
                break
            }
            else{//輸入錯誤信息
                alert("Your input is wrong!")
                let choice=window.confirm("Do you want to try again?")
                if (choice==true){//想繼續
                    Identity=window.prompt("Please enter your identity(Notice:you just need to enter (customer or merchant))")
                    if(Identity===null){
                        alert("You chose to cancel!")
                        return    
                    }   
                }
                else{不想繼續嘗試
                    return false
                }
            }
        }
    }
    var customer=new creatAccount (accountID,password,email,realIdentity)
    customerDataBase.push(customer)
    alert("Successfully Creating!")
    return true
}

//登陆
function landing (){
    let userID=window.prompt("Please enter your id")
    if(userID===null){
        alert("You chose to cancel!")
        return    
    }
    let userPassword=window.prompt("Please enter the password")
    if(userPassword===null){
        alert("You chose to cancel!")
        return    
    }
    while(true){
        let Index=customerDataBase.findIndex(item =>item.id==userID)
        if (Index==-1){//id不存在
            window.alert("id does not exist")
            let userchoice=window.confirm("Do you want to try again?")
            if(userchoice==true){//想繼續嘗試
                userID=window.prompt("Please enter your id")
                if(userID===null){
                    alert("You chose to cancel!")
                    return    
                }
            }
            else{//不想繼續嘗試
                return false
            }
        }
        else{//id存在
            if(customerDataBase[Index].password==userPassword){//密碼正確
                window.alert("Successfully landing!")

                return CurrentUser=customerDataBase[Index],true
            }
            else{//密碼不正確
                window.alert("You entered password is incorrect!")
                let userchoice=window.confirm("Do you want to try again?")
                if(userchoice==true){//想繼續嘗試
                    userPassword=window.prompt("Please enter the password")
                    if(userPassword===null){
                        alert("You chose to cancel!")
                        return    
                    }    
                }
                else{//用戶不想繼續登錄
                    return false
                }
            }
        }
    }
}

//重置密碼
function Reset_password(){
    let id=window.prompt("Please enter your account")
    if(id===null){
        alert("You chose to cancel!")
        return    
    }
    let Index=customerDataBase.findIndex(item=>item.id==id)
    let email=window.prompt("Please enter your email to vaild your identity")
    if(email===null){
        alert("You chose to cancel!")
        return    
    }
    
    while(true){
        if(Index==-1){//id不存在
            window.alert("id does not exist")
            let user=window.confirm("DO you want to try again?")
            if(user==true){//想繼續
                id=document.prompt("Please enter your account")
                if(id===null){
                alert("You chose to cancel!")
                return    
            }
                Index=customerDataBase.findIndex(item=>item.id==id)
                  
            }
            else{//不想繼續
                return false
            }
        }
        else{//id存在
            let Realemail=customerDataBase[Index].email
            if(email==Realemail){//郵箱正確
                let newpassword=window.prompt("Please enter your new password")
                if(newpassword){
                    alert("You chose to cancel!")
                    return    
                }
                customerDataBase[Index].password=newpassword
                alert("Successfully resetting password!")
                return true
            }
            else{//郵箱不正確
                window.alert("you entered email is in incorrect")
                let userchoice=window.confirm("Do you want to try again?")
                if(userchoice==true){//想繼續嘗試
                    email=window.prompt("Please enter your email to vaild your identity")
                    if(email===null){
                        alert("You chose to cancel!")
                        return    
                    }                      
                }
                else{//不想繼續
                    return false
                }
            }
        }
    }
}


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
        result.forEach((item,index) => displayResult+=(index+1)+": "+item.name+" "+item.price+"$") 
        window.alert(displayResult)
        return true      
    }
}





var CurrentUser=null
function mainSystem(){
    while(true){
        if (CurrentUser===null){
            let choice=window.prompt("Welcome to shopping system!\n"+"1:Create Account\n"+"2:Landing\n"+"3:Reset password\n"+"4:Exit\nPlease enter your choice(Notice:You just need to enter(1-4))")

            switch(choice){
                case "1":
                    create()
                    break
                case "2":
                    landing()
                    break
                case "3":
                    Reset_password()
                    break
                case "4":
                    window.alert("Goodbye!")
                    return
                default:
                    alert("Invaild input! Please try again!")
                    
            }
        }
        else{
            if(CurrentUser.identity==="customer"){
                let choice2=window.prompt("Customer Center\n"+"1:Search\n"+"2:Logout\n"+"Please enter your choice(Notice: You just need to enter (1-2))")
                switch(choice2){
                    case "1":
                        searchFunction()
                        break
                    case "2":
                        CurrentUser=null
                        alert("Successfully logout!")
                        break
                    default:
                        alert("Invaild input!") 
                        
                }
            }
            else {
                let choice3=window.prompt("Merchant Center\n"+"1:Add new product\n"+"2:Logout\n"+"Please enter your choice(1-2):")
                switch(choice3){
                    case "1":
                        addProduct()
                        break
                    case "2":
                        alert("Successfully logout")
                        CurrentUser=null
                        break
                    default:
                        alert("Invaild input!")
                         
                }
            }
        }
    }
}

mainSystem()

