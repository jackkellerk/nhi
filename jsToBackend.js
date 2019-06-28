// This is the javascript file I added for the connection to the backend
var theData = {"username": "admin", "password": "password"};

function loginToBackend()
{

    // This works for GET Requests
    $.ajax({
        method: 'GET',
        // data: theData,
        url: 'http://localhost:4567',
        dataType: 'text',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            alert(data);
        },
        error: function(xhr, status, error) {
            alert(xhr.responseText);
        }
    });

    // This works for POST Requests
    var root = 'localhost:4567';
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(theData),
        url: root + '/login',
        dataType: 'json',
        success: function(data) {
            alert(JSON.stringify(data));
        },
        error: function(error) {
            alert("Error");
        }
    })
}
