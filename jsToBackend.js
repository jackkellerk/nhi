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
            currentActivity = "AllProjects";
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

function signUpBackend()
{
    var username = SU_userTextBox.text;
    var email = SU_emailTextBox.text;
    var password = SU_passwordTextBox.text;
    var confirmPassword = SU_repasswordTextBox.text;
    var legalName = /* SU_legalNameTextBox.text; */ "James Kellerk";
    var institution = /* SU_institutionTextBox.text; */ "Lehigh";
    var convertToJSON = {"username": username, "password": password, "email": email, "legalname": legalName, "institution": institution};

    if(confirmPassword != password)
    {
        alert("Passwords do not match! Try again!");
        return;
    }

    // Ensures the email must be an edu email address
    if(!email.includes(".edu"))
    {
        alert("Not a valid email address!");
        return;
    }

    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(convertToJSON),
        url: 'http://localhost:4567/signup', // change to 8080 if this doesnt work
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            currentActivity = "AllProjects";
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}
