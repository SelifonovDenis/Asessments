import {AddToTable} from "./component"
import {viewCandidate} from "./component"
import {AddResult} from "./component"

//получить всех кандидатов
export function GetCandidates()
{
    var url = 'candidate';
    fetch(url, {
        method: 'GET'
    }).then(res => res.json())
        .then(response => AddToTable(JSON.stringify(response)))
        .catch(error => console.log(error));
}

//получить кандидата
export function GetCandidate(id)
{
    var url = 'candidate/'+id;
    fetch(url, {
        method: 'GET'
    }).then(res => res.json())
        .then(response => viewCandidate(JSON.stringify(response)))
        .catch(error => console.log(error));
}

export function AddCandidate(data) {
    var url = 'candidate';

    fetch(url, {
        method: 'PUT', // или 'PUT'
        body: JSON.stringify(data), // data может быть типа `string` или {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => AddResult())
        .catch(error => console.log(error));

}