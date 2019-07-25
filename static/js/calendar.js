const YEAR_RANGE = 3;
const apiToken = sessionStorage.getItem('apiToken');

function drawMonthYearForm() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const selectYear = document.getElementById('calendarYear');

    document.getElementById('calendarMonth')
        .getElementsByTagName('option')[month]
        .selected = true;

    for (let i = 0; i < YEAR_RANGE; i++) {
        let option = document.createElement('option');
        option.value = year + i;
        option.text = year + i;
        selectYear.appendChild(option)
    }
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
        throw new Error("API response status: " + response.status)
    } else {
        result = response.json()
    }
    return result
}

function drawCalendar(coursesList) {
    let coursesListElement = document.getElementById('coursesListTag');
    $(coursesListElement).empty();  // clear previous calendar data

    coursesList.forEach(function (course) {
        let liText =
            'Id: ' + course.id +
            ' starts on: ' + course.start_date +
            ' title: ' + course.course.title +
            ' price: ' + course.course.price + '$';
        let liElement = document.createElement('li');
        let textElement = document.createTextNode(liText);
        let aElement = document.createElement('a');

        liElement.className = "list-group-item list-group-item-action";
        aElement.appendChild(textElement);
        aElement.title = liText;
        aElement.href = "#"
        liElement.appendChild(aElement);
        coursesListElement.appendChild(liElement)
    });
}

function sendGetRequest(url) {
    const headers = {'Authorization': 'Token ' + apiToken};

    fetch(url, {headers: new Headers(headers)})
        .then(response => checkResponseStatus(response))
        .then(result => {
            drawCalendar(result)
        })
        .catch(error => failGetFunction(error));
}

drawMonthYearForm();

$('#calendarForm').on('submit', function (event) {
    event.preventDefault();
    let values = {};
    $.each($('#calendarForm').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });

    const urlString = '/api/v1/calendar?' + $.param(values);
    sendGetRequest(urlString)

});



