// define style
var guideTextstyle = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 20,
    fill: '#FFFFFF', // gradient
    align: 'center',
    strokeThickness: 3,
    wordWrap: true,
    wordWrapWidth: 500,
});

// base64 matcher in RegExp to test base64 strings
const base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");

// const image for buttons
const cancelButton = PIXI.Sprite.from('./Images/cancel_icon.png');
const modeChangeButton = PIXI.Sprite.from('./Images/mode_change.png');

// const image for icons in modeChangeButton
const screenshotIcon = PIXI.Sprite.from('./Images/screenshot.png');
const dragIcon = PIXI.Sprite.from('./Images/move.png');

/**
 * 
* @class
 */

    // constrctor
function LMSI(imageSource, wid, pid)
{
    
    // LMSI.prototype.constructor = LMSI;

    // initialize variables
    this.guideText = 'Init';
    this.cancel_draw = false;
    this.dragMode = true;
    this.drawing = false;
    this.zoomLvl = 1.0;

    // information about original image
    this.imageOrigin_x = 0;
    this.imageOrigin_Y = 0;
    this._imageSource = imageSource;

    // variable to save PIXI.Point for cropping
    this.testPoint = new PIXI.Point(0, 0);
    this.testPointEnd = new PIXI.Point(0, 0);    

    // id for window, parentsImage, childImage
    this._wid = wid;
    this._pid = pid;
    this._cid = null;

    // image variables
    this.zoom_background = null;
    this.testimg = null;

    // initialize buttons
    this.cancel_button = cancelButton;
    this.mode_button= modeChangeButton;

    // initialize icons inside mode_button to display current mode
    this.drag = dragIcon;
    this.screenshot = screenshotIcon;

    // set button values
    this.cancel_button.width = 50;
    this.cancel_button.height = 50;
    this.cancel_button.x = 10;
    this.cancel_button.y = 10;
    this.cancel_button.alpha = 0.33;
    this.cancel_button.interactive = true;
    this.cancel_button.buttonMode = true;
    this.cancel_button
        .on('pointerdown', this.cancelDraw)
        .on('pointerup', this.cancelUp)
        .on('pointerover', this.cancelUp)
        .on('pointeroutside', this.cancelUp);

    this.mode_button.width = 50;
    this.mode_button.height = 50;
    this.mode_button.x = this.cancel_button.x;
    this.mode_button.y = this.cancel_button.y + this.cancel_button.height + this.cancel_button.y;
    this.mode_button.alpha = 1;
    this.mode_button.interactive = true;
    this.mode_button.buttonMode = true;
    this.mode_button
        .on('pointerdown', this.modeChange)
        .on('pointerdown', this.onButtonDown)
        .on('pointerup', this.onButtonUp);

    // init icon inside modeChange
    // screenshot button is 20px instead of 25px because the icon touch mode_button
    this.screenshot.width = 20;
    this.screenshot.height = 20;
    this.screenshot.x = this.cancel_button.x + this.cancel_button.width / 4 + (this.cancel_button.width / 2 - this.screenshot.width) / 2;
    this.screenshot.y = this.cancel_button.y + this.cancel_button.height + this.cancel_button.y + this.cancel_button.height / 4 + (this.cancel_button.width / 2 - this.screenshot.width) / 2;
    this.screenshot.alpha = 0;   // 0 because default mode is move

    this.drag.width = 25;
    this.drag.height = 25;
    this.drag.x = this.cancel_button.x + this.cancel_button.width / 4;
    this.drag.y = this.cancel_button.y + this.cancel_button.height + this.cancel_button.y + this.cancel_button.height / 4;
    this.drag.alpha = 1;

    // initialize graphics 
    this.LMSIGraphics = new PIXI.Graphics();

    // initialize graphics for screenshot
    this.cropImage = new PIXI.Graphics();
    
    // initialize containers for button, guide text, and LMSIContainer to hold everything
    this.LMSIContainer = new PIXI.Container();
    this.buttonContainer = new PIXI.Container();
    this.guideTextContainer = new PIXI.Container();
    
    // calls pixi-viewport, initialize gestures (pointerdown, etc.)
    this._viewport = new PIXI.extras.Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 5000,
        worldHeight: 5000,
        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel() to work properly when renderer.view is placed or scaled
    });

    // load image to drag (explore) or screenshot
    // if imageSource is null.. load default image
    if (imageSource == null) {
        this.zoom_background = PIXI.Texture.from("./Images/lowmag_test.jpg");
        this.testimg = new PIXI.Sprite(this.zoom_background);
    }
    // if imageSource is a dir to an image
    else if (str.indexOf("/") >= 0 && str.indexOf("./") >= 0) {
        this.zoom_background = PIXI.Texture.from(imageSource);
        this.testimg = new PIXI.Sprite(this.zoom_background);
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
    // nothing match. get default image
    else {
        this.zoom_background = PIXI.Texture.from("./Images/lowmag_test.jpg");
        this.testimg = new PIXI.Sprite(this.zoom_background);
    }


    // set image size, same as Viewport windows
    this.testimg.width = window.innerWidth;
    this.testimg.height = window.innerWidth; 

    // add background image to viewport
    this._viewport.addChild(this.testimg);

    // add buttons to buttonContainer, and set interative
    this.buttonContainer.addChild(this.cancel_button);
    this.buttonContainer.addChild(this.mode_button);
    this.buttonContainer.addChild(this.drag);
    this.buttonContainer.addChild(this.screenshot);
    this.buttonContainer.interactive = true;

    // init guideText
    this.initGuideText();

    // add the viewport to the container
    this.LMSIContainer.addChild(this._viewport);

    this.LMSIContainer.addChild(this.buttonContainer);
    this.LMSIContainer.addChild(this.guideTextContainer);

    app.stage.addChild(this.LMSIContainer);
    app.renderer.render(this.LMSIContainer);
}

