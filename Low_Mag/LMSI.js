class LMSI {
    constructor(imageSoruce, wid) {

        // base64 matcher in RegExp to test base64 strings
        var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
        
        // if imageSource is null
        if (imageSource == null) {

        }
        // if imageSource is a dir to an image
        else if (str.indexOf("/") >= 0 && str.indexOf("./") >= 0) {
            zoom_background = PIXI.Texture.from(imageSource);
            testimg = new PIXI.Sprite(zoom_background);
        }
        // if imageSource is on the server (base64)
        else if (base64Matcher.test(imageSoruce)) {
            var tempImg = new Image();
            tempImg.src = imageSoruce;

            var tempBaseTexture = new PIXI.BaseTexture(tempImg);
            var tempTexture = new PIXI.Texture(tempBaseTexture);

            // then add to the cache
            // TODO: use texture Cache
            if (wid == null) {
                zoom_background = tempTexture;
                testimg = new PIXI.Sprite(zoom_background);
            }
            else {
                PIXI.Texture.addTextureToCache(tempTexture, "LMSI" + wid);

                // to retrieve the texture it would be a case of
                var finalBase64Sprite = PIXI.Sprite.fromImage("LMSI" + wid);
                zoom_background = finalBase64Sprite;
                testimg = new PIXI.Sprite(zoom_background);
            }
        }
        // nothing match. get default image
        else {

        }

        // calls pixi-viewport
        Viewport = new PIXI.extras.Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 5000,
            worldHeight: 5000,
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

        // add background image to viewport
        Viewport.addChild(testimg);

        // add buttons to buttonContainer, and set interative
        buttonContainer.addChild(cancel_button);
        buttonContainer.addChild(mode_button);
        buttonContainer.addChild(move);
        buttonContainer.addChild(screenshot);
        buttonContainer.interactive = true;

        // update guideText
        var text = 'Drag, wheel and scroll the image to explore.';
        this.initGuideText(text);

        // add the viewport to the container
        LMSIContainer.addChild(Viewport);

        LMSIContainer.addChild(buttonContainer);
        LMSIContainer.addChild(guideTextContainer);

        // Sets the app to be interactable and allows drawPoint function to be called
        // LMSIContainer.interactive = true;

        app.stage.addChild(LMSIContainer);
        app.renderer.render(LMSIContainer);
    }

    initGuideText(text){
        guideText = new PIXI.Text(text, style);
        guideText.x = window.innerWidth / 2 - 250;
        guideText.y = 50;
        guideTextContainer.addChild(guideText);
    }

    updateGuideText(text){
        guideText.text = text;
    }

    /**
     *  Helper function for mode buttons
     *  Change mode between 'drag' and 'screenshot'
     */
    modeChange(event) {

        // Resets all line UI components
        graphics.clear();

        // if mode is 'drag', pan & pinch zoom: change to 'screenshot'
        if (dragMode == true) {

            // change mode icon to 'screenshot'
            move.alpha = 0;
            screenshot.alpha = 1;

            // pause gestures for 'drag'
            Viewport.pausePlugin('drag');
            Viewport.pausePlugin('pinch');
            Viewport.pausePlugin('wheel');
            Viewport.pausePlugin('decelerate');
        
            // resume gestures for click & cancel
            Viewport.on('pointerdown', drawPoint);

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
            Viewport.off('pointerdown', drawPoint);

            // pause cancel_button in 'screenshot' mode
            cancel_button.off('pointerdown', cancelDraw);

            // resume gestures for 'drag'
            Viewport.resumePlugin('drag');
            Viewport.resumePlugin('pinch');
            Viewport.resumePlugin('wheel');
            Viewport.resumePlugin('decelerate');

            // change guideText to 'drag' mode
            dragMode = true;
            guideText.text = 'Drag, wheel and scroll the image to explore.';
        }
    } // end modeChange

}