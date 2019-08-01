import {login} from "../components/loginComponent";

export function auth(){
    //клик по кнопке "войти"
    $$("Auth").attachEvent("onItemClick",function(){
        login();
    });
}