// This is the javascript file I added for the connection to the backend
function loginToBackend()
{
    return;

    // Still figuring this stuff out...
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "url", true);
    xhttp.send("username", "password");
    // Then do something to read the information that is returned. Like if it is a bool, then accept it.
}
