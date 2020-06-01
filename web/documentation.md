# Documentation

## General Information

- The starting point of the app is the master.html file.
- To add a JavaScript file to the app, add `<script src="./DirectoryTo/FileName.js"></script>` to master.html under the Dependencies section.

## master.html

### Variables

#### mouseData
- Purpose: This is the variable to hold the mouse vertical and horizontal positions.
- Type: float
- Example: `var x = mouseData.x;` 
    - This is an example used to get the x coordinate of the mouse position. X can be interchanged with Y to get vertical position.

### Functions

#### main()
- Purpose: The function where the app starts.
- Arguments: None
- Type: void
- Dependencies: [mouseData](./documentation.md#mouseData), [updateActivity()](./documentation.md#updateActivity())
- Called from: the browser
- Example: `n/a`

#### updateActivity()
- Purpose: This function is called when the screen needs to be updated. I.e. changed from the pre-login screen to the main menu.
- Arguments: None
- Type: void
- Dependencies: [currentActivity](./documentation.md#currentActivity), [startPreLogin()](./PreLoginScreen/documentation.md#startPreLogin()), [startAllProjects()](./AllProjects/documentation.md#startAllProjects()), [startWindows()](./windows/documentation.md#startWindows()), [clear()](./documentation.md#clear())
- Called from: [main()](./documentation.md#main()), [toProjectSelection()](./PreLoginScreen/documentation.md#toProjectSelection()), [createUIProjects()](./AllProjects/documentation.md#createUIProjects()), [startWindows()](./Windows/documentation.md#startWindows())
- Example: `updateActivity();`
    - When this is called, it updates the scene to whatever the new [currentActivity](./documentation.md#currentActivity) is. Before calling this, be sure to update [currentActivity](./documentation.md#currentActivity)! 

#### clear()
- Purpose: Clears the PIXI stage. Used as a helper function to [updateActivity()](./documentation.md#updateActivity()); shouldn't be used elsewhere.
- Arguments: None
- Type: void
- Dependencies: None
- Example: `clear();`
    - Clears every PIXI object from the stage. Shouldn't be called outside of the [updateActivity()](./documentation.md#updateActivity()) function!

## jsToBackend.js

### Variables

#### base_url
- Purpose: This is the backend url. Use this when writing AJAX requests to the backend.
- Type: String
- Example: `$.ajax({ url: base_url + '/login' });` 
    - This is an example of a login AJAX request to our backend server. Change the world login with any other port in the backend you want to access.

#### uid
- Purpose: This is the variable used to hold the data recieved from the backend in AJAX requests.
- Type: JSON Object
- Example: `$.ajax({ success: function(callback) { uid = callback.data.uid; } });` 
    - This is an example of an AJAX request to our backend server. uid holds the data recieved from the server.

#### session_key
- Purpose: This is the variable holding the session key. It it assigned after a successful [login AJAX request](./documentation.md#loginToBackend).
- Type: String
- Example: `$.ajax({ success: function(callback) { session_key = callback.data.session_key; });` 
    - This is an example of an AJAX request to our backend server. session_key holds the session key recieved from the server.

### Functions

#### loginToBackend()
- Purpose: Call this to login to our app.
- Arguments: None
- Type: void
- Dependencies: [base_url](./documentation.md#base_url), [userTextBox](./PreLoginScreen/documentation.md#userTextBox), [loginPassword](./PreLoginScreen/documentation.md#loginPassword), [toProjectSelection()](./PreLoginScreen/documentation.md#toProjectSelection())
- Called from: [startPreLogin()](./PreLoginScreen/documentation.md#startPreLogin())
- Example: `loginText.on("pointerdown", loginToBackend);`
    - When the PIXI object loginText is pressed, it will call the function loginToBackend.

#### signUpBackend()
- Purpose: Call this to create an account in the backend; this will automatically login to the app. Will only accept .edu emails.
- Arguments: None
- Type: void
- Dependencies: [base_url](./documentation.md#base_url), [SU_emailTextBox](./PreLoginScreen/documentation.md#SU_emailTextBox), [signUpPassword](./PreLoginScreen/documentation.md#signUpPassword), [signUpRePassword](./PreLoginScreen/documentation.md#signUpRePassword), [legalTextBox](./PreLoginScreen/documentation.md#legalTextBox), [institutionTextBox](./PreLoginScreen/documentation.md#institutionTextBox)
- Called from: [startPreLogin()](./PreLoginScreen/documentation.md#startPreLogin())
- Example: `SU_signUpText.on("pointerdown", signUpBackend);`
    - When the PIXI object SU_signUpText is pressed, it will call the function signUpBackend.

#### gatherUserSettings()
- Purpose: Call this to gather the information stored with the current user's account.
- Arguments: None
- Type: void
- Dependencies: [base_url](./documentation.md#base_url), [uid](./documentation.md#uid), [session_key](./documentation.md#session_key), [userSettingsResponse](./PreLoginScreen/documentation.md#userSettingsResponse), [createUIProjects()](./PreLoginScreen/documentation.md#createUIProjects())
- Called from: [projectSelection()](./AllProjects/documentation.md#projectSelection())
- Example: `gatherUserSettings();`
    - Call the function, it assigns the callback to the [userSettingsResponse](./PreLoginScreen/documentation.md#userSettingsResponse) variable.

## globalVariables.js

### Variables

#### currentActivity
- Purpose: This is the variable holding the activity the user is in. I.e. login screen, main menu, source page, etc. Change this when you want to redirect to another activity.
- Type: String
- Example: `currentActivity = activityArray[1];` 
    - This code assigns currentActivity to the second value in [activityArray](./documentation.md#activityArray)

#### activityArray
- Purpose: This is the variable holding the activity the user is in. I.e. login screen, main menu, source page, etc. Welcome is associated with the login screen, AllProjects is associated with the main menu, Windows is associated with the project edit screen, and NewProject is associated with the project creation screen.
- Type: String array
- Values: ['Welcome', 'AllProjects', 'Windows', 'NewProject']
- Example: `currentActivity = activityArray[1];` 
    - This code assigns [currentActivity](./documentation.md#currentActivity) to the second value in activityArray.

#### TODO: Finish this lol