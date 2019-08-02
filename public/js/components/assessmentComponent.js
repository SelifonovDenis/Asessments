import Request from "../providers/Provider";

export function viewAdd(){
    $$("add").show();
}
export function redirect(str){
    window.location.href = str;
}


export function viewChange(id){
    assessments.forEach(function(elem, index){
        if(id === elem.id)
        {
            var myparse = webix.Date.strToDate("%d.%m.%Y %H:%i");
            var date = myparse(elem.Date);
            $$("changeDate").setValue(date);
            $$("changeCabinet").setValue(elem.Cabinet);
            $$("changeStatus").setValue(elem.Status);
            $$("changeWindow").show();
        }
    });
}

var candidates;
var latestAction = "main";
var lastId = 0;

export function GetCandidates(){
    $$("removeCandidate").disable();
    $$("changeButton").enable();
    $$("butAddCandidate").enable();
    $$("addToArchive").enable();
    $$("candidates").clearAll();
    if (typeof $$("datatable").getSelectedItem() != "undefined") {
        lastId = $$("datatable").getSelectedItem().Id;
    }
    var req = new Request();
    req.Get('assessment/'+lastId+'/candidate').then(function (res){
        candidates = res;
        if (typeof candidates['Message'] == "undefined") {
            candidates.forEach(function(elem, index){
                $$("candidates").add({
                    Id:elem.Id,
                    title: elem.First_name+" "+elem.Last_name+" "+elem.Middle_name,
                },0)
            });
        }
        else {
            console.log(candidates.Message.value)
        }
    });
}




var freeCandidates;
export function GetFreeCandidates(){
    $$("CandidateWindow").show();
    $$("CandidatesTable").clearAll();

    var req = new Request();
    req.Get('assessment/freeCandidates').then(function (res){
        freeCandidates = res;
        if (typeof freeCandidates['Message'] == "undefined") {
            freeCandidates.forEach(function(elem){
                $$("CandidatesTable").add(elem);
            });
        }
        else {
            console.log(freeCandidates.Message.value)
        }
    });
}


//Добавить кандидата к assessment
export function AddCandidate() {
    if (typeof $$("CandidatesTable").getSelectedItem() != "undefined") {
        var data;

        freeCandidates.forEach(function (elem) {
            if (elem.Id === $$("CandidatesTable").getSelectedItem().Id) {
                data = {
                    Id: elem.Id,
                    First_name: elem.First_name,
                    Last_name: elem.Last_name,
                    Middle_name: elem.Middle_name,
                    Phone:elem.Phone,
                    Email:elem.Email,
                    Status:"Назначено собеседование",
                    Asessment: {
                        Id: lastId,
                    }
                }
            }
        });

        var req = new Request();
        req.Post('candidate', data).then(
            function (result) {
                $$("CandidateWindow").hide();
                GetCandidates();
            }
        )
    }
    else {
        webix.message("Кандидат не выбран");
    }
}

export function RemoveCandidate() {
    var data;

    candidates.forEach(function (elem) {
        if (elem.Id === $$("candidates").getSelectedItem().Id) {
            data = {
                Id: elem.Id,
                First_name: elem.First_name,
                Last_name: elem.Last_name,
                Middle_name: elem.Middle_name,
                Phone:elem.Phone,
                Email:elem.Email,
                Status:"Удален из собеседования",
                Asessment: {
                    Id: 0,
                }
            }
        }
    });

    var req = new Request();
    req.Post('candidate', data).then(
        function (result) {
            GetCandidates();
        }
    )
}


export function clearRightPart() {
    $$("changeButton").disable();
    $$("butAddCandidate").disable();
    $$("removeCandidate").disable();
    $$("addToArchive").disable();
    $$("candidates").clearAll();

    $$("removeEmployee").disable();
    $$("butAddEmployee").disable();
    $$("employees").clearAll();
}

var assessments;

export function GetTable() {
    latestAction = "main";
    var req = new Request();
    req.Get('assessment').then(function (res){
        assessments = res;
        if (typeof assessments['Message'] == "undefined") {
            $$("datatable").clearAll();
            assessments.forEach(function(elem, index){
                $$("datatable").add(elem);
            });
        }
        else {
            console.log(assessments.Message.value)
        }
    });
}

