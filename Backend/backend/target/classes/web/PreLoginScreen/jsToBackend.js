// This is the javascript file I added for the connection to the backend
function loginToBackend()
{
    // converts the username into json
    var username = userTextBox.text;
    var convertToJSON = {"username": username, "password": password};

    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(convertToJSON),
        url: 'http://localhost:4567/login', // change to 8080 if this doesnt work
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            alert(JSON.stringify(data));
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}
