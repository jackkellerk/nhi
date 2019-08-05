## Contributors
- Travis Barnes
- add yourself here

## Description
This document should detail the Backend API used in this project. The routes detailed here will be grouped by the tables they pertain to inorder to help organize relevance. The descriptions of the routes themselves should include the url path, any necessary header and body information, and return values. Include any and all extra information deemed useful to those that will use these routes. Please feel free to update and change as development continues. Many of these routes do not return significant information if that should change let the backend team know so they can return any desired information.


## Project:

### Get Project Information
URL: /p/:pid (pid = project id)

Request Type: GET

Header Information: {"uid": INT, "session_key": STRING}

Body Information: None

Return Value: JSON object that contains project information and also contains a JSON array of the project's windows.

### User's projects
URL: /project

Request Type: GET

Header Information: {"uid": INT, "session_key": STRING}

Body Information: None

Return Value: JSON Array of all of the current user's projects.

### Create Project
URL: /project/create

Request Type: POST

Header Information: {"uid": INT, "session_key": STRING}

Body Information: { "name": STRING, "canvas_width": FLOAT, "canvas_height": FLOAT}

Return Value: JSON object that contains project information

Extra: Creates a user_project relationship allowing user future access to this new project

### Update Project
URL: /p/:pid/update (pid = project id)

Request Type: PUT

Header Information: {"uid": INT, "session_key": STRING}

Body Information: { "name": STRING, "thumbnail": STRING, "width": FLOAT, "height": FLOAT}

Return Value: number of rows updated

Extra: Only users with a user_project relationship are allowed to make changes to the project

### Delete Project
URL: /p/:pid (pid = project id)

Request Type: DELETE

Header Information: {"uid": INT, "session_key": STRING}

Body Information: None

Return Value: number of rows deleted

Extra: Since there are many items associated with projects all of these elements are deleted as well including windows and user_project relationships. Only users with a user_project relationship can delete projects.

## Window:
### Create Window
URL: /p/:pid/new_window (pid = project id)

Request Type: POST

Header Information: {"uid": INT, "session_key": STRING}

Body Information: { "iid": STRING, "image_box": JSON OBJECT {"pos_x": FLOAT,"pos_y": FLOAT,"width": FLOAT,"height": FLOAT}, "window_box": JSON OBJECT{"pos_x": FLOAT,"pos_y": FLOAT,"width": FLOAT,"height": FLOAT} }

Return Value: Returns JSON object containing information for the newly made window

### Create Default Window
URL: /p/:pid/new_window_default (pid = project id)

Request Type: POST

Header Information: {"uid": INT, "session_key": STRING}

Body Information: { "iid": STRING }

Return Value: Returns JSON object containing information for the newly made window

### Update Window Position
URL: /w/:wid/update_pos (wid = window id)

Request Type: PUT

Header Information: {"uid": INT, "session_key": STRING}

Body Information:  { "pos_x": FLOAT, "pos_y": FLOAT, "width": FLOAT,"height": FLOAT }

Return Value: Number of rows updated

Extra: Can only update a window if it belongs to a project that the user has access to

### Update Image Position
URL: /w/:wid/update_img_pos (wid = window id)

Request Type: PUT

Header Information: {"uid": INT, "session_key": STRING}

Body Information:  { "pos_x": FLOAT, "pos_y": FLOAT, "width": FLOAT,"height": FLOAT }

Return Value: Number of rows updated. 

Extra: Can only update a window if it belongs to a project that the user has access to

### Delete Window
URL: /w/:wid(wid = window id)

Request Type: DELETE

Header Information: {"uid": INT, "session_key": STRING}

Body Information:  None

Return Value: Number of rows updated. 

Extra: Can only delete a window if it belongs to a project that the user has access to

## User:
### Get User Information
URL: /user 

Request Type: GET

Header Information: {"uid": INT, "session_key": STRING}

Body Information: None

Return Value: JSON object that contains user information.

### Update User Information
URL: /u/update_settings

Request Type: PUT

Header Information: {"uid": INT, "session_key": STRING}

Body Information: { "username": STRING, "password": STRING, "email": STRING, "legal_name": STRING, "institution": STRING }

Return Value: Number of rows updated

### User Login
URL: /login

Request Type: POST

Header Information: None

Body Information: { "username": STRING, "password": STRING}

Return Value: Returns JSON object containing uid(user id) and the session key

### User Sign Up
URL: /signup

Request Type: POST

Header Information: None

Body Information: { "username": STRING, "password": STRING, "email": STRING, "legal_name": STRING, "institution": STRING }

Return Value: Returns JSON object containing uid(user id) and the session key

## Source:

## User_Project(relationship):
### Add User to Project
URL: /p/:pid/add_to_project (pid = project id)

Request Type: POST

Header Information: {"uid": INT, "session_key": STRING}

Body Information: None

Return Value: Number of rows updated

### Remove User From Project
URL: /p/:pid/remove_from_project (pid = project id)

Request Type: POST

Header Information: {"uid": INT, "session_key": STRING}

Body Information: None

Return Value: Number of rows updated