// pause gestures for 'drag' on Viewport
LMSI.prototype.pauseDragMode = function pauseDragMode() {
    this._viewport.pausePlugin('drag');
    this._viewport.pausePlugin('pinch');
    this._viewport.pausePlugin('wheel');
    this._viewport.pausePlugin('decelerate');
}


// resume gestures for 'drag' on Viewport
LMSI.prototype.resumeDragMode = function resumeDragMode() {
    this._viewport.resumePlugin('drag');
    this._viewport.resumePlugin('pinch');
    this._viewport.resumePlugin('wheel');
    this._viewport.resumePlugin('decelerate');
}

// resume gestures for 'screenshot' on Viewport
LMSI.prototype.resumeScreenshotMode = function resumeScreenshotMode() {
    // resume gestures for click & cancel
    this._viewport.on('pointerdown', drawPoint);

    // resume cancel_button in 'drag' mode
    this.cancel_button.on('pointerdown', cancelDraw);
}

// init guideText with text
LMSI.prototype.initGuideText = function initGuideText(text) {
    if (text == null) {
        this.text = 'Drag, wheel and scroll the image to explore.';
        this.guideText = new PIXI.Text(this.text, guideTextstyle);
    }
    else {
        this.guideText = new PIXI.Text(this.text, guideTextstyle);
    }
    this.guideText.x = window.innerWidth / 2 - 250;
    this.guideText.y = 50;
    this.guideTextContainer.addChild(this.guideText);
}

