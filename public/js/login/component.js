
function redirect(){
    window.location.href = "workers.html";
}

function login() {
    var str = {login: $$("login").getInputNode().value, password: $$("password").getInputNode().value};
    loginJSON(str);
}

function loginResult(id, id_employee){
    if(id!="0") {
        var url = "/candidates";
        document.location.href = url;
    }
    else{
        alert("Неверный логин и/или пароль")
    }
}