import {welcome} from "./view";
import {Manager} from "../EventManagers/assessmentManager";
import {GetTable} from "../components/assessmentComponent";
webix.ready(function () {
    welcome();
    Manager();
    GetTable();
})