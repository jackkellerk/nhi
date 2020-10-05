// This is the javascript file I added for the connection to the backend

// '/i/uploadPython' for uploading custom python script

//get the hosting url.
var base_url = location.protocol + '//' + location.host;
var uid;
var session_key;

/**
 * LOGIN AND ACCOUNT AJAX REQUESTS
 */

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
            console.log(callback.data)
            //createUIProjects();
            }
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

/**
 * PORJECT RELATED AJAX REQUESTS
 */

function getProject()
{
    while(listOfProjectIDs.length > 0)
    {
        $.ajax({
            method: 'GET',
            contentType: 'application/json',
            headers: {"uid": uid, "session_key": session_key},
            url: base_url + '/p/' + listOfProjectIDs[listOfProjectIDs.length - 1],
            dataType: 'json',
            crossDomain: 'true',
            xhrFields: {
                withCredentials: true
            },
            success: function(callback) 
            {
                if(callback.errorCode == 703)
                {
                    alert("Error loading the sources list!");
                }
                else
                {
                    // parse callback.data, which is an JsonObject, the field project contains
                    // pid, name, date_creation, thumbnail (blank since not implemented yet), canvas_width, canvas_height, properties, institution,
                    // the field windows is an JsonArray of windows, each element contains
                    // wid, iid, pid, thumbnail, image_box, window_box, date_creation, minimized
                    // image_box and window_box are two JsonObjects, both contain pos_x, pos_y, width, height

                    // Also remove the last element of the array
                }
            },
            error: function(xhr, status, error) 
            {
                alert("Internal Server Error at Ajax GET /project at client: 500");
            }
        });
    }
}

function getOneProject(project_ID)
{
    // This loads the information about the userSettings
    //var username = userTextBox.text;
    $.ajax({
        method: 'GET',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        url: base_url + '/p/' + project_ID,
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
            //userSettingsResponse = callback.data;
            //createUIProjects();
            console.log(callback)
            }
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

function getProjects()
{
    // This loads the information about the userSettings
    //var username = userTextBox.text;
    $.ajax({
        method: 'GET',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        url: base_url + '/project',
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
            
            console.log(callback)
            //project_list is an object that has 2D array containing all projects info
            project_list = Object.entries((callback.data).array);
            //console.log(project_list);
            //userSettingsResponse = callback.data;
            createUIProjects();
            
            
            //end     
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
    let responseData = {name: name, 
        canvas_width: canvasWidth, 
        canvas_height: canvasHeight, 
        properties: properties, 
        institution: institution, 
        sources: sources};
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

function getListOfProjects()
{
    $.ajax({
        method: 'GET',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        url: base_url + '/p/'  /* + */ /* Ask Desai what to put here */,
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) 
        {
            if(callback.errorCode == 703)
            {
                alert("Error loading the sources list!");
            }
            else
            {
                // parse callback.data, which is an JsonObject, the field project contains an array of project ids to be fetched
                // Then call the function getProjects below
            }
        },
        error: function(xhr, status, error) 
        {
            alert("Internal Server Error at Ajax GET /project at client: 500");
        }
    });
}

/**
 * WORKSPACE RELATE AJAX REQUESTS (RELATING TO TOOLS AND WINDOWS OF A PROJECT)
 */

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

var listOfProjectIDs = [];
var examplePositionX = 300;
var examplePositionY = 300;



//Creating new line
function postNewLine(lid, x1, y1, x2, y2)
{
    var convertToJSON = {"lid": lid, "x1": x1, "y1": y1, "x2": x2, "y2": y2};
    //Here a :wid is needed in the url. There's only one window in the database so this id is hard coded
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        data: JSON.stringify(convertToJSON),
        url: base_url + "/w/" + 31 + "/new_line",
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 5000");
        }
    });
}

//updates line
function updateLine(lid, x1, y1, x2, y2)
{

    //Here a :wid is needed in the url. There's only one window in the database so this id is hard coded
    var convertToJSON = {"lid": lid, "x1": x1, "y1": y1, "x2": x2, "y2": y2};
    $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        data: JSON.stringify(convertToJSON),
        url: base_url + "/w/" + 31 + "/update_line",
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            console.log(callback.data);
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 5000");
        }
    });
}

