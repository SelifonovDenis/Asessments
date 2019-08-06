import Request from "../providers/Provider";

export function viewAdd(){
    $$("add").show();
}
export function viewAddDate(){
    $$("addDate").show();

}
export function redirect(str){
    window.location.href = str;
}

var lastId = 0;
var latestAction = "main";

//отображение атрибутов кандидата в окне изменения
export function viewChange(){
    employees.forEach(function(elem, index){
        if(lastId === elem.Id)
        {
            $$("changeFirstName").setValue(elem.First_name);
            $$("changeLastName").setValue(elem.Last_name);
            $$("changeMiddleName").setValue(elem.Middle_name);
            $$("changePhone").setValue(elem.Phone);
            $$("changeEmail").setValue(elem.Email);
            $$("changeStatus").setValue(elem.Status);
            $$("changeArchive").setValue(elem.Archive);
            $$("changeWindow").show();
        }
    });
}

var employees;

export function GetTable() {

    latestAction= "main";
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

export function clearRightPart() {
    $$("changeButton").disable();
    $$("butAddDate").disable();
    $$("removeAssessment").disable();
    $$("AddArchive").disable();
    $$("dates").clearAll();
    lastId = 0;
}

var EmployeeAssessments;

//отображение назначенных дат собеседований выбранного сотрудника в правой части
export function GetEmployeeAssessments() {
    $$("changeButton").enable();
    $$("AddArchive").enable();
    $$("butAddDate").enable();
    $$("dates").clearAll();

    if (typeof $$("datatable").getSelectedItem() != "undefined") {
        lastId = $$("datatable").getSelectedItem().Id;
    }

    var req = new Request();
    req.Get('employee/'+lastId+'/assessment/').then(function (res){
        EmployeeAssessments = res;
        if (typeof EmployeeAssessments['Message'] == "undefined") {
            $$("Date").clearAll();
            EmployeeAssessments.forEach(function(elem, index){
                $$("dates").add({
                    Id: elem.Id,
                    title: elem.Date,
                },0)
            });
        }
        else {
            console.log(EmployeeAssessments.Message.value)
        }
    });
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

export function AddEmployee() {
    var data = {
        First_name: $$("addFirstName").getValue(),
        Last_name: $$("addLastName").getValue(),
        Middle_name: $$("addMiddleName").getValue(),
        Phone:$$("addPhone").getValue(),
        Email:$$("addEmail").getValue(),
    };

    if ($$("addForm").validate())
    {
        var req = new Request();
        req.Put('employee', data).then(
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

//изменить
export function SaveChange() {
    var data = {
        Id: lastId,
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
        req.Post('employee', data).then(
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

export function RemoveAssessment() {
    var req = new Request();
    req.Delete('employee/'+lastId+'/assessment/'+$$('dates').getSelectedItem().Id).then(
        function (result) {
            GetEmployeeAssessments();
            $$("removeAssessment").disable();
        }
    )
}

export function AddEmployeeAssessment() {
    var req = new Request();
    if (typeof $$("Date").getSelectedItem() != "undefined") {
        req.Put('employee/'+lastId+'/assessment/'+$$("Date").getSelectedItem().Id, "").then(
            function (result) {
                GetEmployeeAssessments();
                $$("addDate").hide();
            }
        )
    }
    else{
        webix.message("Дата не выбрана");
    }

}

export function AddArchive() {
    var data;
    employees.forEach(function (elem) {
        if (elem.Id === lastId) {
            data = {
                Id: lastId,
                First_name: elem.First_name,
                Last_name: elem.Last_name,
                Middle_name: elem.Middle_name,
                Phone: elem.Phone,
                Email: elem.Email,
                Status: elem.Status,
                Archive: 1,
            };
        }
    })


    var req = new Request();
    req.Post('employee', data).then(
        function (result) {
            if (latestAction === "main") {
                GetTable();
            } else{
                Search();
            }
            $$("changeWindow").hide();
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
    };
    clearRightPart();
    var req = new Request();
    req.Post('employee/search', data).then(function (res){
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