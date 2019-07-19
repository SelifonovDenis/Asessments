import {loginResult} from "./component";

export function loginJSON(data)
{
    var url = 'login';

    fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(data), // data может быть типа `string` или {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => loginResult(JSON.stringify(response)))
        .catch(error => alert('Ошибка:', error));

}


