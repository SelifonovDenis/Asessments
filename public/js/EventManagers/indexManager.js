import {redirect} from "../components/indexComponent";
import {viewAdd} from "../components/indexComponent";
import {view} from "../components/indexComponent";
import {viewAddDate} from "../components/indexComponent";
import {AddCandidate} from "../components/indexComponent";
import {SaveChange} from "../components/indexComponent";
import {GetAssessments} from "../components/indexComponent";
import {UpdateIdAssessment} from "../components/indexComponent";
import {ChangeStatus} from "../components/indexComponent";
import {SetIdChangeAssessment} from "../components/indexComponent";
import {SetIdAddAssessment} from "../components/indexComponent";
import {Search} from "../components/indexComponent";
import {AddArchive} from "../components/indexComponent";
import {GetCandidateAssessments} from "../components/indexComponent";
import {AddCandidateAssessment} from "../components/indexComponent";
import {RemoveCandidateAssessment} from "../components/indexComponent";
import {clearRightPart} from "../components/indexComponent";


export function Manager(){

    $$("redirect").attachEvent("onItemClick",function(){
        redirect("workerWorkspace")
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

//клик по элементу таблицы
    $$("datatable").attachEvent("onItemClick",function(id){
        GetCandidateAssessments()
    });
    //клик по кнопке Добавить кандидата в окне Добавить
    $$("addCandidat").attachEvent("onItemClick",function(){
        AddCandidate();
    });
    //клик по кнопке Сохранить изменения
    $$("saveChange").attachEvent("onItemClick",function(){
        SaveChange();
    });

    //клик по кнопке "назначить дату собеседования"
    $$("butAddDate").attachEvent("onItemClick",function(){
        viewAddDate();
        GetAssessments();
    });

    //клик по кнопке назначить собеседование
    $$("UpdateIdAsessment").attachEvent("onItemClick",function(){
        AddCandidateAssessment();
        $$("DateWindow").hide();
    });

    //клик по кнопке переместить в архив
    $$("butRelocateArchive").attachEvent("onItemClick",function(){
        AddArchive();
        clearRightPart();
    });
    //клик по кнопке успешно
    $$("successfully").attachEvent("onItemClick",function(){
        ChangeStatus("Принят на стажировку");
    });
    //клик по кнопке не успешно
    $$("notSuccessfully").attachEvent("onItemClick",function(){
        ChangeStatus("Не принят на стажировку");
    });

    $$("find").attachEvent("onItemClick",function(){
        clearRightPart();
        Search();
    });

    $$("removeDate").attachEvent("onItemClick",function(){
        RemoveCandidateAssessment();
    });

    $$("allDate").attachEvent("onItemClick",function(){
        $$("removeDate").enable();
    });

    $$("сhange").attachEvent("onItemClick",function(){
        view();
    });
}
