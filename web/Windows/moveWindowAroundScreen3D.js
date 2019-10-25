// This is the code for moving a window around the screen

/* Global Variables */

// This will be the array of open windows
var windowArray3D = []; 

// This variable is an integer that specifies which value in windowArray should be moved
var windowSelected3D = null;

// These coordinates refer to the top left corner with respect to the image
var xPositionWindow3D = 0;
var yPositionWindow3D = 0;

// These variables are here to calculate the change in mouse movement
var initialMouseXWindow3D = 0;
var initialMouseYWindow3D = 0;

var deltaXWindow3D = 0;
var deltaYWindow3D = 0;

// Call this function once left click is pressed
function getMousePositionBeforeWindow3D(event)
{
    var mouseData = app.renderer.plugins.interaction.mouse.global;
    initialMouseXWindow3D = mouseData.x;
    initialMouseYWindow3D = mouseData.y;
}

// This allows for smooth movement of the boxes
function updateMousePositionWindow3D(event)
{
    if(!down) // Checks whether left click is pressed
        return;

    var mouseData = app.renderer.plugins.interaction.mouse.global;
    deltaXWindow3D = initialMouseXWindow3D - mouseData.x;
    deltaYWindow3D = initialMouseYWindow3D - mouseData.y;

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
function getMousePositionAfterWindow3D(event)
{
    xPositionWindow3D = xPositionWindow3D + deltaXWindow3D;
    yPositionWindow3D = yPositionWindow3D + deltaYWindow3D;
    deltaXWindow3D = 0;
    deltaYWindow3D = 0;
}
