
import {welcome} from "./view";
import {auth} from "../EventManagers/loginManager"
webix.ready(function () {
    welcome();
    auth();
})

