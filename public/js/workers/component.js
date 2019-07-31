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
    employees.forEach(function(elem, index){
        if(id === elem.Id)
        {
            $$("changeFirstName").setValue(elem.First_name);
            $$("changeLastName").setValue(elem.Last_name);
            $$("changeMiddleName").setValue(elem.Middle_name);
            $$("changePhone").setValue(elem.Phone);
            $$("changeEmail").setValue(elem.Email);
            $$("changeWindow").show();
        }
    });
}

var employees;

export function GetTable() {
    clearRightPart();
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
    $$("removeEmployee").disable();
    $$("dates").clearAll();
}

var EmployeeAssessments;

//отображение назначенных дат собеседований выбранного сотрудника в правой части
export function GetEmployeeAssessments() {
    $$("changeButton").enable();
    $$("removeAssessment").enable();
    $$("removeEmployee").enable();
    $$("butAddDate").enable();
    $$("dates").clearAll();
    var req = new Request();
    req.Get('employee/'+$$("datatable").getSelectedItem().Id+'/assessment/').then(function (res){
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
        Id: $$("datatable").getSelectedItem().Id,
        First_name: $$("changeFirstName").getValue(),
        Last_name: $$("changeLastName").getValue(),
        Middle_name: $$("changeMiddleName").getValue(),
        Phone: $$("changePhone").getValue(),
        Email: $$("changeEmail").getValue(),
    };

    if ($$("changeForm").validate()) {
        var req = new Request();
        req.Post('employee', data).then(
            function (result) {
                GetTable();
                $$("changeWindow").hide();
            }
        )
    } else {
        webix.message("Заполните все поля")
    }

}

export function RemoveAssessment() {
    var req = new Request();
    req.Delete('employee/'+$$("datatable").getSelectedItem().Id+'/assessment/'+$$('dates').getSelectedItem().Id).then(
        function (result) {

            GetEmployeeAssessments();
        }
    )
}

export function RemoveEmployee() {
    var req = new Request();
    req.Delete('employee/'+$$("datatable").getSelectedItem().Id).then(
        function (result) {

            GetTable();
        }
    )
}

export function AddEmployeeAssessment() {
    var req = new Request();
    if (typeof $$("Date").getSelectedItem() != "undefined") {
        req.Put('employee/'+$$("datatable").getSelectedItem().Id+'/assessment/'+$$("Date").getSelectedItem().Id, "").then(
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