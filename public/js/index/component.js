import {candidate} from "./view";

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
    candidate.forEach(function(elem, index){
        if(id === elem.id)
        {
            $$("rfamily").setValue(elem.family);
            $$("rname").setValue(elem.name);
            $$("rsubname").setValue(elem.subname);
            $$("rphone").setValue(elem.phone);
            $$("remail").setValue(elem.email);
            $$("rstatus").setValue(elem.status);
            $$("rdate").setValue(elem.date);
        }
    });
}

export function viewAddDate(){
    $$("addDate").show();
}
