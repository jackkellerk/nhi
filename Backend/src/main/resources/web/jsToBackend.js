// This is the javascript file I added for the connection to the backend

var base_url = "nhitest.lehigh.edu";

function loginToBackend()
{
    // converts the username into json
    var username = userTextBox.text;
    var password = passwordTextBox.text;
    var convertToJSON = {"username": username, "password": password};

    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(convertToJSON),
        url: 'http://' + base_url + '/login', // change to 8080 if this doesnt work
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if(data.errorCode != 0)
            {
                alert("Incorrect Username or Password");
                return;
            }
            toProjectSelection();
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
    var legalName = legalTextBox.text;
    var institution = institutionTextBox.text;
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
        url: 'http://' + base_url + '/signup',
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            userTextBox.text = username;
            toProjectSelection();
            currentActivity = "AllProjects";
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

function gatherUserSettings()
{
    // This loads the information about the userSettings
    var username = userTextBox.text; // This will probably be global and accessable from the login screen files, but for now it is here
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"username": username}),
        url: 'http://' + base_url + '/usersettings',
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            userSettingsResponse = data;
            createUIProjects();
        },
        error: function(xhr, status, error) {
            console.log()
            alert("Error loading user settings!");
        }
    });

    // eventually create more functions that wait for database information and create the UI last
}
