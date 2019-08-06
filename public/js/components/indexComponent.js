import Request from "../providers/Provider";

var candidates;



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
                $$("changeArchive").setValue(candidate.Archive);
                $$("changeWindow").show();
            }
            else {
                console.log(candidates.Message);
            }
        }
    );
}

export function clearRightPart() {
    $$("сhange").disable();
    $$("butAddDate").disable();
    $$("butRelocateArchive").disable();
    $$("successfully").disable();
    $$("notSuccessfully").disable();
    $$("removeDate").disable();

    $$("changeFirstName").setValue("");
    $$("changeLastName").setValue("");
    $$("changeMiddleName").setValue("");
    $$("changePhone").setValue("");
    $$("changeEmail").setValue("");
    $$("changeStatus").setValue("");

}

//получить и вывести кандидатов в таблицу
export function GetTable(){
    latestAction = "main";
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

    };

    if ($$("addForm").validate())
    {
        var req = new Request();
        req.Put('candidate', data).then(
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


//изменить канидата
export function SaveChange() {

    var data = {
        Id: lastid,
        First_name: $$("changeFirstName").getValue(),
        Last_name: $$("changeLastName").getValue(),
        Middle_name: $$("changeMiddleName").getValue(),
        Phone: $$("changePhone").getValue(),
        Email: $$("changeEmail").getValue(),
        Status: $$("changeStatus").getValue(),
        Archive: $$("changeArchive").getValue(),
    };
    if ($$("changeForm").validate()) {
        var req = new Request();
        req.Post('candidate', data).then(
            function (result) {
                if (latestAction === "main") {
                    GetTable();
                } else{
                    Search();
                }
                $$("changeWindow").hide();
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
        }
    )
}


//Добавить или удалить из архива
export function AddArchive(){
    var id_assessment;
    var status;
    candidates.forEach(function (elem) {
        if (elem.Id === lastid) {
            id_assessment = elem.Asessment.Id;
            status = elem.Status;
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
        Archive: 1,
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

        }
    )
}


export function Search(){
    latestAction = "search";
    var data = {
        Id: 0,
        First_name: $$("searchFirstName").getValue(),
        Last_name: $$("searchLastName").getValue(),
        Middle_name: $$("searchMiddleName").getValue(),
        Phone:$$("searchPhone").getValue(),
        Email:$$("searchEmail").getValue(),
        Status: $$("searchStatus").getValue(),
        Archive: $$("archive").getValue(),
        Asessment: {
            Date: $$("searchDate").getText(),
        }
    };
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


export function GetCandidateAssessments() {


    $$("butAddDate").enable();
    $$("butRelocateArchive").enable();
    $$("сhange").enable();
    $$("successfully").enable();
    $$("notSuccessfully").enable();
    if (typeof $$("datatable").getSelectedItem() != "undefined") {
        lastid = $$("datatable").getSelectedItem().Id;
    }

    var req = new Request();
    $$("allDate").clearAll();
    req.Get('candidate/'+lastid+'/assessment').then(function (res){
        assessments = res;
        if (assessments!=null) {
            assessments.forEach(function(elem, index){
                $$("allDate").add({
                    Id:elem.Id,
                    title: elem.Date,
                })
            });
        }
    });
}

export function AddCandidateAssessment() {
    var req = new Request();
    if (typeof $$("Date").getSelectedItem() != "undefined") {
        req.Put('candidate/'+lastid+'/assessment/'+$$("Date").getSelectedItem().Id, "").then(
            function (result) {
                GetCandidateAssessments();
                if (latestAction === "main") {
                    GetTable();
                }

                if (latestAction === "search"){
                    Search();
                }
            }
        )
    }
    else{
        webix.message("Собеседование не выбрано");
    }
}

export function RemoveCandidateAssessment() {
    var req = new Request();
    if (typeof $$("allDate").getSelectedItem() != "undefined") {
        req.Delete('candidate/'+lastid+'/assessment/'+$$("allDate").getSelectedItem().Id, "").then(
            function (result) {

                GetCandidateAssessments();
                if (latestAction === "main") {
                    GetTable();
                }

                if (latestAction === "search"){
                    Search();
                }

            }
        )
    }
    else{
        webix.message("Собеседование не выбрано");
    }
}