// Low Magnification Screening / Imaging (LMSI)
// @author Eddie Sohn
// jus219@lehigh.edu

// Libraries:
// pixi: 5.0.3
// pixi-viewport: 3.4.1 (local - modified by Eddie Sohn)

// initialize images need to be used
// mode_change.png made by Cursor Creative from https://www.flaticon.com/
// screenshot.png made by https://www.flaticon.com/authors/freepik
// move.png made made by https://www.flaticon.com/authors/icongeek26
var zoom_background = PIXI.Texture.from('./Images/lowmag_test.jpg');
var temp = PIXI.Texture.from('./Images/lowmag_test.jpg');
// create a new new texture from image
var testimg = new PIXI.Sprite(zoom_background);
const cancel_button = PIXI.Sprite.from('./Images/cancel_icon.png');
const mode_button = PIXI.Sprite.from('./Images/mode_change.png');
const screenshot = PIXI.Sprite.from('./Images/screenshot.png');
const move = PIXI.Sprite.from('./Images/move.png');


// containers for button, guide text, and LMSIContainer to hold everything
var LMSIContainer = new PIXI.Container();
var buttonContainer = new PIXI.Container();
var guideTextContainer = new PIXI.Container();

// graphics for buttonBox
const LMSIgraphics = new PIXI.Graphics();

// variable for screenot (crop)
// var cropImage = new PIXI.Graphics();

// variable to save PIXI.Point for cropping
var testPoint = new PIXI.Point(0, 0);
var testPointEnd = new PIXI.Point(0, 0);
var imagePoint = new PIXI.Point(0,0);

// variable for viewport
var viewport = null;

// variable to determine if user clicked on cancel button
var cancel_draw = false;

// varaible to determine current mode
var dragMode = true;

// variable to determine if user is in the middle of drawing
var drawing = false;

// variables to save image info
var pid = 0;
var cid = 0;
var wid = 0;
var _imageOrigin_x = 0;
var _imageOrigin_y = 0;
var _imageOrigin_w = 0;
var _imageOrigin_h = 0;
var _imageSource = null;

//Creates style used by text
const style = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 20,
    fill: '#FFFFFF', // gradient
    align: 'center',
    strokeThickness: 3,
    wordWrap: true,
    wordWrapWidth: 500,
});

// set buttons requried
// cancel button
cancel_button.width = 50;
cancel_button.height = 50;
cancel_button.x = 10;
cancel_button.y = 10;
cancel_button.alpha = 0.33;
cancel_button.interactive = true;
cancel_button.buttonMode = true;
cancel_button
    .on('pointerdown', cancelDraw)
    .on('pointerup', cancelUp)
    .on('pointerover', cancelUp)
    .on('pointeroutside', cancelUp);

// mode change button
mode_button.width = 50;
mode_button.height = 50;
mode_button.x = cancel_button.x;
mode_button.y = cancel_button.y + cancel_button.height + cancel_button.y;
mode_button.alpha = 1;
mode_button.interactive = true;
mode_button.buttonMode = true;
mode_button
    .on('pointerdown', modeChange)
    .on('pointerdown', onButtonDown)
    .on('pointerup', onButtonUp);

// icons to show current mode - screenshot & move
// mode icon should be at the center of mode_button
// however, but screenshot.png is touching the arrow of mode_button, so the width & height is shrinked by 2.5, and 2.5 is added to each x and y position.
// TL;DR -->
// screenshot icon is smaller than move icon by (cancel_button.width / 2 - screenshot.width), and (cancel_button.width / 2 - screenshot.width) / 2 is added to each x and y.
screenshot.width = 20;
screenshot.height = 20;
screenshot.x = cancel_button.x + cancel_button.width / 4 + (cancel_button.width / 2 - screenshot.width) / 2;
screenshot.y = cancel_button.y + cancel_button.height + cancel_button.y + cancel_button.height / 4 + (cancel_button.width / 2 - screenshot.width) / 2;
screenshot.alpha = 0;   // 0 because default mode is move

move.width = 25;
move.height = 25;
move.x = cancel_button.x + cancel_button.width / 4;
move.y = cancel_button.y + cancel_button.height + cancel_button.y + cancel_button.height / 4;
move.alpha = 1;

/**
 *  LMSI is called to start Low Magnification Screening / Imaging (Zoom & Crop).
 *  it activates gestures, add viewport, buttons, and sprites on LMSIContainer
 */
