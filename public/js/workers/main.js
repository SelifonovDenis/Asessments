
import {welcome} from "./view";
import {Manager} from "../EventManagers/employeeManager";
import {GetTable} from "../components/employeeComponent";
webix.ready(function () {
    welcome();
    Manager();
    GetTable();
})
