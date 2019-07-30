
import {welcome} from "./view";
import {Manager} from "./EventManager";
import {GetTable} from "./component";
webix.ready(function () {
    welcome();
    Manager();
    GetTable();
})
