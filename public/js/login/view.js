
export function welcome() {
    webix.ui({
        view: "window",
        id: "loginWindow",
        position: "center",
        width: 500,
        head: "Добро пожаловать",
        body: {
            type: "space",
            rows: [
                {view: "text", id: "login", label: "Логин"},
                {view: "text", id: "password", label: "Пароль"},
                {height: 20},
                {view: "button", id: "Auth", value: "Войти"}
            ]
        }

    }).show();
}


