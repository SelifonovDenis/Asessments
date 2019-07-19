import {redirect} from "./component";
import {viewAdd} from "./component";
import {windowchange} from "./component";
import {viewChange} from "./component";
import {view} from "./component";
import {viewAddDate} from "./component";


export function Manager(){
    //клик по кнопке "справочная информация"
    $$("redirect").attachEvent("onItemClick",function(){
        redirect("workers.html")
    });
    $$("redirect2").attachEvent("onItemClick",function(){
        redirect("asessments.html");
    });
    //клик по кнопке "добавить кандидата" на тулбаре
    $$("viewAdd").attachEvent("onItemClick",function(){
        viewAdd()
    });
//клик по кнопке "изменить" на тулбаре
    $$("changeButton").attachEvent("onItemClick",function(){
        windowchange();
        viewChange();
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
