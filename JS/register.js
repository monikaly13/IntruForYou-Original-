function setAdmin(){
    if(localStorage.getItem("users")==null){
        let admin_user = {
            email: "supportadmin@gmail.com",
            password: "intruadmin",
            cart:[]
        }
        let users = [];
        users.push(admin_user);
        localStorage.setItem("users", JSON.stringify(users));
    }
}
function register(){
    var formElement = document.getElementById("signupform");
    var input_email = formElement.elements.namedItem("email").value;
    var psw = formElement.elements.namedItem("psw").value;
    var psw_repeat = formElement.elements.namedItem("psw-repeat").value;
    if(psw!=psw_repeat){
        notifyMessage("Password is not Match!","red");
    }
    else{
        
        var get_users = localStorage.getItem("users");
        var obj_users = JSON.parse(get_users)
        let user = {
            email: input_email,
            password: psw,
            cart:[]
        }
        obj_users.push(user);
        localStorage.setItem("users", JSON.stringify(obj_users));
        window.open('../HTML/login.html',"_self");

    }
}

function setValue(){
    localStorage.setItem("name", "dyna");
    var value1 = localStorage.getItem("name");
    console.log(value1);
    localStorage.setItem("name", "pina");
    var value2 = localStorage.getItem("name");
    console.log(value2);
}

function login(){
    var form = document.getElementById("loginForm");
    var email = form.elements.namedItem("email").value;
    var psw = form.elements.namedItem("psw").value;
    var get_users = localStorage.getItem("users");
    var obj_users = JSON.parse(get_users);
    var isExist = false;
    for(let i =0; i<obj_users.length; i++){
        if(obj_users[i].email == email){
            isExist= true;
            if(obj_users[i].password!= psw){
                notifyMessage("Wrong Password","red");
            }
            else{
                notifyMessage("Login Succesfully", "green")
                localStorage.setItem("currentUser",JSON.stringify(obj_users[i]));
                window.open('../HTML/index.html',"_self");
            }
        }  
    }
    if(!isExist){
        notifyMessage("User dosen't existed!","red");
    }

}

function notifyMessage(message, color){
    var message_box = document.createElement("div");
    message_box.style.width = "max-content";
    message_box.style.height = "max-content";
    message_box.style.position = "fixed";
    message_box.style.display = "sticky";
    message_box.style.top= "50px";
    message_box.style.right = "50px";
    message_box.style.borderRadius = "5px";
    message_box.style.boxSizing = "border-box";
    message_box.style.padding = "10px";
    message_box.style.backgroundColor = color;
    message_box.style.boxShadow = "3px 3px WhiteSmoke";
    var text_message = document.createElement("p");
    text_message.style.color = "white";
    text_message.innerHTML = message;
    text_message.style.fontFamily = "Arial, Helvetica, sans-serif";
    message_box.appendChild(text_message);
    document.body.appendChild(message_box);
    message_box.classList.add("message_box");
    setTimeout(()=>{
        document.body.removeChild(message_box);
    },3000);
}

function resetPassword(){
    var formElement = document.getElementById("reset_psw");
    var email = formElement.elements.namedItem("email").value;
    var old_psw = formElement.elements.namedItem("old_psw").value;
    var new_psw = formElement.elements.namedItem("new_psw").value;
    var repeat_new_psw = formElement.elements.namedItem("repeat_new_psw").value;
    var isUserExist = false;
    var isMatchPassword = false;
    if(new_psw!=repeat_new_psw){
        notifyMessage("New Password is not Match!", "red");
    }
    else{
        let get_users = localStorage.getItem("users");
        let obj_users = JSON.parse(get_users);
        for(let i = 0; i<obj_users.length; i++){
            if(obj_users[i].email ==email){
                isUserExist = true;
                if(obj_users[i].password == old_psw) {
                    isMatchPassword = true;
                    obj_users[i].password = new_psw;
                    localStorage.setItem("users", JSON.stringify(obj_users));
                    notifyMessage("Reset Password Succesful", "green");
                    break;
                }
            }
        }
        if(!isUserExist){
            notifyMessage("User doesn't exist!", "red");
        }
        else if(!isMatchPassword){
            notifyMessage("Old Password is not matched!", "red");
        }

    }
}

function checkAdmin(){
    var currentUser =  JSON.parse(localStorage.getItem("currentUser"))  ;
    var email = currentUser.email;
    var password = currentUser.password;
    var link_element = document.getElementById("admin_link");

    if(email =="supportadmin@gmail.com" && password=="intruadmin"){
        link_element.style.visibility = "visible";
    }
    else{
        link_element.style.visibility = "hidden";
    }
}
function addProduct(){
    var product_form = document.getElementById("add_product");
    var p_name = product_form.elements.namedItem("product_name").value;
    var p_description = product_form.elements.namedItem("description").value;
    var p_price = product_form.elements.namedItem("price").value;
    var p_image_url = product_form.elements.namedItem("img_url").value;

    if(localStorage.getItem("products")==null){
        localStorage.setItem("products", "[]");
    }

    var obj_product = JSON.parse(localStorage.getItem("products"));

    let product = {
        name:p_name,
        description: p_description,
        price:p_price,
        imageUrl:p_image_url
    }
    obj_product.push(product);
    localStorage.setItem("products", JSON.stringify(obj_product));
    notifyMessage("Product is added", "green");
    displayProducts();
}

