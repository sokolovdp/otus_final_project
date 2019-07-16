/*
    Process login form: call login API, and in case of success redirect to main page
*/

function sendApiRequest(url, method, json) {
    $.ajax({
        'url': url,
        'data': json,
        'method': method,
        'dataType': 'json',
        'contentType': 'application/json',
        'processData': false,
    })
    .done(function (returnedHtml) {
        $("#responseDiv").append(returnedHtml);
    })
    .fail(function () {
        $("#responseDiv").append("This failed");
    });
}


$('#login_form').on('submit', function (event) {
    event.preventDefault();
    let values = {};
    $.each($('#login_form').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    let json_data = JSON.stringify(values);
    console.log(json_data);
    sendApiRequest('/api/vi/login', 'POST', json_data)
});

