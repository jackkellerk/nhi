## Contributors
- Xuewei Wang (Backend and Database)
- add yourself here

## Description
(In developement) This application is developed by Lehigh NHI research team. We aim to develop a web interface that controls microscopes or accesses image databases from different universities' laboratories. We also provide analysing tools to assist researchers. One specialty of this app is its support of touch interactions. It is compatible with large touch screens, such as a touch wall in a visualization lab.
## Documentation

### Backend

#### Definition: 
Our backend would be an interface that connects the front end to a database by HTTP protocol and performs some computation tasks. The backend should be written in a single program language which supports HTTP protocol. The backend should be run on a server (probably on campus, set up by LTS) that has some reasonable computational power.

The workflow could be generalized as the following:
The front end sends a REST request through a url. The backend, if necessary, performs some kind of computation, and sends back a REST response. The formats of requests and responses are standardized and are defined in the “Specification” part in this article. In most of the cases, since we have an account system, the frontend is obligated to save the user id and the session key of the current user. The backend only performs the proper computation and sent back the result when the user id and the session key are matched. The session key could be expired, and when that happens, the frontend should logout the user. The frontend should never save a password. It losses the password as soon as the password is sent to the backend.

#### Specification:
The main webpage is hosted on the root of our domain ("nhitest.lehigh.edu"). API routes are only allowed to be accessed within the same domain. We have four types of request according to REST specification: GET, POST, PUT, and DELETE. GET and DELETE do not have a message body, but we could send information through headers. Most requests should have the “uid” and the “sessionKey” field in the header. Requests should be in json format.

#### APIs: 
A quick refrence could be found in the root directory("quick refrence to REST API.csv"). Detailed API to be made when a stable version of the backend is published.

### Database

## Quick Tutorial (Internal)

##### Xuewei Wang

### Tools you should get:
1. **A git repo management tool.** SourceTree (GUI) or Git (Command-line). This allows you to pull changes within seconds. No need to download. This also gives you more advanced features, like resolving conflicts, branching, and etc.

2. **Maven.** I believe everyone has already installed this. If not, do it now.
3. **A REST API testing tool.** This helps you to understand our API before use it in your code. I recomand the downloadable version of **Advanced Rest Client** https://install.advancedrestclient.com/install. NOTE: any browser extension will not work properly because browser cannot handle localhost correctly. I learnt this the hard way.
4. **(backend only) MySQL Workbench.** No need to emphasis on this.
5. **(backend only) Some sort of Linux environment** (if you are a mac user, by default you are in a Linux environment). Git Bash is enough for this project. If you are using VSCode, I recommand seting a Linux-like bash as the default bash. This is needed to execute bash files we have for automated deployment.

### Frontend coding and debuging:
#### step 1: pull the latest code from github
#### step 2: run the backend server in test mode.  
options:  
a) In the backend folder, use command "mvn exec:java" to run the backend server on the default port (4567);   
b) Use command "mvn exec:java -Dexec.args="port:***port***"" to run the backend server on the port ***port***. (Check the port availability before usage.)

#### step 3: debug/make change
Updated feature: In test mode, the backend will host "nhi/web" as the static folder. Make change to files inside the "nhi/web" folder. After your change, visit localhost:***port*** to test the latest website. NOTE: A simple refresh sometimes does not work because the older website is cached in the brower. In this case, you should either: a) open a new tab in incognito mode every time you make changes; b) clear caches every time you make changes.

### Deployment on the server
**IMPORTANT: only deploy when a new stable version is created.**

NOTE (Only for Windows PC): By default, git will automatically convert LF formated files into CRLF formated files. You want to turn off this feature. We want our bash files to be in LF format, otherwise, a Linux bash will read the extra "\r" at the end of each line. In VSCode, on the bottom-right corner, there is a buttom that tells you if the current file is in CRLF. If so, click that button and convert the file to LF.
#### step 1: make the project
Open a Linux shell, and run "sh build.sh" in the "nhi" folder. This command build the structure of our project.
#### step 2: copy to the server
Copy the "nhi-multitouch-v1" folder (naming subject to change) to somewhere(TBD) on the server.
#### step 3: run
ssh to the server, and run "sh run.sh" in the "nhi-multitouch-v1" folder (naming subject to change).

### Backend: testing mode and deployment mode
-  Description: the testing mode serves files from the external folder "nhi/web". However, the deployment mode serves files form the resource folder inside the mvn project. The testing mode allows the frontend developer to make and view changes without restarting the backend. On the other hand, the deployment mode read files from 
- Setting up: by default, the backend runs in testing mode. It runs the deployment mode with the command line arguement "mode:deploy". Copying web to the resource folder and passing the command-line is handled by bash files, so no need to worry about this unless you want to change bash files.
### Add Resources for testing/demoing
Add them to backend/images. Then add their metadata to the image table.

### Project sturcture
- *why we need the project sturcture? Isn't a single jar file good enough?* This is because some resources is dynamic (Namely images). We don't want to package this kind of resources in to the JAR file. Instead, we allow the program to read external resouces inside this folder.
- Images: images are sorted by institutions they belongs to.
- log: log files.

end of Quick Tutorial.

## Task Distribution (Might be outdated.)

### Pre+Login Page
- (A. Thomas)
- implementation of hexagon.js class (rather than manually drawn hexagons) + adjustability to multitouch screen ratio


### Project Selection Page
- A. Thomas:
- project selection page excl. connection to backend
- background gradient + hex grid + adjusting to screen height & width
- automatic adjustment to multitouch screen ratio (5:1 width to height)




### Project Settings Pages




### Sources Page




## Project 1 Page
- A. Thomas:
- project 1 page excl. connection to backend & window mobility
- Windowing system: transformed individual tool pages to be displayed in a window one at a time




### Backend (jsToBackend.js)




### transitions.js class




### hexagon.js & hexDetection.js class




### popupWindow.js class
A. Thomas:
- customizable text & functionality of buttons. optional color & roundedness customizability.
- window size automatically adjusts to text length (wraps text if necessary).




