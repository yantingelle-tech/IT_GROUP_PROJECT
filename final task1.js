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
                if(newpassword===null){
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
