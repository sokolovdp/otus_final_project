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
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
}

function failGetFunction(error) {
    console.error(error)
}

function checkResponseStatus(response) {
    let result = {};

    if (response.status !== 200) {
        // make the promise be rejected if we didn't get a 200 response
        throw new Error("API response error: " + response.status)
    } else {
        result = response.json()
        // console.log(result)
    }
    return result
}

function drawCalendar(coursesList) {
    console.log(coursesList)
}

function sendGetRequest(url) {
    let headers = {'Authorization': 'Token ' + apiToken};

    fetch(url, {headers: new Headers(headers)})
        .then(response => checkResponseStatus(response))
        .then(result => {
            drawCalendar(result)
        })
        .catch(error => failGetFunction(error));
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



