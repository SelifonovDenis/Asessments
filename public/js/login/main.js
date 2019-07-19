
import {welcome} from "./view";
import {auth} from "./EventManager"
webix.ready(function () {
    welcome();
    auth();
})

