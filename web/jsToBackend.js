// This is the javascript file I added for the connection to the backend

//get the hosting url.
var base_url = location.protocol + '//' + location.host;
console.log(base_url);
var uid;
var session_key;

function loginToBackend()
{
    // converts the username into json
    var username = userTextBox.text;
    var password = loginPassword;
    var convertToJSON = {"email": username, "password": password};

    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(convertToJSON),
        url: base_url + '/login',
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            if(callback.errorCode != 0)
            {
                alert("Incorrect Email or Password");
                return;
            }
            uid = callback.data.uid;
            session_key = callback.data.session_key;
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
    var email = SU_emailTextBox.text;
    var password = signUpPassword;
    var confirmPassword = signUpRePassword;
    var legalName = legalTextBox.text;
    var institution = institutionTextBox.text;
    var convertToJSON = {"password": password, "email": email, "legal_name": legalName, "institution": institution};

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
        url: base_url + '/signup',
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            if(callback.errorCode != 0)
            {
                 alert("User already exist!");
            }
            uid = callback.data.uid;
            session_key = callback.data.session_key;
            userTextBox.text = email;
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
    var username = userTextBox.text;
    $.ajax({
        method: 'GET',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        url: base_url + '/user',
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            if(callback.errorCode == 703)
            {
                alert("Error loading the user settings!");
            }
            else{
            userSettingsResponse = callback.data;
            createUIProjects();
            }
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

function getAllSources()
{
    // This loads the information about the userSettings
    $.ajax({
        method: 'GET',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        url: base_url + '/sources',
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            if(callback.errorCode == 703)
            {
                alert("Error loading the sources list!");
            }
            else{
            sourcesListResponse = callback.data;
            }
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

// name: String, canvasWidth: float, canvasHeight: float
function postNewProject(name, canvasWidth, canvasHeight, properties, institution, sources)
{
    // let newProjectSettings = {newProjectSettings: data};
    let responseData = {name: name, canvas_width: canvasWidth, canvas_height: canvasHeight, properties: properties, institution: institution, sources: sources};
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        data: JSON.stringify(responseData),
        url: base_url + '/project/create',
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            // if(callback.errorCode != 0)
            // {
            //     alert("Error loading the user settings!");
            // }
            // userSettingsResponse = callback.data;
            // createUIProjects();
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

function getCurrentProject(pid)
{
    $.ajax({
        method: 'GET',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        url: base_url + '/p/' + pid,
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            if(callback.errorCode == 703)
            {
                alert("Error loading the sources list!");
            }
            else{
                // parse callback.data, which is an JsonObject, the field project contains
                // pid, name, date_creation, thumbnail (blank since not implemented yet), canvas_width, canvas_height, properties, institution,
                // the field windows is an JsonArray of windows, each element contains
                // wid, iid, pid, thumbnail, image_box, window_box, date_creation, minimized
                // image_box and window_box are two JsonObjects, both contain pos_x, pos_y, width, height
            }
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error at Ajax GET /project at client: 500");
        }
    });
}

// name: String, canvasWidth: float, canvasHeight: float
function postNewWindow(pid)
{
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        url: base_url + '/p/' + pid + '/new_window_default',
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}
