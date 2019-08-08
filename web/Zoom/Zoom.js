'use strict';

class Zoom {

    constructor(imageSource, _wid, _pid) {

        // set buttons
        this.cancel_button = cancel;
        this.mode_button = modeSwitch;
        this.screenshot = screenshotIcon;
        this.move = moveIcon;

        // actiave eventHandler for buttons        
        this.mode_button
            .on('pointerdown', this.modeChange.bind(this))
            .on('pointerdown', this.onButtonDown.bind(this))
            .on('pointerup', this.onButtonUp.bind(this));
        this.cancel_button
            .on('pointerdown', this.cancelDraw.bind(this))
            .on('pointerup', this.cancelUp.bind(this))
            .on('pointerover', this.cancelUp.bind(this))
            .on('pointeroutside', this.cancelUp.bind(this));

        // call pixi-viewport
        this.viewport = new PIXI.extras.Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: window.innerWidth,
            worldHeight: window.innerHeight,
            interaction: app.renderer.plugins.interaction // the interaction module is important for wheel() to work properly when renderer.view is placed or scaled
        });

        // activate mouse/touch gestures for viewport
        this.viewport
            .drag()
            .pinch()
            .wheel()
            .decelerate();

        // set variables for drawing
        // variable to determine if user clicked on cancel button
        this.cancel_draw = false;
        // varaible to determine current mode
        this.dragMode = true;
        // variable to determine if user is in the middle of drawing
        this.drwaing = false;

        // set wid & pid
        if (_wid != null) {
            this.wid = _wid;
        }
        if (_pid != null) {
            this.pid = _pid;
        }
        this.cid = null;

        // set Containers
        // containers for button, guide text, and LMSIContainer to hold everything
        this.LMSIContainer = new PIXI.Container();
        this.buttonContainer = new PIXI.Container();
        this.guideTextContainer = new PIXI.Container();

        // set Graphics
        this.buttonGraphics = new PIXI.Graphics();
        this.cropGraphics = new PIXI.Graphics();

        // set Points
        this.startPoint = new PIXI.Point(0, 0);
        this.endPoint = new PIXI.Point(0, 0);

        // set guideText
        this.guideText = new PIXI.Text('Drag, wheel and scroll the image to explore.', LMSIstyle);

        // set background
        // load image to drag (explore) or screenshot
        // if imageSource is null.. load default image
        if (imageSource == null) {
            this.zoom_bg_texture = bg_texture;
            this.zoom_bg_sprite = bg_sprite;
            this._imageOrigin_w = this.zoom_bg_sprite.width;
            this._imageOrigin_h = this.zoom_bg_sprite.height;
        }
        // if imageSource is a dir to an image
        else if (str.indexOf("/") >= 0 && str.indexOf("./") >= 0) {
            this.zoom_bg_texture = PIXI.Texture.from(imageSource);
            this.zoom_bg_sprite = new PIXI.Sprite(this.zoom_bg_texture);
            // get orignal width and height of the image
            this._imageOrigin_w = imageSource.width;
            this._imageOrigin_h = imageSource.height;
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
                this.zoom_bg_texture = PIXI.Texture.from(tempTexture);
                this.zoom_bg_sprite = new PIXI.Sprite(this.zoom_bg_texture);
            } else {
                PIXI.Texture.addTextureToCache(tempTexture, "LMSI" + wid);

                // to retrieve the texture it would be a case of
                var finalBase64Sprite = PIXI.Sprite.fromImage("LMSI" + wid);
                this.zoom_bg_texture = PIXI.Texture.from(finalBase64Sprite);
                this.zoom_bg_sprite = new PIXI.Sprite(this.zoom_bg_texture);
            }

            // get orignal width and height of the image
            this._imageOrigin_w = imageSource.width;
            this._imageOrigin_h = imageSource.height;
        }
        // nothing match. get default image
        else {
            this.zoom_bg_texture = bg_texture;
            this.zoom_bg_sprite = bg_sprite;
            this._imageOrigin_w = this.zoom_bg_sprite.width;
            this._imageOrigin_h = this.zoom_bg_sprite.height;
        }

        // add background image to viewport
        this.viewport.addChild(this.zoom_bg_sprite);
        
        // draw rectangle box to put buttons
        this.buttonGraphics.beginFill(0xFFFFFF);
        this.buttonGraphics.drawRect(5, 5, 60, 115);
        this.buttonGraphics.endFill();

        // add buttons and buttonGraphics to buttonContainer
        this.buttonContainer.addChild(this.buttonGraphics);
        this.buttonContainer.addChild(this.cancel_button);
        this.buttonContainer.addChild(this.mode_button);
        this.buttonContainer.addChild(this.move);
        this.buttonContainer.addChild(this.screenshot);

        // set set interativity of buttonConatiner
        this.buttonContainer.interactive = true;

        // set color of buttonContainer
        this.buttonContainer.tint = 0xff0000;

        // set location of guideText
        this.guideText.x = window.innerWidth / 2 - 250;
        this.guideText.y = 50;

        // add guideText to guideTextContainer
        this.guideTextContainer.addChild(this.guideText);

        // add the viewport to the container
        this.LMSIContainer.addChild(this.viewport);

        // add text & button container and graphcis
        this.LMSIContainer.addChild(this.buttonContainer);
        this.LMSIContainer.addChild(this.guideTextContainer);
        this.LMSIContainer.addChild(this.cropGraphics);

        // Sets the app to be interactable and allows drawPoint function to be called
        // LMSIContainer.interactive = true;
        app.stage.addChild(this.LMSIContainer);
        app.renderer.render(this.LMSIContainer);
    }

    get getWid() {
        return this.wid;
    }

    get getPid() {
        return this.pid;
    }

    
    /**
     *  Help functions for drawing rectancle area on image to crop
     */
    drawPoint(event) {
        if (!this.cancel_draw) { //Checks if user clicked on cancel button
    
            if (!this.drawing) { //Checks what phase of line create user is in
    
                // Updates starting point with toWorld()
                this.startPoint = this.viewport.toWorld(event.data.global.x, event.data.global.y);
    
                // Clears current graphics on screen
                this.cropGraphics.clear();
                // cropImage.clear();
                this.viewport.mask = null;
    
                // Constructs starting point
                this.cropGraphics.beginFill(0xFFFFFF);
                this.cropGraphics.drawRect(this.startPoint.x - 5, this.startPoint.y - 5, 10, 10);
                this.cropGraphics.endFill();
    
                // Changes drawing value 
                this.drawing = true;
    
                //Updates text and cancel button
                this.guideText.text = 'Select the ending point of rectangle. Cancel to reset.';
    
                // alpha of cancle button
                this.cancel_button.alpha = 1;
    
            } //end drawing if
            else {
    
                // update ending point with toWorld()
                this.endPoint = this.viewport.toWorld(event.data.global.x, event.data.global.y);
    
                //Draws end point
                this.cropGraphics.beginFill(0xFFFFFF);
                this.cropGraphics.drawRect(this.endPoint.x - 5, this.endPoint.y - 5, 10, 10);
                this.cropGraphics.endFill()

                //Constructs line from saved starting point to current end point
                this.cropGraphics.lineStyle(1, 0xFFFFFF).moveTo(this.startPoint.x, this.startPoint.y);

                // draw rectangle from current starting point and this.endPoint
                // points: starting (x,y) on canvas
                // event.data.global: ending (x,y) on canvas
                // event.data.global - points = width / height of rectangle
                this.cropGraphics.drawRect(this.startPoint.x, this.startPoint.y, this.endPoint.x - this.startPoint.x, this.endPoint.y -
                    this.startPoint.y);

                // set cropImage, which is PIXI.Graphics to mask image on screen
                // cropImage.drawRect(this.startPoint.x, this.startPoint.y, this.endPoint.x - this.startPoint.x, this.endPoint.y -
                //     this.startPoint.y);
                    
                // cropImage.renderable = true;
                // cropImage.cacheAsBitmap = true;

                // viewport.mask = cropImage;

                // swap background with cropped texture
                let screenshotImg = new PIXI.Texture(this.zoom_bg_texture, new PIXI.Rectangle(this.startPoint.x, this.startPoint.y, this.endPoint.x - this.startPoint.x, this.endPoint.y -
                    this.startPoint.y));
                this.zoom_bg_sprite.texture = screenshotImg;

                //Changes draw value and updates other information
                this.drawing = false;

                this.guideText.text = 'Copy of the selected area of image created.';

                // cropGraphics.clear() because to box offests in scaled images
                this.cropGraphics.clear();
    
            } //end else
        } //end cancel if
    } // end draw point
    
    /**
     *  called when cancel_button is fired.
     *  modify alpha value of the image, resets points[], cancel_draw, drawing
     */
    cancelDraw(event) {
        //Resets all line UI components
        this.cropGraphics.clear();

        // cropImage.clear();
        this.viewport.mask = null;

        this.cancel_draw = true;
        this.drawing = false;
        this.guideText.text = 'Select two points on a image to crop.';
    } // end cancel draw

    /**
     *  Resets cancel_draw after canelDraw() is called.
     */
    cancelUp(event) {
        // Resets cancel value
        this.cancel_draw = false;

        // restore alpha of cancle button, since there is no graphics on screen to cancel
        this.cancel_button.alpha = 0.33;
    } // end cancel up


    /**
     *  helper function for mode buttons
     *  change mode between 'drag' and 'screenshot'
     */
    modeChange(event) {


        // resets all line UI components
        this.cropGraphics.clear();

        // reset all the masking too
        // cropImage.clear();
        this.viewport.mask = null;

        // if mode is 'drag', pan & pinch zoom: change to 'screenshot'
        if (this.dragMode == true) {

            // change mode icon to 'screenshot'
            this.move.alpha = 0;
            this.screenshot.alpha = 1;

            // pause gestures for 'drag'
            this.viewport.pausePlugin('drag');
            this.viewport.pausePlugin('pinch');
            this.viewport.pausePlugin('wheel');
            this.viewport.pausePlugin('decelerate');

            // resume gestures for click & cancel
            this.viewport.on('pointerdown', this.drawPoint.bind(this));

            // resume cancel_button in 'drag' mode
            this.cancel_button.on('pointerdown', this.cancelDraw.bind(this));

            // change guideText to 'screenshot' mode
            this.dragMode = false;
            this.guideText.text = 'Select two points on a image to copy.';
        }
        // if mode is 'screenshot', getting part of the image and save it as child image of current image: change to 'drag'
        else {

            // change mode icon to 'screenshot'
            this.move.alpha = 1;
            this.screenshot.alpha = 0;

            // pause gestures for click & cancel
            this.viewport.off('pointerdown', this.drawPoint.bind(this));

            // pause cancel_button in 'screenshot' mode
            this.cancel_button.off('pointerdown', this.cancelDraw.bind(this));

            // resume gestures for 'drag'
            this.viewport.resumePlugin('drag');
            this.viewport.resumePlugin('pinch');
            this.viewport.resumePlugin('wheel');
            this.viewport.resumePlugin('decelerate');

            // change guideText to 'drag' mode
            this.dragMode = true;
            this.guideText.text = 'Drag, wheel and scroll the image to explore.';
        }
    } // end modeChange

    /**
     * General helper functions for button gestures including pointerdown, pointerup, pointerover, pointerdownout
     */
    onButtonDown() {
        this.isdown = true;
        // this.texture = textureButtonDown;
        this.alpha = 0.5;
    } // end onButtonDown

    onButtonUp() {
        this.isdown = false;
        this.alpha = 1;
        if (this.isOver) {
            // this.texture = textureButtonOver;
        } else {
            // this.texture = textureButton;
        }
    } // end onButtonUp
} // end Zoom