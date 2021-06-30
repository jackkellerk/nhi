// This is the javascript file I added for the connection to the backend

// '/i/uploadPython' for uploading custom python script

//get the hosting url.
var base_url = location.protocol + '//' + location.host;
var uid;
var session_key;

/**
 * LOGIN AND ACCOUNT AJAX REQUESTS
 */


 function tempTest()
 {
     // converts the username into json
     var number;
     var convertToJSON = {"number": number};
 
     $.ajax({
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(convertToJSON),
         url: base_url + '/sripts/test',
         dataType: 'json',
         crossDomain: 'true',
         xhrFields: {
             withCredentials: true
         },
         success: function(callback) {
             if(callback.errorCode != 0)
             {
                 alert("Incorrect");
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

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
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

// This is a variable with a variable fileData.a that has a listener function that calls sendPythonScript() once the variable is changed
fileData = {
    aInternal: "",
    aListener: function(val) {},
    set a(val) {
        this.aInternal = val;
        this.aListener(val);
    },
    get a() {
        return this.aInternal;
    },
    registerListener: function(listener) {
        this.aListener = listener;
    }
}

fileData.registerListener(function(val) {
    askUI();
});

var variable_dictionary = [];

function parseFile(file)
{
    if (file.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) { 
        var fileInfo = event.target.result;
        fileInfo = fileInfo.replace(/\n/g, "`n");
        fileInfo = fileInfo.replace(/\t/g, "`t");
        fileInfo = fileInfo.replace(/ /g, "`s");

        var start_value = 0;
        while(fileInfo.indexOf("$NHI_Integer", start_value) > 0)
        {
            beginning_var_name = fileInfo.indexOf("$NHI_Integer", start_value);
            while(fileInfo.substring(beginning_var_name - 2, beginning_var_name) != "`n")
            {
                beginning_var_name = beginning_var_name - 1;
            }
            is_space = fileInfo.indexOf("=", beginning_var_name) > fileInfo.indexOf("`s", beginning_var_name) && fileInfo.indexOf("`s", beginning_var_name) > 0 ? fileInfo.indexOf("`s", beginning_var_name) : fileInfo.indexOf("=", beginning_var_name);
            start_value = start_value + fileInfo.indexOf("$NHI_Integer", start_value) + 1;
            variable_dictionary.push(["Integer", fileInfo.substring(beginning_var_name, is_space), ""])
        }

        start_value = 0;
        while(fileInfo.indexOf("$NHI_Float", start_value) > 0)
        {
            beginning_var_name = fileInfo.indexOf("$NHI_Float", start_value);
            while(fileInfo.substring(beginning_var_name - 2, beginning_var_name) != "`n")
            {
                beginning_var_name = beginning_var_name - 1;
            }
            is_space = fileInfo.indexOf("=", beginning_var_name) > fileInfo.indexOf("`s", beginning_var_name) && fileInfo.indexOf("`s", beginning_var_name) > 0 ? fileInfo.indexOf("`s", beginning_var_name) : fileInfo.indexOf("=", beginning_var_name);
            start_value = start_value + fileInfo.indexOf("$NHI_Float", start_value) + 1;
            variable_dictionary.push(["Float", fileInfo.substring(beginning_var_name, is_space), ""])
        }

        start_value = 0;
        while(fileInfo.indexOf("$NHI_String", start_value) > 0)
        {
            beginning_var_name = fileInfo.indexOf("$NHI_String", start_value);
            while(fileInfo.substring(beginning_var_name - 2, beginning_var_name) != "`n")
            {
                beginning_var_name = beginning_var_name - 1;
            }
            is_space = fileInfo.indexOf("=", beginning_var_name) > fileInfo.indexOf("`s", beginning_var_name) && fileInfo.indexOf("`s", beginning_var_name) > 0 ? fileInfo.indexOf("`s", beginning_var_name) : fileInfo.indexOf("=", beginning_var_name);
            start_value = start_value + fileInfo.indexOf("$NHI_String", start_value) + 1;
            variable_dictionary.push(["String", fileInfo.substring(beginning_var_name, is_space), ""])
        }

        start_value = 0;
        while(fileInfo.indexOf("$NHI_Boolean", start_value) > 0)
        {
            beginning_var_name = fileInfo.indexOf("$NHI_Boolean", start_value);
            while(fileInfo.substring(beginning_var_name - 2, beginning_var_name) != "`n")
            {
                beginning_var_name = beginning_var_name - 1;
            }
            is_space = fileInfo.indexOf("=", beginning_var_name) > fileInfo.indexOf("`s", beginning_var_name) && fileInfo.indexOf("`s", beginning_var_name) > 0 ? fileInfo.indexOf("`s", beginning_var_name) : fileInfo.indexOf("=", beginning_var_name);
            start_value = start_value + fileInfo.indexOf("$NHI_Boolean", start_value) + 1;
            variable_dictionary.push(["Boolean", fileInfo.substring(beginning_var_name, is_space), ""])
        }

        fileData.a = fileInfo;
    };
    reader.readAsText(file);
}

function uploadCustomPythonScript()
{
    var input = document.createElement('input');
    input.type = 'file';

    // This is the lambda function that is called once the user actually uploads their file
    input.onchange = e => { 
        var file = e.target.files[0];

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

        // This parses the file
        parseFile(file);
    }

    input.click();
}

function askUI()
{
    loadingcontainer.parent.removeChild(loadingcontainer);

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
    roundedBox.drawRoundedRect(screen.width / 16, screen.height / 16, screen.width / 1.2, screen.width / 2.5, 10);
    roundedBox.endFill();
    loadingcontainer.addChild(roundedBox);

    // Draw the UI stuff
    for(var i = 0; i < variable_dictionary.length; i++)
    {
        let LoadingText = new PIXI.Text("Type: " + variable_dictionary[i][0] + "\nName: " + variable_dictionary[i][1] + "\n\nValue:", {fontFamily : 'Arial', fontSize: 24, fill: 0x000000, align : 'left'} );
        LoadingText.x = (screen.width / 12);
        LoadingText.y = (screen.height / 2.25) - (i * 150);
        loadingcontainer.addChild(LoadingText);

        let line = new PIXI.Graphics();
        line.lineStyle(2, 0xffffff);
        // loadingcontainer.addChild(line);

        userTextBox = new PIXI.TextInput({
            input: {
                fontFamily: 'Arial',
                fontSize: '14pt',
                padding: '10px',
                width: '250px',
                color: '#FFFFFF',
                letterSpacing: 2
            }, 
            box: line
        });
        userTextBox.x = (screen.width / 12) + 75;
        userTextBox.y = (screen.height / 2.25) - (i * 150) + 72.5;
        userTextBox.interactiveChildren = true;
        userTextBox.placeholder = "Your value here";
        loadingcontainer.addChild(userTextBox);
    }

    roundedSubmitBox = new PIXI.Graphics();
    roundedSubmitBox.beginFill(0x24AF01);
    roundedSubmitBox.drawRoundedRect((screen.width / 5) * 3.95, (screen.height / 4) * 2.7, screen.width / 10, screen.width / 20, 10);
    roundedSubmitBox.endFill();
    roundedSubmitBox.interactive = true;
    roundedSubmitBox.buttonMode = true;
    roundedSubmitBox.click = sendPythonScript;
    loadingcontainer.addChild(roundedSubmitBox);

    submitText = new PIXI.Text("Submit", {fontFamily : 'Arial', fontSize: 24, fill: 0x000000, align : 'left'} );
    submitText.x = ((screen.width / 5) * 3.95) + 35;
    submitText.y = ((screen.height / 4) * 2.7) + 27.5;
    loadingcontainer.addChild(submitText);

    app.stage.addChild(loadingcontainer);
}

// This is called when the python button on the window is clicked
function sendPythonScript()
{
    // TODO: extract text from file and send it in AJAX; for now it is hard coded...
    var formattedText = fileData.a;
    console.log(formattedText);

    // Format the text
    for(var i = 0; i < variable_dictionary.length; i++)
    {
        if(variable_dictionary[i][0] == "Integer")
        {  
            var pos = formattedText.indexOf(variable_dictionary[i][1]) + variable_dictionary[i][1].length 

            if(formattedText.substring(pos, pos + 1) == "=")
            {
                // TODO: do the rest of the formatting
            }
            else
            {

            }
        }
    }

    // AJAX portion of the upload script
    var uid = 8;
    var sessionkey = "test_session_key";
    var image_url = "Images/sinteredMetalTinted.png" // TODO: This is hard coded, make this dynamic later
    let responseData = { text: formattedText, image: image_url };
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        headers: {"uid": uid, "session_key": sessionkey},
        data: JSON.stringify(responseData),
        url: base_url + '/i/uploadPython' + "?uid=" + uid + "&session_key=" + sessionkey,
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(callback) {

            var window2 = new WorkWindow("Window 2", 0, 0, callback.data.image);
            window2.drawWindow(0xDCDCDC, callback.data.image);

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