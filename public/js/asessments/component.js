
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
    asessment.forEach(function(elem, index){
        if(id === elem.id)
        {
            $$("changeDate").setValue(elem.date);
            $$("changeRoom").setValue(elem.room);
            $$("changeWorker").setValue(elem.id_worker);
            $$("changeWindow").show();
        }
    });

}
//Кандидаты
var candidate = [];
candidate [0] = {
    id: 1,
    active:0,
    family: "Иванов",
    name: "Иван",
    subname:"Иванович",
    phone:"8 800 555 35 35",
    email:"Ivan@mail.ru",
    status:"Назначено собеседование",
    id_date:1
}
candidate [1] = {
    id: 2,
    active:0,
    family: "Петров",
    name: "Петр",
    subname:"Петрович",
    phone:"8 500 444 44 44",
    email:"petya@mail.ru",
    status:"Принят на стажировку",
    id_date:2
}
candidate [2] = {
    id: 3,
    active:0,
    family: "Николаев",
    name: "Игорь",
    subname:"Николаевич",
    phone:"8 333 333 22 22",
    email:"Ivan@mail.ru",
    status:"Отправлен оффер",
    id_date:1
}

//отображение назначенных дат собеседований выбранного сотрудника в правой части
export function view(id){
    $$("changeButton").enable();
    $$("butAddDate").enable();
    $$("candidates").clearAll();
    candidate.forEach(function(elem, index){
        if(id === elem.id_date)
        {

                $$("candidates").add({
                    id:elem.id,
                    title: elem.family+" "+elem.name+" "+elem.subname,
                },0)

        }
    });
}
