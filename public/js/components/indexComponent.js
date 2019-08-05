import Request from "../providers/Provider";

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

var lastid = 0;
var latestAction = "main";

//отображение атрибутов выбранного кандидата в правой части
export function view(){
    $$("saveChange").enable();
    $$("butAddDate").enable();
    $$("butRelocateArchive").enable();
    $$("successfully").enable();
    $$("notSuccessfully").enable();
    if (typeof $$("datatable").getSelectedItem() != "undefined") {
        lastid = $$("datatable").getSelectedItem().Id;
    }
    IdChangeAssessment = 0;
    var req = new Request();
    req.Get('candidate/'+lastid).then(
        function (candidate) {
            if (typeof candidate['Message'] == "undefined") {
                $$("changeFirstName").setValue(candidate.First_name);
                $$("changeLastName").setValue(candidate.Last_name);
                $$("changeMiddleName").setValue(candidate.Middle_name);
                $$("changePhone").setValue(candidate.Phone);
                $$("changeEmail").setValue(candidate.Email);
                $$("changeStatus").setValue(candidate.Status);
                $$("changeDate").setValue(candidate.Asessment.Date);
                if (candidate.Archive == true){
                    $$("changeArchive").setValue(1);
                } else {
                    $$("changeArchive").setValue(0);
                }
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
    latestAction = "main";
    clearRightPart();
    var req = new Request();
    req.Get('candidate').then(function (res){
        candidates = res;
        if (typeof candidates['Message'] == "undefined") {
            $$("datatable").clearAll();
            var myparse = webix.Date.strToDate("%d.%m.%Y %H:%i");
            candidates.forEach(function(elem, index){
                $$("datatable").add({
                    Id: elem.Id,
                    First_name: elem.First_name,
                    Last_name: elem.Last_name,
                    Middle_name: elem.Middle_name,
                    Status: elem.Status,
                    Asessment: myparse(elem.Asessment.Date),
                })
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
            if (elem.Id === lastid) {
                IdChangeAssessment = elem.Asessment.Id;
            }
        })
    }
    var archive;
    if ($$("changeArchive").getValue() == 0){
        archive = false;
    } else {
        archive = true;
    }
    var data = {
        Id: lastid,
        First_name: $$("changeFirstName").getValue(),
        Last_name: $$("changeLastName").getValue(),
        Middle_name: $$("changeMiddleName").getValue(),
        Phone: $$("changePhone").getValue(),
        Email: $$("changeEmail").getValue(),
        Status: $$("changeStatus").getValue(),
        Archive: archive,
        Asessment: {
            Id: IdChangeAssessment,
        }
    };
    if ($$("changeForm").validate()) {
        var req = new Request();
        req.Post('candidate', data).then(
            function (result) {
                IdChangeAssessment = 0;
                if (latestAction === "main") {
                    GetTable();
                } else{
                    Search();
                }
                view();
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
            $$("changeStatus").setValue("Назначено собеседование");
        }
    });
}

//Изменить статус
export function ChangeStatus(status){
    var id_assessment;
    var archive;
    candidates.forEach(function (elem) {
        if (elem.Id === lastid) {
            id_assessment = elem.Asessment.Id;
            archive = elem.Archive;
        }
    })
    var data = {
        Id: lastid,
        First_name: $$("changeFirstName").getValue(),
        Last_name: $$("changeLastName").getValue(),
        Middle_name: $$("changeMiddleName").getValue(),
        Phone:$$("changePhone").getValue(),
        Email:$$("changeEmail").getValue(),
        Status:status,
        Archive: archive,
        Asessment: {
            Id: id_assessment,
        }
    };

    var req = new Request();
    req.Post('candidate',data).then(
        function (result) {
            if (latestAction === "main") {
                GetTable();
            } else{
                Search();
            }
            view();
        }
    )
}


//Добавить или удалить из архива
export function AddArchive(){
    var id_assessment;
    var archive;
    var status;
    candidates.forEach(function (elem) {
        if (elem.Id === lastid) {
            id_assessment = elem.Asessment.Id;
            status = elem.Status;
            archive = true;

        }
    })
    var data = {
        Id: lastid,
        First_name: $$("changeFirstName").getValue(),
        Last_name: $$("changeLastName").getValue(),
        Middle_name: $$("changeMiddleName").getValue(),
        Phone:$$("changePhone").getValue(),
        Email:$$("changeEmail").getValue(),
        Status:status,
        Archive: archive,
        Asessment: {
            Id: id_assessment,
        }
    };

    var req = new Request();
    req.Post('candidate',data).then(
        function (result) {
            if (latestAction === "main") {
                GetTable();
            } else{
                Search();
            }
            view();
        }
    )
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


export function Search(){
    latestAction = "search";
    var archive;
    if ($$("archive").getValue() == 0){
        archive = false;

    } else{
        archive = true;
    }

    var data = {
        Id: 0,
        First_name: $$("searchFirstName").getValue(),
        Last_name: $$("searchLastName").getValue(),
        Middle_name: $$("searchMiddleName").getValue(),
        Phone:$$("searchPhone").getValue(),
        Email:$$("searchEmail").getValue(),
        Status: $$("searchStatus").getValue(),
        Archive: archive,
        Asessment: {
            Date: $$("searchDate").getText(),
        }
    };

    clearRightPart();
    var req = new Request();
    req.Post('candidate/search', data).then(function (res){
        candidates = res;
        if (typeof candidates['Message'] == "undefined") {
            $$("datatable").clearAll();
            var myparse = webix.Date.strToDate("%d.%m.%Y %H:%i");
            candidates.forEach(function(elem, index){
                $$("datatable").add({
                    Id: elem.Id,
                    First_name: elem.First_name,
                    Last_name: elem.Last_name,
                    Middle_name: elem.Middle_name,
                    Status: elem.Status,
                    Asessment: myparse(elem.Asessment.Date),
                });
            });
            $$("searchPanel").define("collapsed", true);
            //$$("searchPanel").reconstruct();
        }
        else {
            console.log(candidates.Message.value)
        }
    });
}