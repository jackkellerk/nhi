// This is the code for moving a window around the screen

/* Global Variables */

// This will be the array of open windows
var windowArray = []; 

// This variable is an integer that specifies which value in windowArray should be moved
var windowSelected = null;

// These coordinates refer to the top left corner with respect to the image
var xPositionWindow = 0;
var yPositionWindow = 0;

// These variables are here to calculate the change in mouse movement
var initialMouseXWindow = 0;
var initialMouseYWindow = 0;

var deltaXWindow = 0;
var deltaYWindow = 0;

// Call this function once left click is pressed
function getMousePositionBeforeWindow(event)
{
    var mouseData = app.renderer.plugins.interaction.mouse.global;
    initialMouseXWindow = mouseData.x;
    initialMouseYWindow = mouseData.y;
}

// This allows for smooth movement of the boxes
function updateMousePositionWindow(event)
{
    if(!down) // Checks whether left click is pressed
        return;

    var mouseData = app.renderer.plugins.interaction.mouse.global;
    deltaXWindow = initialMouseXWindow - mouseData.x;
    deltaYWindow = initialMouseYWindow - mouseData.y;

    console.log("xPosition: " + (xPositionWindow + deltaXWindow));
    /* this stops the canvas from clipping <= Update this for clipping for the windows later
    if(xPosition + deltaX <= 0)
    {
        deltaX = -xPosition;
    }
    else if(xPosition + deltaX + app.screen.width >= dragImage.width)
    {
        deltaX = dragImage.width - xPosition - app.screen.width;
    }

    if(yPosition + deltaY <= 0)
    {
        deltaY = -yPosition;
    }
    else if(yPosition + deltaY + app.screen.height >= dragImage.height)
    {
        deltaY = dragImage.height - app.screen.height - yPosition;
    } */
}

// Call this function once left click is released. This updates the coordinates
function getMousePositionAfterWindow(event)
{
    xPositionWindow = xPositionWindow + deltaXWindow;
    yPositionWindow = yPositionWindow + deltaYWindow;
    deltaXWindow = 0;
    deltaYWindow = 0;
}