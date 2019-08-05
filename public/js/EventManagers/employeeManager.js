import {viewAdd} from "../components/employeeComponent";
import {redirect} from "../components/employeeComponent";
import {GetEmployeeAssessments} from "../components/employeeComponent";
import {viewAddDate} from "../components/employeeComponent";
import {viewChange} from "../components/employeeComponent";
import {RemoveEmployee} from "../components/employeeComponent";
import {AddEmployee} from "../components/employeeComponent";
import {RemoveAssessment} from "../components/employeeComponent";
import {GetAssessments} from "../components/employeeComponent";
import {AddEmployeeAssessment} from "../components/employeeComponent";
import {SaveChange} from "../components/employeeComponent";
import {AddArchive} from "../components/employeeComponent";
import {Search} from "../components/employeeComponent";


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
        viewChange();
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

    $$("dates").attachEvent("onItemClick",function(){
        $$("removeAssessment").enable();
    });

    $$("AddArchive").attachEvent("onItemClick",function(){
        AddArchive();
    });

    $$("find").attachEvent("onItemClick",function(){
        Search();
    });


}
