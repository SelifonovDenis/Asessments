import {login} from "./component";

export function auth(){
    //клик по кнопке "войти"
    $$("Auth").attachEvent("onItemClick",function(){
        login();
    });
}