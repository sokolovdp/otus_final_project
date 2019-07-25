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

$('#calendarForm').on('submit', function (event) {
    event.preventDefault();
    let values = {};
    $.each($('#calendarForm').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    let jsonString = JSON.stringify(values);

    console.log(jsonString, apiToken)

    // sendPostRequest('/api/v1/calendar', jsonString)
});



