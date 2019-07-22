import {viewAdd} from "./component";
import {redirect} from "./component";
import {view} from "./component";
import {viewAddDate} from "./component";
import {viewChange} from "./component";

export function Manager(){

    $$("redirect").attachEvent("onItemClick",function(){
        redirect("index.html")
    });
    $$("redirect2").attachEvent("onItemClick",function(){
        redirect("asessments.html");
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
}
