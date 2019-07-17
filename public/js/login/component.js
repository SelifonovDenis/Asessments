
function redirect(){
    window.location.href = "workers.html";
}

function viewAdd(){
    //всплывающее окно "Добавить кандидата"
    webix.ui({
        view:"window",
        position:"center",
        id:"add",
        width: 500,
        modal: true,
        head:"Добавить",
        close:true,
        body:{
            type:"space",
            rows:[
                {view:"text", name:"family", label:"Фамилия"},
                {view:"text", name:"name", label:"Имя"},
                {view:"text", name:"subname", label:"Отчество"},
                {view:"text", name:"phone", label:"Телефон"},
                {view:"text", name:"address", label:"Почта"},
                {view:"text", name:"status", label:"Статус"},
                {view:"text", name:"date", label:"Дата собеседования", labelWidth: 150},
                {height:20},
                {view:"button", value:"Назначить дату собеседования"},
                {view:"button", value:"Добавить кандидата"},
            ]
        }
    }).show();
}

function windowchange() {
    //всплывающее окно "изменить"
    webix.ui({
        view:"window",
        id:"changeWindow",
        position:"center",
        width: 500,
        modal: true,
        head:"Изменить",
        close:true,
        body:{
            type:"space",
            rows:[
                {view:"text", id:"changeFamily", label:"Фамилия"},
                {view:"text", id:"changeName", label:"Имя"},
                {view:"text", id:"changeSubname", label:"Отчество"},
                {view:"text", id:"changePhone", label:"Телефон"},
                {view:"text", id:"changeEmail", label:"Почта"},
                {view:"text", id:"changeStatus", label:"Статус"},
                {view:"text", id:"changeDate", label:"Дата собеседования", labelWidth: 150},
                {height:20},
                {view:"button", value:"Назначить дату собеседования"},
                {view:"button", value:"Сохранить изменения"},
            ]
        }
    }).show();
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
    webix.Date.startOnMonday = true;
    //добаить дату
    webix.ui({
        view:"window",
        position:"center",
        id:"addDate",
        width: 500,
        modal: true,
        head:"Добавить",
        close:true,
        body:{
            type:"space",
            rows:[
                {
                    view:"calendar",
                    id:"my_calendar",
                    date:new Date(),
                    weekHeader:true,
                    events:webix.Date.isHoliday,
                    width:300,
                    height:250
                },

                {height:20},
                {view:"button", value:"Добавить дату"},
            ]
        }
    }).show();
}
