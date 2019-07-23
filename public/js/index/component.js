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
    $$("changeFamily").setValue($$("rfamily").getValue());
    $$("changeName").setValue($$("rname").getValue());
    $$("changeSubname").setValue($$("rsubname").getValue());
    $$("changePhone").setValue($$("rphone").getValue());
    $$("changeEmail").setValue($$("remail").getValue());
    $$("changeStatus").setValue($$("rstatus").getValue());
    $$("changeDate").setValue($$("rdate").getValue());
}


//отображение атрибутов выбранного кандидата в правой части
export function view(id){
    $$("changeButton").enable();
    $$("butAddDate").enable();
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
        $$("rdate").setValue(candidate.Date);
    }
    else {
        alert(candidates.Message)
    }
}

export function viewAddDate(){
    $$("addDate").show();
}


export function GetTable(){
    GetCandidates();
}



export function AddToTable(candidates){
    candidates = JSON.parse(candidates);
    if (typeof candidates['Message'] == "undefined") {
        $$("datatable").clearAll();
        candidates.forEach(function(elem, index){
            $$("datatable").add(elem)
        });
    }
    else {
        alert(candidates.Message.value)
    }
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
    if (data.First_name !== "" && data.Last_name !== "" && data.Middle_name !== "" && data.Phone !== "" && data.Email !== "" && data.Status !== "")
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