
import {welcome} from "./view";
import {auth, Manager} from "./EventManager"
webix.ready(function () {
    welcome();
    Manager();
})
