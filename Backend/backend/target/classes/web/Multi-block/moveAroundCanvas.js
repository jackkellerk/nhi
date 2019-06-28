// This is for moving around the canva
// This is dependent upon Pixi.js
// Jack Kellerk, 2019

/* Global Variables */

// These coordinates refer to the top left corner with respect to the image
// Remember the length of the image is multiplied by the scale (in our case it is 3)
var xPosition = 0;
var yPosition = 0;

// These variables are here to calculate the change in mouse movement
var initialMouseX = 0;
var initialMouseY = 0;

var deltaX = 0;
var deltaY = 0;

// Call this function once left click is pressed
function getMousePositionBefore(event)
{
    var mouseData = app.renderer.plugins.interaction.mouse.global;
    initialMouseX = mouseData.x;
    initialMouseY = mouseData.y;
}

// This allows for smooth movement of the boxes
function updateMousePosition(event)
{
    if(!down || (currentlySelectedButtonAction != 'drag'))
        return;
    
    var mouseData = app.renderer.plugins.interaction.mouse.global;
    deltaX = initialMouseX - mouseData.x;
    deltaY = initialMouseY - mouseData.y;
    


    // this stops the canvas from clipping
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
    }
}

// Call this function once left click is released. This updates the coordinates
function getMousePositionAfter(event)
{
    xPosition = xPosition + deltaX;
    yPosition = yPosition + deltaY;
    deltaX = 0;
    deltaY = 0;
}