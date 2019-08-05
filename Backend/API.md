## Contributors
- Travis Barnes
- add yourself here

## Description
This document should detail the Backend API used in this project. The routes detailed here will be grouped by the tables they pertain to help organize relevance. The descriptions of the routes themselves should include the url path, any necessary header and body information, and return values. Include any and all extra information deemed useful to those that will use these routes.


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
## User:
## Source:
## User_Project(relationship):


