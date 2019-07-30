import {viewAdd} from "./component";
import {redirect} from "./component";
import {GetEmployeeAssessments} from "./component";
import {viewAddDate} from "./component";
import {viewChange} from "./component";
import {RemoveEmployee} from "./component";
import {AddEmployee} from "./component";
import {RemoveAssessment} from "./component";
import {GetAssessments} from "./component";
import {AddEmployeeAssessment} from "./component";
import {SaveChange} from "./component";

export function Manager(){

    $$("redirect").attachEvent("onItemClick",function(){
        redirect("candidateWorkspace")
    });
    $$("redirect2").attachEvent("onItemClick",function(){
        redirect("assessmentWorkspace");
    });
    //клик по кнопке выход
    $$("out").attachEvent("onItemClick",function(){
        redirect("/");
    });

    //клик по кнопке "добавить кандидата" на тулбаре
    $$("viewAdd").attachEvent("onItemClick",function(){
        viewAdd();
    });
//клик по кнопке "изменить" на тулбаре
    $$("changeButton").attachEvent("onItemClick",function(){
        viewChange($$("datatable").getSelectedItem().Id);
    });

//клик по элементу таблицы
    $$("datatable").attachEvent("onItemClick",function(id){
        GetEmployeeAssessments();
    });

    //клик по кнопке "назначить дату собеседования"
    $$("butAddDate").attachEvent("onItemClick",function(){
        viewAddDate();
        GetAssessments();
    });

    $$("removeEmployee").attachEvent("onItemClick",function(){
        RemoveEmployee();
    });
    $$("addEmployee").attachEvent("onItemClick",function(){
        AddEmployee();
    });

    $$("removeAssessment").attachEvent("onItemClick",function(){
        RemoveAssessment();
    });
    $$("AddIdAsessment").attachEvent("onItemClick",function(){
        AddEmployeeAssessment();
    });

    //клик по кнопке Сохранить изменения
    $$("saveChange").attachEvent("onItemClick",function(){
        SaveChange();
    });

}
