import {welcome} from "./view";
import {Manager} from "../EventManagers/indexManager";
import {GetTable} from "../components/indexComponent";

webix.ready(function () {
    welcome();
    Manager();
    GetTable();
})
