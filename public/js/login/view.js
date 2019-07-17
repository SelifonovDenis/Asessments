webix.ready(function(){
    var heightScreen = document.body.clientHeight;
    var widthScreen = document.body.clientWidth;

    webix.ui({
        view:"window",
        id:"changeWindow",
        position:"center",
        width: 500,
        head:"Добро пожаловать",
        body:{
            type:"space",
            rows:[
                {view:"text", id:"changeFamily", label:"Логин"},
                {view:"text", id:"changeName", label:"Пароль"},
                {height:20},
                {view:"button", value:"Войти"}
            ]
        }
    }).show();


});
