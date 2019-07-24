import {candidate} from "./view";
import {GetCandidates} from "./Provider"
import {GetCandidate} from "./Provider"
import {AddCandidate} from "./Provider"

export function redirect(str){
    window.location.href = str;
}

export function viewAdd(){
    $$("add").show();
}

export function windowchange() {
    $$("changeWindow").show();
}

//отображение атрибутов кандидата в окне изменения
export function viewChange(){
    $$("changeFirstName").setValue($$("rfamily").getValue());
    $$("changeLastName").setValue($$("rname").getValue());
    $$("changeMiddleName").setValue($$("rsubname").getValue());
    $$("changePhone").setValue($$("rphone").getValue());
    $$("changeEmail").setValue($$("remail").getValue());
    $$("changeStatus").setValue($$("rstatus").getValue());
    $$("changeDate").setValue($$("rdate").getValue());
}


//отображение атрибутов выбранного кандидата в правой части
export function view(id){
    $$("changeButton").enable();
    $$("butAddDate").enable();
    $$("butRelocateArchive").enable();
    GetCandidate(id);

}

export function viewCandidate(candidate){
    candidate = JSON.parse(candidate);
    if (typeof candidate['Message'] == "undefined") {
        $$("rfamily").setValue(candidate.First_name);
        $$("rname").setValue(candidate.Last_name);
        $$("rsubname").setValue(candidate.Middle_name);
        $$("rphone").setValue(candidate.Phone);
        $$("remail").setValue(candidate.Email);
        $$("rstatus").setValue(candidate.Status);
        $$("rdate").setValue(candidate.Asessment.Date);
    }
    else {
        alert(candidates.Message)
    }
}

export function viewAddDate(){
    $$("addDate").show();
}


export function GetTable(){
    var c;
    GetCandidates().then(function (candidates){
        if (typeof candidates['Message'] == "undefined") {
            $$("datatable").clearAll();
            candidates.forEach(function(elem, index){
                $$("datatable").add(elem)
            });
        }
        else {
            alert(candidates.Message.value)
        }
    });
}


export function GetCandidateAttr(){
    var data = {
        First_name: $$("addFirstName").getValue(),
        Last_name: $$("addLastName").getValue(),
        Middle_name: $$("addMiddleName").getValue(),
        Phone:$$("addPhone").getValue(),
        Email:$$("addEmail").getValue(),
        Status:$$("addStatus").getValue(),
        Date:$$("addDate").getValue(),
    };

    if ($$("addForm").validate())
    {
        AddCandidate(data)
    }
    else {
        webix.message("Заполните все поля")
    }


}

export function AddResult() {
    $$("add").hide();
    GetTable();
}

export function SaveChange(){
    var data = {
        First_name: $$("changeFirstName").getValue(),
        Last_name: $$("changeLastName").getValue(),
        Middle_name: $$("changeMiddleName").getValue(),
        Phone:$$("changePhone").getValue(),
        Email:$$("changeEmail").getValue(),
        Status:$$("changeStatus").getValue(),
        Date:$$("changeDate").getValue(),
    };

    if ($$("changeForm").validate())
    {
        ChangeCandidate(data)
    }
    else {
        webix.message("Заполните все поля")
    }
}