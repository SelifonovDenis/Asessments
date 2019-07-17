
function redirect(){
    window.location.href = "workers.html";
}
function redirect2(){
    window.location.href = "asessments.html";
}
function viewAdd(){
    $$("add").show();
}

function windowchange() {
    $$("changeWindow").show();
}

//отображение атрибутов кандидата в окне изменения
function viewChange(){
    $$("changeFamily").setValue($$("rfamily").getInputNode().value);
    $$("changeName").setValue($$("rname").getInputNode().value);
    $$("changeSubname").setValue($$("rsubname").getInputNode().value);
    $$("changePhone").setValue($$("rphone").getInputNode().value);
    $$("changeEmail").setValue($$("remail").getInputNode().value);
    $$("changeStatus").setValue($$("rstatus").getInputNode().value);
    $$("changeDate").setValue($$("rdate").getInputNode().value);
}

//отображение атрибутов выбранного кандидата в правой части
function view(id){
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

function viewAddDate(){
    $$("addDate").show();
}
