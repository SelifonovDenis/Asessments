import {viewAdd} from "./component";
import {redirect} from "./component";
import {view} from "./component";
import {viewAddDate} from "./component";
import {viewChange} from "./component";
import {GetCandidates} from "./component";
import {GetTable} from "./component";
import {AddAssessment} from "./component";
import {SaveChange} from "./component";
import {GetFreeCandidates} from "./component";
import {AddCandidate} from "./component";
import {GetArchive} from "./component";
import {AddToArchive} from "./component";
import {RemoveCandidate} from "./component";


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
    });


    $$("GetAssessments").attachEvent("onItemClick",function(){
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

}
