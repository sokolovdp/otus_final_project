/*
    Process login form: call login API, and in case of success redirect to main page
*/

var ApiToken = '';

function successFunction(xhttp) {
    //
    let jsonString = xhttp.responseText;
    console.log('SUCCESS!!!', xhttp.status, xhttp.responseText);
    document.getElementById("invalid-login").innerHTML = '';
}


function failFunction(xhttp) {
    //
    console.log('FAIL!!!', xhttp.status);
    document.getElementById("invalid-login").innerHTML = 'Pair Login/Password are invalid';
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


$('#login_form').on('submit', function (event) {
    event.preventDefault();
    let values = {};
    $.each($('#login_form').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    let jsonString = JSON.stringify(values);
    console.log(jsonString);
    sendPostRequest('/api/v1/login', jsonString)
});


