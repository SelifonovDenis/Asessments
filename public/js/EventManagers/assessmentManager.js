import {viewAdd} from "../components/assessmentComponent";
import {redirect} from "../components/assessmentComponent";
import {view} from "../components/assessmentComponent";
import {viewAddDate} from "../components/assessmentComponent";
import {viewChange} from "../components/assessmentComponent";
import {GetCandidates} from "../components/assessmentComponent";
import {GetTable} from "../components/assessmentComponent";
import {AddAssessment} from "../components/assessmentComponent";
import {SaveChange} from "../components/assessmentComponent";
import {GetFreeCandidates} from "../components/assessmentComponent";
import {AddCandidate} from "../components/assessmentComponent";
import {GetArchive} from "../components/assessmentComponent";
import {AddToArchive} from "../components/assessmentComponent";
import {RemoveCandidate} from "../components/assessmentComponent";
import {clearRightPart} from "../components/assessmentComponent";
import {GetEmployees} from "../components/assessmentComponent";
import {AddEmployeeAssessment} from "../components/assessmentComponent";
import {RemoveEmployee} from "../components/assessmentComponent";
import {GetAllEmployees} from "../components/assessmentComponent";


export function Manager(){
    //клик по кнопке "справочная информация"
    $$("redirect").attachEvent("onItemClick",function(){
        redirect("candidateWorkspace");
    });
    $$("redirect2").attachEvent("onItemClick",function(){
        redirect("workerWorkspace");
    });
    //клик по кнопке выход
    $$("out").attachEvent("onItemClick",function(){
        redirect("/");
    });

    //клик по кнопке "добавить" на тулбаре
    $$("viewAdd").attachEvent("onItemClick",function(){
        viewAdd();
    });
    //клик по кнопке "изменить" на тулбаре
    $$("changeButton").attachEvent("onItemClick",function(){
        viewChange($$("datatable").getSelectedItem().id);
    });

    //клик по элементу таблицы
    $$("datatable").attachEvent("onItemClick",function(id){
        GetCandidates();
        GetEmployees();
    });


    $$("GetAssessments").attachEvent("onItemClick",function(){
        clearRightPart();
        GetTable();
    });

    $$("addAssessment").attachEvent("onItemClick",function(){
        AddAssessment();
    });
    $$("saveChange").attachEvent("onItemClick",function(){
        SaveChange();
    });

    $$("butAddCandidate").attachEvent("onItemClick",function(){
        GetFreeCandidates();
    });

    $$("AddCandidate").attachEvent("onItemClick",function(){
        AddCandidate();
    });
    $$("getArchive").attachEvent("onItemClick",function(){
        GetArchive();
    });
    $$("addToArchive").attachEvent("onItemClick",function(){
        AddToArchive();
    });

    $$("candidates").attachEvent("onItemClick",function(id){
        $$("removeCandidate").enable();
    });

    $$("removeCandidate").attachEvent("onItemClick",function(id){
        RemoveCandidate();
    });

    $$("employees").attachEvent("onItemClick",function(id){
        $$("removeEmployee").enable();
    });

    $$("AddEmployee").attachEvent("onItemClick",function(id){
        AddEmployeeAssessment();
    });

    $$("removeEmployee").attachEvent("onItemClick",function(id){
        RemoveEmployee();
    });

    $$("butAddEmployee").attachEvent("onItemClick",function(id){
        GetAllEmployees();
    });


}
