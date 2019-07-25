let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let selectYear = document.getElementById('calendarYear');
const YEAR_RANGE = 3;

let apiToken = sessionStorage.getItem('apiToken');

document.getElementById('calendarMonth').getElementsByTagName('option')[month].selected = true;

for (let i = 0; i < YEAR_RANGE; i++) {
    let option = document.createElement('option');
    option.value = year + i;
    option.text = year + i;
    selectYear.appendChild(option)
}

function isEmpty(obj) {
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)) return false;
    }
    return true;
}

function sendGetRequest(url) {
    let headers = {'Authorization': 'Token ' + apiToken};
    console.log(headers);
    fetch(url, {headers: new Headers(headers)})
      .then(response => response.json())
       .then(data => {
           console.log(data) // Prints result from `response.json()` in getRequest
       })
       .catch(error => console.error(error))
}


$('#calendarForm').on('submit', function (event) {
    event.preventDefault();
    let values = {};
    $.each($('#calendarForm').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });

    let urlString = '/api/v1/calendar?' + $.param(values);

    sendGetRequest(urlString)

});