function LMSI(imageSource, _wid, _pid) {

    
    wid = _wid;
    pid = _pid;

    setBackground(imageSource);
    
    // calls pixi-viewport
    viewport = new PIXI.extras.Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: window.innerWidth,
        worldHeight: window.innerHeight,
        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel() to work properly when renderer.view is placed or scaled
    });


    // activate mouse/touch gestures for viewport
    viewport
        .drag().on('drag-end', (screen, word) => console.log(screen, viewport.world))
        .pinch()
        .wheel()
        .decelerate();
    
    // test printlns
    console.log("Viewport viewport.plugins['drag']: " + viewport.plugins['drag']);
    console.log("Viewport viewport.plugins['drag'].parent.x: " + viewport.plugins['drag'].parent.x);
    // console.log("Viewport viewport.parent.x: " + viewport.parent.x); // doesn't work
    console.log("Viewport viewport.plugins['drag'].moved: " + viewport.plugins['drag'].moved);

    // resize image as size of viewport
    testimg.width = window.innerWidth;
    testimg.height = window.innerWidth; 

    imagePoint = testimg.toGlobal(imagePoint);

    // add background image to viewport
    viewport.addChild(testimg);

    // draw rectangle box to put buttons
    LMSIgraphics.beginFill(0xFFFFFF);
    LMSIgraphics.drawRect(5, 5, 60, 115);
    LMSIgraphics.endFill();

    // add buttons to buttonContainer, and set interative
    buttonContainer.addChild(LMSIgraphics);
    buttonContainer.addChild(cancel_button);
    buttonContainer.addChild(mode_button);
    buttonContainer.addChild(move);
    buttonContainer.addChild(screenshot);
    buttonContainer.interactive = true;
    buttonContainer.tint = 0xff0000;

    // text to guide users
    guideText = new PIXI.Text('Drag, wheel and scroll the image to explore.', style);
    guideText.x = window.innerWidth / 2 - 250;
    guideText.y = 50;
    guideTextContainer.addChild(guideText);

    // add the viewport to the container
    LMSIContainer.addChild(viewport);

    LMSIContainer.addChild(buttonContainer);
    LMSIContainer.addChild(guideTextContainer);

    // Sets the app to be interactable and allows drawPoint function to be called
    // LMSIContainer.interactive = true;

    app.stage.addChild(LMSIContainer);
    app.renderer.render(LMSIContainer);

}

/**
 *  Help functions for drawing rectancle area on image to crop
 */
function drawPoint(event) {
    if (!cancel_draw) { //Checks if user clicked on cancel button


        if (!drawing) { //Checks what phase of line create user is in

            // test printlnt
            console.log("ImagePoint: " + imagePoint.x + ", " + imagePoint.y);

            // Clears current graphics on screen
            graphics.clear();
            // cropImage.clear();
            viewport.mask = null;

            // Updates starting point
            testPoint = viewport.toWorld(event.data.global.x, event.data.global.y);

            // Constructs starting point
            graphics.beginFill(0xFFFFFF);
            graphics.drawRect(testPoint.x - 5, testPoint.y - 5, 10, 10);
            graphics.endFill();

            viewport.addChild(graphics);

            // Changes drawing value 
            drawing = true;
            
            //Updates text and cancel button
            guideText.text = 'Select the ending point of rectangle. Cancel to reset.';
            
            // alpha of cancle button
            cancel_button.alpha = 1;
        } //end drawing if
        else {

            // update ending point 
            testPointEnd = viewport.toWorld(event.data.global.x, event.data.global.y);

            //Draws end point
            graphics.beginFill(0xFFFFFF);
            graphics.drawRect(testPointEnd.x - 5, testPointEnd.y - 5, 10, 10);
            graphics.endFill()

            //Constructs line from saved starting point to current end point
            graphics.lineStyle(1, 0xFFFFFF).moveTo(testPoint.x, testPoint.y);

            // draw rectangle from current starting point and endpoint
            // points: starting (x,y) on canvas
            // event.data.global: ending (x,y) on canvas
            // event.data.global - points = width / height of rectangle
            graphics.drawRect(testPoint.x, testPoint.y, testPointEnd.x - testPoint.x, testPointEnd.y -
                testPoint.y);

            // initialize cropImage
            var cropImage = new PIXI.Graphics();

            // set cropImage, which is PIXI.Graphics to mask image on screen
            cropImage.drawRect(testPoint.x, testPoint.y, testPointEnd.x - testPoint.x, testPointEnd.y -
                testPoint.y);
                
            cropImage.renderable = true;
            cropImage.cacheAsBitmap = true;

            viewport.mask = cropImage;
            
            // viewport.addChild(cropImage);

            // app.stage.addChild(cropImage);

            //Changes draw value and updates other information
            drawing = false;
            
            guideText.text = 'Copy of the selected area of image created.';

            // test println
            console.log("Cropped: " + testPoint.x + " " + testPoint.y + " , " + testPointEnd.x + " " + testPointEnd.y);
            console.log("ImagePoint: " + imagePoint.x + ", " + imagePoint.y);

            // test crop
            // temp.frame = cropImage.drawRect(testPoint.x, testPoint.y, testPointEnd.x - testPoint.x, testPointEnd.y -
            //         testPoint.y);
            // var newZoom = new PIXI.Texture(temp.baseTexture, temp.frame);
            // viewport.addChild(newZoom);

        } //end else
    } //end cancel if
} // end draw point

