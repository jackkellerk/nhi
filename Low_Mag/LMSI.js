class LMSI {
    constructor(imageSoruce, wid) {

        // variables
        this.zoom_background = PIXI.Texture.from('./Images/lowmag_test.jpg');
        this.testimg = this.zoom_background;
        this.guideText = 'Init';
        this.cancel_draw = false;
        this.dragMode = true;
        this.drawing = false;
        
        // containers for button, guide text, and LMSIContainer to hold everything
        this.LMSIContainer = new PIXI.Container();
        this.buttonContainer = new PIXI.Container();
        this.guideTextContainer = new PIXI.Container();

        // base64 matcher in RegExp to test base64 strings
        var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
        
        // if imageSource is null
        if (imageSource == null) {

        }
        // if imageSource is a dir to an image
        else if (str.indexOf("/") >= 0 && str.indexOf("./") >= 0) {
            this.zoom_background = PIXI.Texture.from(imageSource);
            this.testimg = new PIXI.Sprite(this.zoom_background);
        }
        // if imageSource is on the server (base64)
        else if (base64Matcher.test(imageSoruce)) {
            var tempImg = new Image();
            this.tempImg.src = imageSoruce;

            var tempBaseTexture = new PIXI.BaseTexture(tempImg);
            var tempTexture = new PIXI.Texture(tempBaseTexture);

            // then add to the cache
            // TODO: use texture Cache
            if (wid == null) {
                this.zoom_background = tempTexture;
                this.testimg = new PIXI.Sprite(this.zoom_background);
            }
            else {
                PIXI.Texture.addTextureToCache(tempTexture, "LMSI" + wid);

                // to retrieve the texture it would be a case of
                var finalBase64Sprite = PIXI.Sprite.fromImage("LMSI" + wid);
                this.zoom_background = finalBase64Sprite;
                this.testimg = new PIXI.Sprite(this.zoom_background);
            }
        }
        // nothing match. get default image
        else {

        }

        // calls pixi-viewport
        this.Viewport = new PIXI.extras.Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 5000,
            worldHeight: 5000,
            interaction: app.renderer.plugins.interaction // the interaction module is important for wheel() to work properly when renderer.view is placed or scaled
        });

        // activate mouse/touch gestures for viewport
        this.Viewport
            .drag()
            .pinch()
            .wheel()
            .decelerate();

            this.testimg.width = window.innerWidth;
            this.testimg.height = window.innerWidth; 

        // add background image to viewport
        this.Viewport.addChild(this.testimg);

        // add buttons to buttonContainer, and set interative
        this.buttonContainer.addChild(cancel_button);
        this.buttonContainer.addChild(mode_button);
        this.buttonContainer.addChild(move);
        this.buttonContainer.addChild(screenshot);
        this.buttonContainer.interactive = true;

        // init guideText
        this.initGuideText();

        // add the viewport to the container
        this.LMSIContainer.addChild(this.Viewport);

        this.LMSIContainer.addChild(this.buttonContainer);
        this.LMSIContainer.addChild(this.guideTextContainer);

        // Sets the app to be interactable and allows drawPoint function to be called
        // LMSIContainer.interactive = true;

        app.stage.addChild(this.LMSIContainer);
        app.renderer.render(this.LMSIContainer);
    }

    // update image to drag & screenshot
    updateBackground(imageSource) {
        this.zoom_background = PIXI.Texture.from(imageSource);
        this.testimg = new PIXI.Sprite(this.zoom_background);
    }

    // init guideText with text
    initGuideText(text) {
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

    // update guideText with text
    updateGuideText(text) {
        this.guideText.text = text;
    }

    /**
     *  Helper function for mode buttons
     *  Change mode between 'drag' and 'screenshot'
     */
    modeChange(event) {

        // Resets all line UI components
        this.graphics.clear();

        // if mode is 'drag', pan & pinch zoom: change to 'screenshot'
        if (this.dragMode == true) {

            // change mode icon to 'screenshot'
            move.alpha = 0;
            screenshot.alpha = 1;

            // pause gestures for 'drag'
            this.Viewport.pausePlugin('drag');
            this.Viewport.pausePlugin('pinch');
            this.Viewport.pausePlugin('wheel');
            this.Viewport.pausePlugin('decelerate');
        
            // resume gestures for click & cancel
            this.Viewport.on('pointerdown', this.drawPoint);

            // resume cancel_button in 'drag' mode
            cancel_button.on('pointerdown', this.cancelDraw);

            // change guideText to 'screenshot' mode
            this.dragMode = false;
            this.guideText.text = 'Select two points on a image to copy.';
        }
        // if mode is 'screenshot', getting part of the image and save it as child image of current image: change to 'drag'
        else {

            // change mode icon to 'screenshot'
            move.alpha = 1;
            screenshot.alpha = 0;

            // pause gestures for click & cancel
            this.Viewport.off('pointerdown', this.drawPoint);

            // pause cancel_button in 'screenshot' mode
            cancel_button.off('pointerdown', this.cancelDraw);

            // resume gestures for 'drag'
            this.Viewport.resumePlugin('drag');
            this.Viewport.resumePlugin('pinch');
            this.Viewport.resumePlugin('wheel');
            this.Viewport.resumePlugin('decelerate');

            // change guideText to 'drag' mode
            this.dragMode = true;
            this.guideText.text = 'Drag, wheel and scroll the image to explore.';
        }
    } // end modeChange

}

// define style
guideTextstyle = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 20,
    fill: '#FFFFFF', // gradient
    align: 'center',
    strokeThickness: 3,
    wordWrap: true,
    wordWrapWidth: 500,
});