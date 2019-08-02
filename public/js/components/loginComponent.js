import Request from "../providers/Provider";

export function login() {
    var str = {login: $$("login").getValue(), password: $$("password").getValue()};
    var req = new Request();
    req.Post('login', str).then(
        function (user) {
            if (typeof user['Message'] == "undefined") {
                if(user.Id!="0") {
                    var url = "/candidateWorkspace";
                    document.location.href = url;
                }
                else{
                    webix.message("Неверный логин и/или пароль")
                }
            }
            else {
                alert(user.Message)
            }
        }
    )
}