function displayProducts(){
    var p_table = document.getElementById("product_table");
    p_table.innerHTML = "";

    var header = document.createElement("tr");
    header.innerHTML = "<th>Name</th><th>Image</th><th>Description</th><th>Price</th><th>Action</th>";

    p_table.appendChild(header);

    var obj_product = JSON.parse(localStorage.getItem("products"));

    for(let i= 0 ; i<obj_product.length;i++){
        let p_row = document.createElement("tr");

        let p_name = document.createElement("td");
        p_name.innerHTML = obj_product[i].name;
        p_row.appendChild(p_name);

        let p_image = document.createElement("td");
        let img = document.createElement("img");
        img.src = obj_product[i].imageUrl;
        p_image.appendChild(img);
        p_row.appendChild(p_image);

        let p_description = document.createElement("td");
        p_description.innerHTML = obj_product[i].description;
        p_row.appendChild(p_description);

        let p_price = document.createElement("td");
        p_price.innerHTML = obj_product[i].price +"$";
        p_row.appendChild(p_price);
        
        
        let p_action = document.createElement("td");
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){
            deleteProduct(obj_product[i].name);
        }
        p_action.appendChild(delete_button);
        p_row.appendChild(p_action);
        p_table.appendChild(p_row);

    }
}

function deleteProduct(product_name){
    var obj_product = JSON.parse(localStorage.getItem("products"));
    for(let i= 0 ; i<obj_product.length;i++){
        if(obj_product[i].name == product_name){
            obj_product.splice(i,1);
            localStorage.setItem("products", JSON.stringify(obj_product));
            notifyMessage("Delete Sucessful", "green");
            displayProducts();
            break;
        } 
    }
}

function displayShopProduct(){

    var cart_number = document.getElementById("cart_number");
    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    cart_number.innerHTML = current_user.cart.length; 

    var obj_product = JSON.parse(localStorage.getItem("products"));
    var product_box = document.getElementById("product_box");

    for(let i= 0 ; i<obj_product.length;i++){
        var p_card = document.createElement("div");
        p_card.classList.add("product-card");

        var p_image = document.createElement("div");
        p_image.classList.add("product-image");
        p_image.style.backgroundImage = "url('"+obj_product[i].imageUrl+"')";
        p_card.appendChild(p_image);

        var p_info = document.createElement("div");
        p_info.classList.add("product-info");

        var p_name = document.createElement("h5");
        p_name.innerHTML = obj_product[i].name;
        p_info.appendChild(p_name);

        var p_description = document.createElement("p");
        p_description.innerHTML = obj_product[i].description;
        p_info.appendChild(p_description);

        var p_price = document.createElement("h5");
        p_price.innerHTML = "$"+obj_product[i].price ;
        p_info.appendChild(p_price);

        var p_button = document.createElement("button");
        p_button.innerHTML="Add to Cart";
        p_button.onclick = function(){
            addToCart(obj_product[i]);
        }

        p_info.appendChild(p_button);

        p_card.appendChild(p_info);

        product_box.appendChild(p_card);
    }
}

function addToCart(obj_product){
    var cart_number = document.getElementById("cart_number");

    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    current_user.cart.push(obj_product);
    cart_number.innerHTML = current_user.cart.length; 
    localStorage.setItem("currentUser", JSON.stringify(current_user));

    var all_users = JSON.parse(localStorage.getItem("users"));

    for(let i=0; i<all_users.length;i++){
        if(all_users[i].email == current_user.email){
            all_users[i].cart = current_user.cart;
            localStorage.setItem("users",JSON.stringify(all_users));
            notifyMessage("Product is added to Cart","green");
            break;
        }
    }



}

function displayCartItem(){
    var p_table = document.getElementById("product_table");
    p_table.innerHTML = "";

    var current_user = JSON.parse(localStorage.getItem("currentUser"));

    var header = document.createElement("tr");
    header.innerHTML = "<th>Name</th><th>Image</th><th>Description</th><th>Price</th><th>Action</th>";

    p_table.appendChild(header);

    var total_price = 0;
    for(let i=0; i< current_user.cart.length; i++){
        let p_row = document.createElement("tr");

        let p_name = document.createElement("td");
        p_name.innerHTML = current_user.cart[i].name;
        p_row.appendChild(p_name);

        let p_image = document.createElement("td");
        let img = document.createElement("img");
        img.src = current_user.cart[i].imageUrl;
        p_image.appendChild(img);
        p_row.appendChild(p_image);

        let p_description = document.createElement("td");
        p_description.innerHTML = current_user.cart[i].description;
        p_row.appendChild(p_description);

        let p_price = document.createElement("td");
        p_price.innerHTML = current_user.cart[i].price +"$";
        p_row.appendChild(p_price);
        
        
        let p_action = document.createElement("td");
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){
            deleteCartItem(current_user.cart[i].name);
        }
        p_action.appendChild(delete_button);
        p_row.appendChild(p_action);
        p_table.appendChild(p_row);

        total_price=total_price + Number(current_user.cart[i].price)
    }

    var total_element = document.getElementById("total_price");
    total_element.innerHTML = "$"+total_price;
}

function deleteCartItem(item_name){
    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    for(let i=0; i< current_user.cart.length; i++){
        if(current_user.cart[i].name ==item_name){
            current_user.cart.splice(i,1);
            break;
        } 
    }
    localStorage.setItem("currentUser",JSON.stringify(current_user));

    var all_users = JSON.parse(localStorage.getItem("users"));
    for(let j=0; j<all_users.length;j++){
        if(all_users[j].email == current_user.email){
            all_users[j].cart = current_user.cart;
            notifyMessage("Product is removed", "green");
            displayCartItem();
            localStorage.setItem("users", JSON.stringify(all_users));
            break;
        }
    } 
}