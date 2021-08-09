# BACKEND README

This is some documentation to get anyone who hasn't worked with the backend on the right track
The backend can look a bit confusing and intimidating but hopefully this can help 

# Contents

Local Testing: deploying a test version of your code

Deploying to Server: deploying a working build of our app

Structure of Backend Files

MariaDb: The database we use

## Local Testing 

### Tools you should get:
1. **A git repo management tool.** SourceTree (GUI) or Git (Command-line). This allows you to pull changes within seconds. No need to download. This also gives you more advanced features, like resolving conflicts, branching, and etc.

2. **Maven.** I believe everyone has already installed this. If not, do it now.
3. **A REST API testing tool.** This helps you to understand our API before use it in your code. I recomand the downloadable version of **Advanced Rest Client** https://install.advancedrestclient.com/install. NOTE: any browser extension will not work properly because browser cannot handle localhost correctly. I learnt this the hard way.

### Frontend coding and debuging:
#### step 1: Make sure your code can compile 
#### step 2: run the backend server in test mode. 
In your working directory, navigate to the Backend folder 
options:  
a) In the backend folder, use command "mvn exec:java" to run the backend server on the default port (4567);   
b) Use command "mvn exec:java -Dexec.args="port:***port***"" to run the backend server on the port ***port***. (Check the port availability before usage.)

#### step 3: debug/make change
Updated feature: In test mode, the backend will host "nhi/web" as the static folder. Make change to files inside the "nhi/web" folder. After your change, visit localhost:***port*** to test the latest website. NOTE: A simple refresh sometimes does not work because the older website is cached in the brower. In this case, you should either: a) open a new tab in incognito mode every time you make changes; b) clear caches every time you make changes.

## Deploying to Server

**IMPORTANT: only deploy when a new stable version is created.**
NOTE (Only for Windows PC): By default, git will automatically convert LF formated files into CRLF formated files. You want to turn off this feature. We want our bash files to be in LF format, otherwise, a Linux bash will read the extra "\r" at the end of each line. In VSCode, on the bottom-right corner, there is a buttom that tells you if the current file is in CRLF. If so, click that button and convert the file to LF.

## Basic Summary

In order to deploy a working build to run on the server, you will be uploading a jar file after locally building it with maven. After building the jar file, you will need to use a program like WinSCP (for Windows users) to connect with the nhi server and replace the jar file with the new one. Then execute our run.sh script to run the jar file

#### step 1: make the project
Open a Linux shell, and run "sh build.sh" in the "nhi" folder. This command build the structure of our project. For Windows users, using git is fine
#### step 2: copy to the server
You will need to connect with the nhitest.lehigh.edu server and be able to transfer files. For windows users, you can use a program like WinSCP and you will be able to 
#### step 3: run
ssh to the server, and run "sh run.sh" in the "nhi-multitouch-v1" folder (naming subject to change).