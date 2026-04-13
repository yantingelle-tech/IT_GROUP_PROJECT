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