export function AddAssessment() {
    var data = {
        Date: $$("addDate").getText(),
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
        Date: $$("changeDate").getText(),
        Cabinet: $$("changeCabinet").getValue(),
        Status: $$("changeStatus").getValue(),
    };

    if ($$("changeForm").validate()) {
        var req = new Request();
        req.Post('assessment', data).then(
            function (result) {
                if (latestAction === "main") {
                    GetTable();
                }
                if(latestAction === "archive"){
                    GetArchive();
                }
                if (latestAction === "search"){
                    Search();
                }
                $$("changeWindow").hide();
            }
        )
    } else {
        webix.message("Заполните все поля")
    }
}

export function GetArchive() {
    latestAction = "archive";
    clearRightPart();
    var req = new Request();
    req.Get('archive/assessment').then(function (res){
        assessments = res;
        if (typeof assessments['Message'] == "undefined") {
            $$("datatable").clearAll();
            assessments.forEach(function(elem, index){
                $$("datatable").add(elem);
            });
        }
        else {
            console.log(assessments.Message.value)
        }
    });
}

export function AddToArchive() {
    var data;
    assessments.forEach(function (elem) {
        if (elem.Id === $$("datatable").getSelectedItem().Id) {
            data = {
                Id: elem.Id,
                Date: elem.Date,
                Cabinet: elem.Cabinet,
                Status: "Архив",
            }
        }
    });

    var req = new Request();
    req.Post('assessment', data).then(
        function (result) {
            if (latestAction === "main") {
                GetTable();
            }
            if(latestAction === "archive"){
                GetArchive();
            }
            if (latestAction === "search"){
                Search();
            }
            $$("changeWindow").hide();
        }
    )
}



export function GetEmployees(){
    $$("removeEmployee").disable();
    $$("butAddEmployee").enable();
    $$("employees").clearAll();

    var req = new Request();
    req.Get('assessment/'+lastId+'/employee').then(function (res){
        var Employees = res;
        if (typeof candidates['Message'] == "undefined" && Employees !=null) {
            Employees.forEach(function(elem, index){
                $$("employees").add({
                    Id:elem.Id,
                    title: elem.First_name+" "+elem.Last_name+" "+elem.Middle_name,
                },0)
            });
        }
    });
}


export function RemoveEmployee() {
    var req = new Request();
    req.Delete('employee/'+$$("employees").getSelectedItem().Id+'/assessment/'+lastId).then(
        function (result) {
            GetEmployees();
            if (latestAction === "main") {
                GetTable();
            }
            if(latestAction === "archive"){
                GetArchive();
            }
            if (latestAction === "search"){
                Search();
            }
            $$("removeEmployee").disable();
        }
    )
}

export function AddEmployeeAssessment() {
    var req = new Request();
    if (typeof $$("EmployeesTable").getSelectedItem() != "undefined") {
        req.Put('employee/'+$$("EmployeesTable").getSelectedItem().Id+'/assessment/'+lastId, "").then(
            function (result) {
                GetEmployees();
                if (latestAction === "main") {
                    GetTable();
                }
                if(latestAction === "archive"){
                    GetArchive();
                }
                if (latestAction === "search"){
                    Search();
                }
                $$("EmployeeWindow").hide();
            }
        )
    }
    else{
        webix.message("Сотрудник не выбран");
    }

}

export function GetAllEmployees() {
    $$("EmployeeWindow").show();
    var req = new Request();
    req.Get('employee').then(function (res){
        if (typeof res['Message'] == "undefined") {
            $$("EmployeesTable").clearAll();
            res.forEach(function(elem, index){
                $$("EmployeesTable").add(elem)
            });
        }
        else {
            console.log(candidates.Message.value)
        }
    });
}

export function Search(){
    latestAction = "search";
    var data = {
        Id: 0,
        Status: $$("searchStatus").getValue(),
        Date: $$("searchDate").getText(),
        Cabinet:$$("searchCabinet").getValue()

    };
    clearRightPart();
    var req = new Request();
    req.Post('assessment/search', data).then(function (res){
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