import Request from "./Provider";

var candidates;

var IdChangeAssessment = 0;
var IdAddAssessment = 0;

export function redirect(str){
    window.location.href = str;
}

export function viewAdd(){
    $$("add").show();
}

export function viewAddDate(){
    $$("DateWindow").show();
}


//отображение атрибутов выбранного кандидата в правой части
export function view(id){
    $$("saveChange").enable();
    $$("butAddDate").enable();
    $$("butRelocateArchive").enable();
    $$("successfully").enable();
    $$("notSuccessfully").enable();
    IdChangeAssessment = 0;
    var req = new Request();
    req.Get('candidate/'+id).then(
        function (candidate) {
            if (typeof candidate['Message'] == "undefined") {
                $$("changeFirstName").setValue(candidate.First_name);
                $$("changeLastName").setValue(candidate.Last_name);
                $$("changeMiddleName").setValue(candidate.Middle_name);
                $$("changePhone").setValue(candidate.Phone);
                $$("changeEmail").setValue(candidate.Email);
                $$("changeStatus").setValue(candidate.Status);
                $$("changeDate").setValue(candidate.Asessment.Date);
            }
            else {
                console.log(candidates.Message);
            }
        }
    );
}

function clearRightPart() {
    $$("saveChange").disable();
    $$("butAddDate").disable();
    $$("butRelocateArchive").disable();
    $$("successfully").disable();
    $$("notSuccessfully").disable();
    IdChangeAssessment = 0;

    $$("changeFirstName").setValue("");
    $$("changeLastName").setValue("");
    $$("changeMiddleName").setValue("");
    $$("changePhone").setValue("");
    $$("changeEmail").setValue("");
    $$("changeStatus").setValue("");
    $$("changeDate").setValue("");

}

//получить и вывести кандидатов в таблицу
export function GetTable(){
    clearRightPart();
    var req = new Request();
    req.Get('candidate').then(function (res){
        candidates = res;
        if (typeof candidates['Message'] == "undefined") {
            $$("datatable").clearAll();
            candidates.forEach(function(elem, index){
                $$("datatable").add(elem)
            });
        }
        else {
            console.log(candidates.Message.value)
        }
    });
}

//добавить кандидата
export function AddCandidate(){
    var data = {
        First_name: $$("addFirstName").getValue(),
        Last_name: $$("addLastName").getValue(),
        Middle_name: $$("addMiddleName").getValue(),
        Phone:$$("addPhone").getValue(),
        Email:$$("addEmail").getValue(),
        Status:$$("addStatus").getValue(),
        Asessment:{
            Id:IdAddAssessment,
        }
    };

    if ($$("addForm").validate())
    {
        var req = new Request();
        req.Put('candidate', data).then(
            function (result) {
                $$("add").hide();
                IdAddAssessment = 0;
                GetTable();
            }
        )
    }
    else {
        webix.message("Заполните все поля");
    }
}


//изменить канидата
export function SaveChange() {
    if (IdChangeAssessment === 0) {
        candidates.forEach(function (elem) {
            if (elem.Id === $$("datatable").getSelectedItem().Id) {
                IdChangeAssessment = elem.Asessment.Id;
            }
        })
    }

    var data = {
        Id: $$("datatable").getSelectedItem().Id,
        First_name: $$("changeFirstName").getValue(),
        Last_name: $$("changeLastName").getValue(),
        Middle_name: $$("changeMiddleName").getValue(),
        Phone: $$("changePhone").getValue(),
        Email: $$("changeEmail").getValue(),
        Status: $$("changeStatus").getValue(),
        Asessment: {
            Id: IdChangeAssessment,
        }
    };

    if ($$("changeForm").validate()) {
        var req = new Request();
        req.Post('candidate', data).then(
            function (result) {
                IdChangeAssessment = 0;
                webix.message("Успешно обновлено");
                GetTable();
            }
        )
    } else {
        webix.message("Заполните все поля")
    }

}

var assessments;

//получить собеседования
export function GetAssessments() {
    var req = new Request();
    req.Get('assessment').then(function (res){
        assessments = res;
        if (typeof assessments['Message'] == "undefined") {
            $$("Date").clearAll();
            assessments.forEach(function(elem, index){
                $$("Date").add(elem)
            });
        }
        else {
            console.log(assessments.Message.value)
        }
    });
}



//назначить кандидату собеседование
export function UpdateIdAssessment(){
    if (IdChangeAssessment == 0){
        return
    }
    assessments.forEach(function (assessment) {
        if (assessment.Id === IdChangeAssessment) {
            $$("changeDate").setValue(assessment.Date);
        }
    })
}

//Изменить статус
export function ChangeStatus(status){
    var id_assessment;
    candidates.forEach(function (elem) {
        if (elem.Id === $$("datatable").getSelectedItem().Id) {
            id_assessment = elem.Asessment.Id;
        }
    })
    var data = {
        Id: $$("datatable").getSelectedItem().Id,
        First_name: $$("changeFirstName").getValue(),
        Last_name: $$("changeLastName").getValue(),
        Middle_name: $$("changeMiddleName").getValue(),
        Phone:$$("changePhone").getValue(),
        Email:$$("changeEmail").getValue(),
        Status:status,
        Asessment: {
            Id: id_assessment,
        }
    };

    var req = new Request();
    req.Post('candidate',data).then(
        function (result) {
            webix.message("Успешно обновлено");
            GetTable();
        }
    )

}

//получить кандидатов из архива
export function GetArchive(){
    clearRightPart();
    var req = new Request();
    req.Get('archive/candidate').then(function (res){
        candidates = res;
        if (typeof candidates['Message'] == "undefined") {
            $$("datatable").clearAll();
            candidates.forEach(function(elem, index){
                $$("datatable").add(elem)
            });
        }
        else {
            console.log(candidates.Message.value)
        }
    });
}

export  function SetIdChangeAssessment() {
    if (typeof $$("Date").getSelectedItem() != "undefined") {
        IdChangeAssessment = $$("Date").getSelectedItem().Id;
    }
}

export  function SetIdAddAssessment() {
    if (typeof $$("Date").getSelectedItem() != "undefined") {
        IdAddAssessment = $$("Date").getSelectedItem().Id;
    }

}
