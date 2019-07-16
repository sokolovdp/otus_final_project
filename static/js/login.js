/*
    Process login form: call login API, and in case of success redirect to main page
*/


$('#login_form').on('submit', function (event) {
    event.preventDefault();
    let values = {};
    $.each($('#login_form').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    let json_data = JSON.stringify(values);
    console.log(json_data);
    /*$.ajax({
      type: 'POST',
      url: 'https://url.com/users/register',
      dataType: 'json',
      data: json,
      contentType: 'application/json',
      success: function(data) {
        alert(data)
      }
    });*/
});