//Delete line
function deleteLine(lid)
{
    //Here a :wid is needed in the url. There's only one window in the database so this id is hard coded
    var convertToJSON = {"lid": lid};
    $.ajax({
        method: 'DELETE',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        data: JSON.stringify(convertToJSON),
        url: base_url + "/w/" + 31 + "/remove_line",
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            console.log(callback.data);
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

//Gathers the desired line
function getLine(lid)
{
    //Here a :wid is needed in the url. There's only one window in the database so this id is hard coded
    var convertToJSON = {"lid": lid};
    $.ajax({
        method: 'GET',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        data: JSON.stringify(convertToJSON),
        url: base_url + "/w/" + 31 + "/line",
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            return callback.data;
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}


//Collects all lines associated with the window
function getAllLines()
{
    //Here a :wid is needed in the url. There's only one window in the database so this id is hard coded
    $.ajax({
        method: 'GET',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": session_key},
        url: base_url + '/w/' + 31 + '/all_lines',
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) 
        {
            return callback.data;
        },
        error: function(xhr, status, error) 
        {
            alert("Internal Server Error at Ajax GET /project at client: 500");
        }
    });
}

/**
 * IMAGE RELATED AJAX REQUESTS 
 */

function uploadImage(fileName, fileData, user, project){
    var convertToJSON = {"fileName": fileName, "fileData" : fileData,
        "user" : user, "project" : project};
    var uid = 8;
    var sessionkey = "test_session_key";
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(convertToJSON),
        headers: {"uid": uid, "session_key": sessionkey},
        url: location.protocol + '//' + location.host   + '/i/upload',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            console.log(callback)
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

function testDirectories(){
    var uid = 8;
    var sessionkey = "test_session_key";
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": sessionkey},
        url: location.protocol + '//' + location.host   + '/i/checkimages'+ "?uid=" + uid + "&session_key=" + sessionkey,
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {
            console.log(callback)
        },
        error: function(xhr, status, error) {
            alert("Internal Server Error: 500");
        }
    });
}

// This is called when the python button on the window is clicked
function uploadCustomPythonScript()
{
    var input = document.createElement('input');
    input.type = 'file';

    // This is the lambda function that is called once the user actually uploads their file
    input.onchange = e => { 
        var file = e.target.files[0];
        var formattedText = "print(\"Images/Picture1.png\")";
        // TODO: extract text from file and send it in AJAX

        // This is the temporary loading screen that appears when uploading a python script
        loadingcontainer = new PIXI.Container();

        loadingWindow = new PIXI.Graphics();
        loadingWindow.beginFill(0x000000);
        loadingWindow.drawRoundedRect(-10, -10, screen.width, screen.height);
        loadingWindow.endFill();
        loadingWindow.alpha = 0.5;
        loadingWindow.interactive = true;
        loadingcontainer.addChild(loadingWindow);

        roundedBox = new PIXI.Graphics();
        roundedBox.beginFill(0xbababa);
        roundedBox.drawRoundedRect(screen.width / 2.75, screen.height / 5, screen.width / 4, screen.width / 4, 10);
        roundedBox.endFill();
        loadingcontainer.addChild(roundedBox);

        let LoadingText = new PIXI.Text('Please wait\n  Loading....', {fontFamily : 'Arial', fontSize: 24, fill: 0x000000, align : 'center'} );
        LoadingText.x = screen.width / 2.25;
        LoadingText.y = screen.height / 2.75;
        loadingcontainer.addChild(LoadingText);

        app.stage.addChild(loadingcontainer);

        // AJAX portion of the upload script
        var uid = 8;
        var sessionkey = "test_session_key";
        var image_url = "Images/sinteredMetal.png" // This is hard coded, make this dynamic later
        let responseData = { text: formattedText, image: image_url };
        $.ajax({
            method: 'POST',
            contentType: 'application/json',
            headers: {"uid": uid, "session_key": sessionkey},
            data: JSON.stringify(responseData),
            url: base_url + '/i/uploadPython',
            dataType: 'json',
            crossDomain: 'true',
            xhrFields: {
                withCredentials: true
            },
            success: function(callback) {
                // TODO: Handle the image once it gets it back

                // This removes the loading screen
                loadingcontainer.parent.removeChild(loadingcontainer);
            },
            error: function(xhr, status, error) {
                alert("Internal Server Error: 500");

                // This removes the loading screen
                loadingcontainer.parent.removeChild(loadingcontainer);
            },
            timeout: 20000 // 20 second time out
        });
    }

    input.click();

    // Remove window1 and replace it
    window1.container.parent.removeChild(window1.container);
    var window2 = new WorkWindow("Window 1", 0, 0, "Images/Picture1.png");
}