LMSI.prototype.drawPoint = function drawPoint(pointX, pointY) {
    if (!this.cancel_draw) { //Checks if user clicked on cancel button

        if (!this.drawing) { //Checks what phase of line create user is in

            // Clears current graphics on screen
            (this.LMSIGraphics).Graphics.clear();

            if (pointX == null) {
                // Updates starting point
                this.testPoint = this.Viewport.toWorld(event.data.global.x, event.data.global.y);
            }
            else {
                // Updates starting point
                this.testPoint = this.Viewport.toWorld(pointX, pointY);
            }

            // Constructs starting point
            this.LMSIGraphics.beginFill(0xFFFFFF);
            this.LMSIGraphics.drawRect(this.testPoint.x - 5, this.testPoint.y - 5, 10, 10);
            this.LMSIGraphics.endFill();

            this._viewport.addChild(this.LMSIGraphics);

            // Changes drawing value 
            this.drawing = true;
            
            //Updates text and cancel button
            this.setGuideText("Select the ending point of rectangle. Cancel to reset.");
            
            // alpha of cancle button
            this.cancel_button.alpha = 1;
        } //end drawing if
        else {

            // update ending point 
            if (pointX == null) {
                this.testPointEnd = this._viewport.toWorld(event.data.global.x, event.data.global.y);
            }
            else {
                this.testPointEnd = this._viewport.toWorld(pointX, pointY);
            }

            //Draws end point
            this.LMSIGraphics.beginFill(0xFFFFFF);
            this.LMSIGraphics.drawRect(this.testPointEnd.x - 5, this.testPointEnd.y - 5, 10, 10);
            this.LMSIGraphics.endFill()

            //Constructs line from saved starting point to current end point
            this.LMSIGraphics.lineStyle(2, 0xFFFFFF).moveTo(this.testPointEnd.x, this.testPointEnd.y);

            // draw rectangle from current starting point and endpoint
            // points: starting (x,y) on canvas
            // event.data.global: ending (x,y) on canvas
            // event.data.global - points = width / height of rectangle
            this.LMSIGraphics.drawRect(this.testPoint.x, this.testPoint.y, this.testPointEnd.x - this.testPoint.x, this.testPointEnd.y -
                this.testPoint.y);

            this.cropImage.drawRect(this.testPoint.x, this.testPoint.y, this.testPointEnd.x - this.testPoint.x, this.testPointEnd.y -
                this.testPoint.y);
                this.cropImage.renderable = true;
                this.cropImage.cacheAsBitmap = true;

            this._viewport.addChild(this.cropImage);
            // app.stage.addChild(cropImage);
            this._viewport.mask = this.cropImage;

            //Changes draw value and updates other information
            this.drawing = false;
            
            this.setGuideText("Copy of the selected area is added.");
        } //end else
    } //end cancel if
} // end drawPoint

/**
 *  called when cancel_button is fired.
 *  modify alpha value of the image, resets points[], cancel_draw, drawing
 */
LMSI.prototype.cancelDraw = function cancelDraw() {
    //Resets all line UI components
    (this.LMSIGraphics).clear();
    this.cancel_draw = true;
    this.drawing = false;
    this.setGuideText("Select two points on a image to crop.");
}

/**
 *  Resets cancel_draw after canelDraw() is called.
 */
LMSI.prototype.cancelUp = function cancelUp() {
    // Resets cancel value
    this.cancel_draw = false;
    
    // restore alpha of cancle button, since there is no graphics on screen to cancel
    (this.cancel_button).alpha = 0.33;
} // end cancel up

/**
 *  Helper function for mode buttons
 *  Change mode between 'drag' and 'screenshot'
 */
LMSI.prototype.modeChange = function modeChange() {

    // Resets all line UI components
    // (this.LMSIGraphics).clear();

    // if mode is 'drag', pan & pinch zoom: change to 'screenshot'
    if (this.dragMode == true) {

        this.pauseDragMode();
        this.resumeScreenshotMode();

        this.dragMode = false;

        // change guideText to 'screenshot' mode
        this.setGuideText("Select two points on a image to copy.");
    }
    // if mode is 'screenshot', getting part of the image and save it as child image of current image: change to 'drag'
    else {
        // this.pauseScreenshotMode();
        // pause gestures for click & cancel
        this._viewport.off('pointerdown', drawPoint);

        // pause cancel_button in 'screenshot' mode
        this.cancel_button.off('pointerdown', cancelDraw);
        this.resumeDragMode();

        this.dragMode = true;

        // change guideText to 'drag' mode
        this.setGuideText("Drag, wheel and scroll the image to explore.");
    }
} // end modeChange


LMSI.prototype.modeIconChange = function modeIconChange() {

    if (this.dragMode == true) {
        // change mode icon to 'screenshot'
        this.drag.alpha = 0;
        this.screenshot.alpha = 1;
    }
    else {
        // change mode icon to 'drag'
        this.drag.alpha = 1;
        this.screenshot.alpha = 0;
    }
}

/**
 * General helper functions for button gestures including pointerdown, pointerup, pointerover, pointerdownout
 */
LMSI.prototype.onButtonDown = function onButtonDown() {
    this.isdown = true;
    // this.texture = textureButtonDown;
    this.alpha = 0.5;
}

LMSI.prototype.onButtonUp = function onButtonUp() {
    this.isdown = false;
    this.alpha = 1;
}