webix.ready(function(){
    //клик по кнопке "войти"
    $$("Auth").attachEvent("onItemClick",function(){
        login();
    });
});
