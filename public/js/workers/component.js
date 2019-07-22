import {worker} from "./view"
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
    worker.forEach(function(elem, index){
        if(id === elem.id)
        {
            $$("changeFamily").setValue(elem.family);
            $$("changeName").setValue(elem.name);
            $$("changeSubname").setValue(elem.subname);
            $$("changePhone").setValue(elem.phone);
            $$("changeEmail").setValue(elem.email);
            $$("changeWindow").show();
        }
    });

}
export var asessment = [];
asessment [0] = {
    id: 1,
    active:0,
    date:"25.06.19",
    room:"2",
    id_worker:3,
}
asessment [1] = {
    id: 2,
    active:0,
    date:"25.07.19",
    room:"3",
    id_worker:2,
}
asessment [2] = {
    id: 3,
    active:0,
    date:"25.08.19",
    room:"4",
    id_worker:1,
}
//отображение назначенных дат собеседований выбранного сотрудника в правой части
export function view(id){
    $$("changeButton").enable();
    $$("butAddDate").enable();
    $$("dates").clearAll();
    worker.forEach(function(elem, index){
        if(id === elem.id)
        {
            asessment.forEach(function(aseselem){
                if (elem.id === aseselem.id_worker) {
                    $$("dates").add({
                        id: aseselem.id,
                        title: aseselem.date,
                    },0)
                }

            })

        }
    });
}
