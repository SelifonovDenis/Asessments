import Request from "./Provider";

export function viewAdd(){
    $$("add").show();
}
export function viewAddDate(){
    $$("addDate").show();
}
export function redirect(str){
    window.location.href = str;
}

//отображение атрибутов кандидата в окне изменения
export function viewChange(id){
    assessments.forEach(function(elem, index){
        if(id === elem.id)
        {
            $$("changeDate").setValue(elem.Date);
            $$("changeCabinet").setValue(elem.Cabinet);
            //$$("changeWorker").setValue(elem.Fio);
            $$("changeWindow").show();
        }
    });

}

var candidates;

export function GetCandidates(){
    $$("changeButton").enable();
    $$("butAddDate").enable();
    $$("candidates").clearAll();

    var req = new Request();
    req.Get('assessment/'+$$("datatable").getSelectedItem().Id+'/candidate').then(function (res){
        candidates = res;
        if (typeof candidates['Message'] == "undefined") {
            candidates.forEach(function(elem, index){
                $$("candidates").add({
                    id:elem.Id,
                    title: elem.First_name+" "+elem.Last_name+" "+elem.Middle_name,
                },0)
            });
        }
        else {
            console.log(candidates.Message.value)
        }
    });
}



export function clearRightPart() {
    $$("changeButton").disable();
    $$("butAddDate").disable();
    $$("removeCandidate").disable();
    $$("addToArchive").disable();
    $$("candidates").clearAll();
}

var assessments;

export function GetTable() {
    clearRightPart();
    var req = new Request();
    req.Get('assessment').then(function (res){
        assessments = res;
        if (typeof assessments['Message'] == "undefined") {
            $$("datatable").clearAll();
            assessments.forEach(function(elem, index){
                $$("datatable").add(elem)
            });
        }
        else {
            console.log(assessments.Message.value)
        }
    });
}

var employees;
export function GetEmployees() {
    var req = new Request();
    req.Get('employee').then(function (res){
        employees = res;
        if (typeof employees['Message'] == "undefined") {
            $$("datatable").clearAll();
            employees.forEach(function(elem, index){
                $$("datatable").add(elem)
            });
        }
        else {
            console.log(candidates.Message.value)
        }
    });
}

export function AddAssessment() {
    var data = {
        Date: $$("addDate").getValue(),
        Cabinet: $$("addCabinet").getValue(),
    };

    if ($$("addForm").validate())
    {
        var req = new Request();
        req.Put('assessment', data).then(
            function (result) {
                $$("add").hide();
                GetTable();
            }
        )
    }
    else {
        webix.message("Заполните все поля");
    }
}

export function SaveChange() {
    var data = {
        Id: $$("datatable").getSelectedItem().Id,
        Date: $$("changeDate").getValue(),
        Cabinet: $$("changeCabinet").getValue(),
    };

    if ($$("changeForm").validate()) {
        var req = new Request();
        req.Post('assessment', data).then(
            function (result) {
                webix.message("Успешно обновлено");
                GetTable();
                $$("changeWindow").hide();
            }
        )
    } else {
        webix.message("Заполните все поля")
    }

}