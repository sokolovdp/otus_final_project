/*
    Process login form: call login API, and in case of success redirect to main page
*/

function successFunction(xhttp) {
    let jsonString = xhttp.responseText;
    let message = 'You have logged in, API token=';
    let json_data = JSON.parse(jsonString);

    let apiToken = json_data.token;
    sessionStorage.setItem('apiToken', apiToken);

    document.getElementById("login-result").innerHTML = message + apiToken;
    document.getElementById("login-result").className = 'alert alert-success';

    window.location.href = "../../templates/js/calendar.html";
}


function failFunction(xhttp) {
    document.getElementById("login-result").className = 'alert alert-danger';
    if (xhttp.status === 400) {
        document.getElementById("login-result").innerHTML = 'Pair login/password is invalid!';
    } else {
        document.getElementById("login-result").innerHTML = 'Server error: ' + xhttp.status;
    }
}


function sendAuthPostRequest(url, jsonString) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            successFunction(this);
        }
        if (this.readyState === 4 && this.status !== 200) {
            failFunction(this);
        }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(jsonString);
}


$('#loginForm').on('submit', function (event) {
    event.preventDefault();
    let values = {};
    $.each($('#loginForm').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    let jsonString = JSON.stringify(values);

    sendAuthPostRequest('/api/v1/get_auth_token', jsonString);
});


