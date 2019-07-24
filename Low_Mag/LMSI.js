// Low Magnification Screening / Imaging (LMSI)
// @author Eddie Sohn
// jus219@lehigh.edu

// Libraries:
// pixi: 5.0.3
// pixi-viewport: 3.4.1 (local - modified by Eddie Sohn)

// initialize images need to be used
// Icons made by Cursor Creative from https://www.flaticon.com/
var zoom_background = PIXI.Texture.from('./Images/lowmag_test.jpg');
const cancel_button = PIXI.Sprite.from('./Images/cancel_icon.png');
const mode_button = PIXI.Sprite.from('./Images/mode_change.png');

// call the image and added to Viewport
// create a new new texture from image
var testimg = new PIXI.Sprite(zoom_background);

var LMSIContainer = new PIXI.Container();

// set buttons requried
// cancel button
cancel_button.width = 50;
cancel_button.height = 50;
cancel_button.x = 10;
cancel_button.y = 10;
cancel_button.alpha = 0;
cancel_button.interactive = true;
cancel_button.buttonMode = true;
cancel_button
    .on('pointerdown', cancelDraw)
    .on('pointerover', cancelDraw)
    .on('pointerup', cancelUp)
    .on('pointeroutside', cancelUp);

// mode change button
mode_button.width = 50;
mode_button.height = 50;
mode_button.x = 10;
mode_button.y = 70;
mode_button.alpha = 0;
mode_button.interactive = true;
mode_button.buttonMode = true;
mode_button
    .on('pointerdown', changeMode);
    // .on('pointeroutside', cancelUp);

// variable to determine if user clicked on cancel button
var cancel_draw = false;

// varaible to determine current mode
var dragMode = true;

// variable to determine if user is in the middle of drawing
var drawing = false;

// varible to save points user clicked for rectangle
var points = [0, 0];

//Creates style used by text
const style = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 25,
    fontWeight: 'bold',
    fill: '#FFFFFF', // gradient
    align: 'center',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 500,
});

function LMSI() {
    // calls pixi-viewport
    var Viewport = new PIXI.extras.Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 2000,
        worldHeight: 2000,
        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel() to work properly when renderer.view is placed or scaled
    });

    // activate mouse/touch gestures for viewport
    Viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate();

    testimg.width = window.innerWidth;
    testimg.height = window.innerWidth;

    // add background image and cancel button to viewport
    Viewport.addChild(testimg);
    Viewport.addChild(cancel_button);
    Viewport.addChild(mode_button);

    // Text to guide users
    guideText = new PIXI.Text('Select two points on a image to select an area.', style);
    guideText.x = window.innerWidth / 2 - 250;
    guideText.y = 50;
    Viewport.addChild(guideText);

    // add the viewport to the container
    LMSIContainer.addChild(Viewport);

    // // activate click & cancel
    // Viewport.on('pointerdown', drawPoint);
    // Viewport.on('rightclick', cancelDraw);
    // Viewport.on('rightdown', cancelDraw);

    // Sets the app to be interactable and allows drawPoint function to be called
    LMSIContainer.interactive = true;

    app.stage.addChild(LMSIContainer);
    app.renderer.render(LMSIContainer);

}

function drawPoint(event) {
    if (!cancel_draw) { //Checks if user clicked on cancel button
        
        // alpha of cancle button
        cancel_button.alpha = 0.5;

        if (!drawing) { //Checks what phase of line create user is in

            //Clears current graphics on screen
            graphics.clear();

            //Constructs starting point
            graphics.beginFill(0xFFFFFF);
            graphics.drawRect(event.data.global.x - 5, event.data.global.y - 5, 10, 10);
            graphics.endFill();
            Viewport.addChild(graphics);

            //Changes drawing value 
            drawing = true;

            //Updates starting point
            points = [event.data.global.x, event.data.global.y];

            //Updates text and cancel button
            guideText.text = 'Select the ending point of rectangle. (Touch cancel / right click to stop)';
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

            //Changes draw value and updates other information
            drawing = false;
            guideText.text = 'Copy of the selected area is added.';
        } //end else
    } //end cancel if
} // end draw point

/**
 *  called when cancel_button is fired.
 *  modify alpha value of the image, resets points[], cancel_draw, drawing
 */
function cancelDraw(event) {
    console.log("cancel_button alpha:" + cancel_button.alpha);
    if (cancel_button.alpha == 1) {
        //Resets all line UI components
        graphics.clear();
        cancel_button.alpha = 0;
        points = [0, 0];
        cancel_draw = true;
        drawing = false;
        guideText.text = 'Select two points on a image to select.';
    }
} // end cancel draw

/**
 *  Resets cancel_draw after canelDraw() is called.
 */
function cancelUp(event) {
    // Resets cancel value
    cancel_draw = false;
} // end cancel up

/**
 *  Change mode between 'drag' and 'screenshot'
 */
function changeMode(event) {
    // Resets all line UI components
    graphics.clear();

    mode_button.alpha = 0.5;

    // if mode is 'drag', pan & pinch zoom: change to 'screenshot'
    if (dragMode == true) {

        // disable gestures for 'drag'
        Viewport.pausePlugin('drag');
        Viewport.pausePlugin('pinch');
        Viewport.pausePlugin('wheel');
        Viewport.pausePlugin('decelerate');
    
        // activate click & cancel
        Viewport.on('pointerdown', drawPoint);
        Viewport.on('rightclick', cancelDraw);
        Viewport.on('rightdown', cancelDraw);

        // change guideText to 'screenshot' mode
        dragMode = false;
        guideText.text = 'Select two points on a image to select.';
    }
    // if mode is 'screenshot', getting part of the image and save it as child image of current image: change to 'drag'
    else {

        // resume gestures for 'drag'
        Viewport.resumePlugin('drag');
        Viewport.resumePlugin('pinch');
        Viewport.resumePlugin('wheel');
        Viewport.resumePlugin('decelerate');

        // change guideText to 'drag' mode
        dragMode = true;
        guideText.text = 'Drag and scroll the image to explore.';
    }
} // end changeMode