/**
 *  called when cancel_button is fired.
 *  modify alpha value of the image, resets points[], cancel_draw, drawing
 */
function cancelDraw(event) {
    //Resets all line UI components
    graphics.clear();

    // cropImage.clear();
    viewport.mask = null;
    
    cancel_draw = true;
    drawing = false;
    guideText.text = 'Select two points on a image to crop.';
} // end cancel draw

/**
 *  Resets cancel_draw after canelDraw() is called.
 */
function cancelUp(event) {
    // Resets cancel value
    cancel_draw = false;
    
    // restore alpha of cancle button, since there is no graphics on screen to cancel
    cancel_button.alpha = 0.33;
} // end cancel up

/**
 *  helper function for mode buttons
 *  change mode between 'drag' and 'screenshot'
 */
function modeChange(event) {

    // resets all line UI components
    graphics.clear();

    // reset all the masking too
    // cropImage.clear();
    viewport.mask = null;

    // if mode is 'drag', pan & pinch zoom: change to 'screenshot'
    if (dragMode == true) {

        // change mode icon to 'screenshot'
        move.alpha = 0;
        screenshot.alpha = 1;

        // pause gestures for 'drag'
        viewport.pausePlugin('drag');
        viewport.pausePlugin('pinch');
        viewport.pausePlugin('wheel');
        viewport.pausePlugin('decelerate');
    
        // resume gestures for click & cancel
        viewport.on('pointerdown', drawPoint);

        // resume cancel_button in 'drag' mode
        cancel_button.on('pointerdown', cancelDraw);

        // change guideText to 'screenshot' mode
        dragMode = false;
        guideText.text = 'Select two points on a image to copy.';
    }
    // if mode is 'screenshot', getting part of the image and save it as child image of current image: change to 'drag'
    else {

        // change mode icon to 'screenshot'
        move.alpha = 1;
        screenshot.alpha = 0;

        // pause gestures for click & cancel
        viewport.off('pointerdown', drawPoint);

        // pause cancel_button in 'screenshot' mode
        cancel_button.off('pointerdown', cancelDraw);

        // resume gestures for 'drag'
        viewport.resumePlugin('drag');
        viewport.resumePlugin('pinch');
        viewport.resumePlugin('wheel');
        viewport.resumePlugin('decelerate');

        // change guideText to 'drag' mode
        dragMode = true;
        guideText.text = 'Drag, wheel and scroll the image to explore.';
    }
} // end modeChange

function setBackground(imageSource) {
    if (imageSource == null) {
        // do nothing
    }
    // if it's Object (consider it's PIXI texture object)
    else if (typeof imageSource === 'object' && imageSource.constructor === Object) {
        // set background as imageSource
        zoom_background = imageSource;
        testimg = new PIXI.Sprite.from(zoom_background);

        _imageSource = imageSource;
        _imageOrigin_w = _imageSource.width;
        _imageOrigin_h = _imageSource.height;
    }
    // if it's dir
    else if (str.indexOf("/") >= 0 && str.indexOf("./") >= 0) {
        zoom_background = PIXI.Texture.from(imageSource);
        testimg = new PIXI.Sprite.from(zoom_background);

        _imageSource = imageSource;
        _imageOrigin_w = _imageSource.width;
        _imageOrigin_h = _imageSource.height;;        
    }
    // if imageSource is in base64
    else if (base64Matcher.test(imageSource)) {
        var tempImg = new Image();
        this.tempImg.src = imageSource;

        var tempBaseTexture = new PIXI.BaseTexture(tempImg);
        var tempTexture = new PIXI.Texture(tempBaseTexture);

        // then add to the cache
        // TODO: use texture Cache
        if (wid == null) {
            this.zoom_background = PIXI.Texture.from(tempTexture);
            this.testimg = new PIXI.Sprite(this.zoom_background);
        }
        else {
            PIXI.Texture.addTextureToCache(tempTexture, "LMSI" + wid);

            // to retrieve the texture it would be a case of
            var finalBase64Sprite = PIXI.Sprite.fromImage("LMSI" + wid);
            this.zoom_background = PIXI.Texture.from(finalBase64Sprite);
            this.testimg = new PIXI.Sprite(this.zoom_background);
        }
    }
    else {
        _imageSource = imageSource;
        _imageOrigin_w = _imageSource.width;
        _imageOrigin_h = _imageSource.height;
    }
}

/**
 * General helper functions for button gestures including pointerdown, pointerup, pointerover, pointerdownout
 */
function onButtonDown() {
    this.isdown = true;
    // this.texture = textureButtonDown;
    this.alpha = 0.5;
}

function onButtonUp() {
    this.isdown = false;
    this.alpha = 1;
    if (this.isOver) {
        // this.texture = textureButtonOver;
    }
    else {
        // this.texture = textureButton;
    }
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    // this.texture = textureButtonOver;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    // this.texture = textureButton;
}

function calculateZoomLvl() {

}