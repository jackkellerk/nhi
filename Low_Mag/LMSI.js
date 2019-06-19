// Low Magnification Screening / Imaging (LMSI)
// @author Eddie Sohn
// jus219@lehigh.edu

// Libraries:
// pixi: 5.0.3
// pixi-viewport: 3.4.1 (local - modified by Eddie Sohn)

// calls pixi-viewport
var Viewport = new PIXI.extras.Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: 1000,
    worldHeight: 1000,
    interaction: app.renderer.plugins.interaction // the interaction module is important for wheel() to work properly when renderer.view is placed or scaled
});

// initialize images need to be used
var zoom_background = PIXI.Texture.from('./Images/lowmag_test.jpg');
const cancel_button =  PIXI.Sprite.from('./Images/cancel_icon.png');

// activate mouse/touch gestures
Viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate();

// call the image and added to Viewport
// create a new new texture from image
var testimg = new PIXI.Sprite(zoom_background);
testimg.width = app.screen.width;
testimg.height = app.screen.height;

//Cancel button is used to end line drawing process prematurely
//Will appear once first point has been added
//Clicking on it resets all values like starting point, text, etc....                
cancel_button.width = 50;
cancel_button.height = 50;
cancel_button.x = 0;
cancel_button.y = app.screen.height - 100;
cancel_button.alpha = 0;
cancel_button.interactive = true;
cancel_button.buttonMode = true;

cancel_button
    .on('pointerdown', cancelDraw)
    .on('pointerover', cancelDraw)
    .on('pointerup', cancelUp)
    .on('pointeroutside', cancelUp);

//Value used to determine if user clicked on cancel button
let cancel = false;

//Creates style used by text. It is currently unnecessary but more of an example
const style = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 30,
    fontWeight: 'bold',
    fill: '#FFFFFF', // gradient
    align: 'center',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 500,
});

//Tells user how to use application
//Text will change along with process
const richText = new PIXI.Text('Select an rectangular area over image to crop', style);
richText.x = app.screen.width / 2 - 250;
richText.y = 0;

//Some constants initialized here to be used later
//Graphics concern the line itself
const graphics = new PIXI.Graphics();

//This determines whether a line is currently being drawn
//is used in the draw point function
let drawing = false;
//Variable used to hold starting point for the line
var points = [0, 0];
//Variable used to hold data entries along the drawn line
var lineDataPoints = [];
var minValue = 0;
var maxValue = 255;
var valueDifference = maxValue - minValue;

/**
 * 
 * fucntion called from master.html for 'Zoom' (Low Magnification Screening / Imaging) to show Low Magnification Screening / Imaging
 */
function LSMI() {
    
    // add the viewport to the stage
    app.stage.addChild(Viewport);

    // add background image and cancel button to viewport
    var sprite = Viewport.addChild(testimg);
    var button = Viewport.addChild(cancel_button);

    app.stage.addChild(richText);

    app.stage.on('pointerdown', drawPoint);
    // sprite.on('pointerdown', drawPoint);

    // Sets the app to be interactable and allows drawPoint function to be called
    // When user clicks anywhere on screen
    app.stage.interactive = true;
}

/**
* Draw point allows the user to place a point on the image
* The first time the user does this the line drawing process will begin and drawing switches to true
* The starting point will be displayed by a small square and the app will wait for the user to
* click on the screen again
* Once activated again the app will denonte the end point of the user's line and create a straight
* line inbetween both points. This will then call the line detail and create graph functions and the drawing
* value will switch to end signaling the end of the drawing process
*/
function drawPoint(event) {
    if (!cancel) { //Checks if user clicked on cancel button
        if (!drawing) { //Checks what phase of line create user is in

            graphics.clear(); //Clears current graphics on screen

            //Constructs starting point
            graphics.beginFill(0xFFFFFF);
            graphics.drawRect(event.data.global.x - 5, event.data.global.y - 5, 10, 10);
            graphics.endFill();
            app.stage.addChild(graphics);

            //Changes drawing value 
            drawing = true;

            //Updates starting point
            points = [event.data.global.x, event.data.global.y];

            //Updates text and cancel button
            richText.text = 'Select the ending point to crop the area.';

            // Alpha of cancle button
            cancel_button.alpha = 1;

        } //end drawing if
        else {
            //Draws end point
            graphics.beginFill(0xFFFFFF);
            graphics.drawRect(event.data.global.x - 5, event.data.global.y - 5, 10, 10);
            graphics.endFill()

            //Constructs line from saved starting point to current end point
            graphics.lineStyle(2, 0xFFFFFF).moveTo(points[0], points[1]);

            // draw rectangle from current starting point and endpoint
            // points: starting (x,y) on canvas
            // event.data.global: ending (x,y) on canvas
            // event.data.global - points = width / height of rectangle
            graphics.drawRect(points[0], points[1], event.data.global.x - points[0], event.data.global.y -
                points[1]);

            // test println for printing start(x,y) and end (x,y) of rectangle
            console.log("start: " + points[0] + " " + points[1] + ",\nend: " + event.data.global.x + " " +
                event.data.global.y);

            // get selected screen as image
            // select 'pixiCanvas' to display cropped Image
            var myCanvas = document.getElementById('pixiCanvas');
            
            // TODO: use 't1' instead 'test_image', to make it compatiable
            var ctx = myCanvas.getContext('2d');
            var img = new Image();
            img.onload = function(){
                // points[]: starting point (x, y) of rectangle drawn
                // event.data.global: ending point (x, y) of rectangle drawn
                // event.data.global - points[]: width & height of rectangle drawn

                // draw new image using points selected by user
                ctx.drawImage(img, points[0], points[1], event.data.global.x - points[0], event.data.global.y - points[1], 0, 0, 2 * (event.data.global.x - points[0]), 2 * (event.data.global.y - points[1]));

            };

            document.body.appendChild(myCanvas);

            // set the image source
            img.src = './Images/lowmag_test.jpg';

            //Changes draw value and updates other information
            drawing = false;
            richText.text = 'Done: Select another point to crop other areas.';
            cancel_button.alpha = 0;

            // Calls data functions to show user the results on the line they drew
            // lineDetails(points[0], points[1], event.data.global.x, event.data.global.y);

            // createGraph(event);
        } //end else
    } //end cancel if
} // end draw point

/**
* This function is called when the user clicks on the cancel button.
* The contents of this function won't run unless the button is clearly visible to the user
* Once clicked on all contents created by the user will be removed and reset. The cancel value
* is switched to true. This is because the draw point function is also activated but is stopped if
* the value of cancel is true.
* @param event the action of clicking on the cancel button sprite
*/
function cancelDraw(event) {
    console.log("cancel button alpha:" + cancel_button.alpha);
    if (cancel_button.alpha == 1) {
        //Resets all line UI components
        graphics.clear();
        cancel_button.alpha = 0;
        points = [0, 0];
        cancel = true;
        drawing = false;
        richText.text = 'Make a starting point for your line by clicking on the screen';
    }
} // end cancel draw

/**
* This changes the value of cancel so that draw point can work normaly again
* 
*/
function cancelUp(event) {
    //Resets cancel value
    cancel = false;
} //end cancel up