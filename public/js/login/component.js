import {loginJSON} from "./Provider";

export function login() {
    var str = {login: $$("login").getValue(), password: $$("password").getValue()};
    loginJSON(str);
}

export function loginResult(user){
    user = JSON.parse(user);
    if (typeof user['Message'] == "undefined") {
        if(user.Id!="0") {
            var url = "/candidateWorkspace";
            document.location.href = url;
        }
        else{
            alert("Неверный логин и/или пароль")
        }
    }
    else {
        alert(user.Message)
    }

}