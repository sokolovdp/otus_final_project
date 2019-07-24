/*
    Process login form: call login API, and in case of success redirect to main page
*/

var ApiToken = '';

function successFunction(xhttp) {
    let jsonString = xhttp.responseText;
    let message = 'You have logged in, API token='
    let json_data = JSON.parse(jsonString)

    ApiToken = json_data.token
    sessionStorage.setItem('apiToken', ApiToken);

    document.getElementById("login-result").innerHTML = message + ApiToken;
    document.getElementById("login-result").className = 'alert alert-success';
}


function failFunction(xhttp) {

    document.getElementById("login-result").innerHTML = 'Pair login/password is invalid!';
    document.getElementById("login-result").className = 'alert alert-danger';
}


function sendPostRequest(url, jsonString) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            successFunction(this);
        }
        if (this.readyState == 4 && this.status != 200) {
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

    sendPostRequest('/api/v1/get_auth_token', jsonString)
});


