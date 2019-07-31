class LMSI {
    constructor(imageSoruce, wid) {

        // variables
        this.zoom_background;
        this.testimg;
        this.guideText = 'Init';
        this.cancel_draw = false;
        this.dragMode = true;
        this.drawing = false;
        this.zoomLvl = 1.0;

        // define graphics 
        this.LMSIGraphics = new PIXI.Graphics();
        
        // containers for button, guide text, and LMSIContainer to hold everything
        this.LMSIContainer = new PIXI.Container();
        this.buttonContainer = new PIXI.Container();
        this.guideTextContainer = new PIXI.Container();

        // if imageSource is null.. load default image
        if (imageSource == null) {
            setBackground("./Images/lowmag_test.jpg");
        }
        // if imageSource is a dir to an image
        else if (str.indexOf("/") >= 0 && str.indexOf("./") >= 0) {
            setBackground(imageSource);
        }
        // if imageSource is in base64
        else if (base64Matcher.test(imageSoruce)) {
            var tempImg = new Image();
            this.tempImg.src = imageSoruce;

            var tempBaseTexture = new PIXI.BaseTexture(tempImg);
            var tempTexture = new PIXI.Texture(tempBaseTexture);

            // then add to the cache
            // TODO: use texture Cache
            if (wid == null) {
                setBackground(tempTexture);
            }
            else {
                PIXI.Texture.addTextureToCache(tempTexture, "LMSI" + wid);

                // to retrieve the texture it would be a case of
                var finalBase64Sprite = PIXI.Sprite.fromImage("LMSI" + wid);
                setBackground(finalBase64Sprite);
            }
        }
        // nothing match. get default image
        else {
            setBackground("./Images/lowmag_test.jpg");
        }

        
        // calls pixi-viewport, initialize gestures (pointerdown, etc.)
        this.initViewport();

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
    set setBackground(imageSource) {
        this.zoom_background = PIXI.Texture.from(imageSource);
        this.testimg = new PIXI.Sprite(this.zoom_background);
    }

    initViewport() {
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
    set setGuideText(text) {
        this.guideText.text = text;
    }

    initCancelButton() {
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
    }

    initModeChangeButton() {
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

        // init icon inside modeChange
        // screenshot button is 20px instead of 25px because the icon touch mode_button
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
    }

    drawPoint(pointX, pointY) {
        if (!this.cancel_draw) { //Checks if user clicked on cancel button

            if (!this.drawing) { //Checks what phase of line create user is in
    
                // Clears current graphics on screen
                this.LMSIGraphics.clear();
    
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
    
                this.Viewport.addChild(this.LMSIGraphics);
    
                // Changes drawing value 
                this.drawing = true;
                
                //Updates text and cancel button
                this.setGuideText("Select the ending point of rectangle. Cancel to reset.");
                
                // alpha of cancle button
                cancel_button.alpha = 1;
            } //end drawing if
            else {

                // update ending point 
                if (pointX == null) {
                    this.testPointEnd = this.Viewport.toWorld(event.data.global.x, event.data.global.y);
                }
                else {
                    this.testPointEnd = this.Viewport.toWorld(pointX, pointY);
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
    
                cropImage.drawRect(this.testPoint.x, this.testPoint.y, this.testPointEnd.x - this.testPoint.x, this.testPointEnd.y -
                    this.testPoint.y);
                cropImage.renderable = true;
                cropImage.cacheAsBitmap = true;
    
                this.Viewport.addChild(cropImage);
                // app.stage.addChild(cropImage);
                this.Viewport.mask = cropImage;
    
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
    cancelDraw() {
        //Resets all line UI components
        this.LMSIGraphics.clear();
        this.cancel_draw = true;
        this.drawing = false;
        this.setGuideText("Select two points on a image to crop.");
    }

    /**
     *  Resets cancel_draw after canelDraw() is called.
     */
    cancelUp() {
        // Resets cancel value
        cancel_draw = false;
        
        // restore alpha of cancle button, since there is no graphics on screen to cancel
        cancel_button.alpha = 0.33;
    } // end cancel up

    /**
     *  Helper function for mode buttons
     *  Change mode between 'drag' and 'screenshot'
     */
    modeChange(event) {

        // Resets all line UI components
        this.LMSIGraphics.clear();

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

            this.dragMode = false;

            // change guideText to 'screenshot' mode
            this.setGuideText("Select two points on a image to copy.");
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
            
            this.setGuideText("Drag, wheel and scroll the image to explore.");
        }
    } // end modeChange

    calculateZoomLvl() {

    } // end of calculateZoomLvl

}

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
var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");