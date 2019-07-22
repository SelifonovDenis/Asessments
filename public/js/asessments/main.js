
import {welcome} from "./view";
import {Manager} from "./EventManager"
webix.ready(function () {
    welcome();
    Manager();
})
