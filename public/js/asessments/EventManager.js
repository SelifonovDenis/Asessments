webix.ready(function(){
    //клик по кнопке "справочная информация"
    $$("redirect").attachEvent("onItemClick",function(){
        redirect();
    });
    $$("redirect2").attachEvent("onItemClick",function(){
        redirect2();
    });
    //клик по кнопке "добавить кандидата" на тулбаре
    $$("viewAdd").attachEvent("onItemClick",function(){
        viewAdd();
    });
//клик по кнопке "изменить" на тулбаре
    $$("changeButton").attachEvent("onItemClick",function(){
        viewChange($$("datatable").getSelectedItem().id);
    });
//клик по элементу таблицы
    $$("datatable").attachEvent("onItemClick",function(id){
        view(this.data.pull[id.row].id);
    });
    //клик по кнопке "назначить дату собеседования"
    $$("butAddDate").attachEvent("onItemClick",function(){
        viewAddDate();
    });
});
