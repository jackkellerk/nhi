class MultiBlockTool {

    constructor(imagePath, myX, myY, myWidth, myHeight) {
        this.container = new PIXI.Container();
        this.instructionContainer = new PIXI.Container();

        // Instantiate the PIXI JS Graphics Library (this is for the UI stuff)
        this.imagePath = imagePath;
        this.texture = new PIXI.Texture.fromImage(this.imagePath, true);
        this.dragImage = new PIXI.Sprite(this.texture);
        this.graphics = new PIXI.Graphics();
        this.additionalButtons = new PIXI.Graphics();

        // for button selecting and pressing
        this.currentlySelectedButtonAction = null;
        this.buttonArray = [1];
        this.extraIconForButtonArray = [];

        // This creates the welcome GUI (should probably be updated later)
        this.instructionGraphics = new PIXI.Graphics();
        this.style = new PIXI.TextStyle({font: '36px Verdana', fill: '#FFF', stroke: '#000', strokeThickness : 3, wordWrap : true, wordWrapWidth : 780});
        this.styleGotIt = new PIXI.TextStyle({font: '50px Verdana', fill: '#8BBBFF', stroke: '#4090FF', strokeThickness: 2});
        
        // These are the variables for the highlight function in Multi-block
        this.initialXMousePosition;
        this.initialYMousePosition;
        this.boxArray = [];
        this.comparisonBoxArray = [];
        this.informationBoxArray = [];
        this.intensity = []; // holds values for pixel intensity
        this.offset = 50; // 50 pixels between comparison boxes
        this.width = myWidth;
        this.height = myHeight;

        // These are the variables for the annotation feature in Multi-block
        this.strokeArray = [];
        this.drawingArray = [];

        this.clockwiseRotation = null; // Variables for rotation feature

        this.appWidth = app.screen.width;
        this.appHeight = app.screen.height;

        this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        // Create draggable image
        this.dragImage.interactive = true;
        this.dragImage.buttonMode = true;
        this.dragImage.anchor.set(0, 0);
        this.dragImage.scale.set(3); // 3 times actual size
    /*  this.dragImage
            .on('pointerdown', MB_onDragStart)
            .on('pointerdown', getMousePositionBefore)
            .on('pointerdown', highlightStart)
            .on('pointerdown', rotateImageStart)
            .on('pointerup', highlightFinish)
            .on('pointerup', MB_onDragEnd)
            .on('pointerup', getMousePositionAfter)
            .on('pointerup', drawFinish)
            .on('pointerup', rotateImageFinish)
            .on('pointerupoutside', MB_onDragEnd)
            .on('pointermove', draw)
            .on('pointermove', MB_rotateImage)
            .on('pointermove', MB_onDragMove)
            .on('pointermove', highlight)
            .on('pointermove', updateMousePosition);
        this.dragImage.x = 0;
        this.dragImage.y = 0;
    */
        this.container.addChild(this.dragImage);


        // Creates the big red circle
        this.instructionGraphics.beginFill(0xFF5B5B, 0.9);
        this.instructionGraphics.drawEllipse(25, this.appHeight - 70, this.appWidth * 3 / 4, this.appHeight * 3/ 4);
        this.instructionGraphics.endFill();
        this.instructionContainer.addChild(this.instructionGraphics);

        // Creates the welcome text
        var textSample = new PIXI.Text('Welcome!', this.style);
        textSample.position.x = 25;
        textSample.position.y = this.appHeight * 1 / 4;
        this.instructionContainer.addChild(textSample);
    
        // Creates the instruction text
        var textOtherSample = new PIXI.Text('Click the \n - move arrow button to drag the image across the screen \n - the rotate button to rotate the image \n - the highlight button to perform calculations \n - the help button for assistance \n - the draw button to annotate', this.tyle);
        textOtherSample.position.x = 25;
        textOtherSample.position.y = this.appHeight * 1 / 2;
        this.instructionContainer.addChild(textOtherSample);

        // Creates the 'got it' text
        this.textGotIt = new PIXI.Text('Ok', this.styleGotIt);
        this.textGotIt.position.x = this.appWidth * 7 / 11;
        this.textGotIt.position.y = this.appHeight * 9 / 10;
        this.textGotIt.interactive = true;
        this.textGotIt.buttonMode = true;
        this.instructionContainer.addChild(this.textGotIt);

        this.container.addChild(this.instructionContainer);

        //this.instructionContainer.visible = false;



        
        // Create the button functionality GUI

        // Create the button to drag
        var dragButton = this.drawRectButton( 20, this.appHeight - 80, 60, 60, 'drag');
        var dragCursor = new PIXI.Sprite.fromImage("Images/dragCursor.png", true);
            dragCursor.height = 40;
            dragCursor.width = 40;
            dragCursor.x = 30;
            dragCursor.y = this.appHeight - 70;
            dragCursor.alpha = 0.7;
            dragButton.addChild(dragCursor);
        this.buttonArray[this.buttonArray.length] = dragButton;
        this.container.addChild(dragButton);

        // Create the button to rotate
        var rotateButton = this.drawRectButton( 85, this.appHeight - 80, 60, 60, 'rotate');
        var rotateImage = new PIXI.Sprite.fromImage("Images/rotateImage.png", true);
            rotateImage.height = 30;
            rotateImage.width = 30;
            rotateImage.x = 100;
            rotateImage.y = this.appHeight - 65;
            rotateImage.alpha = 0.7;
            rotateButton.addChild(rotateImage);
        this.buttonArray[this.buttonArray.length] = rotateButton;
        this.container.addChild(rotateButton);

        // Create the button to highlight
        var highlightButton = this.drawRectButton( 150, this.appHeight - 80, 60, 60, 'highlight');
        var highlightCursor = new PIXI.Sprite.fromImage("Images/highlightImage.png", true);
            highlightCursor.height = 40;
            highlightCursor.width = 40;
            highlightCursor.x = 165;
            highlightCursor.y = this.appHeight - 70;
            highlightCursor.alpha = 1;
            highlightButton.addChild(highlightCursor);
        this.buttonArray[this.buttonArray.length] = highlightButton;
        this.container.addChild(highlightButton);

        // Create the help button for assistance
        var helpButton = this.drawRectButton( this.appWidth - 80, 20, 60, 60, 'help');
        var questionMark = new PIXI.Sprite.fromImage("Images/questionMark.png", true);
            questionMark.height = 30;
            questionMark.width = 30;
            questionMark.x = this.appWidth - 65;
            questionMark.y = 33;
            questionMark.alpha = 0.7;
        helpButton.addChild(questionMark);
        this.buttonArray[this.buttonArray.length] = helpButton;
        this.container.addChild(helpButton);

        // Create the annotation button to draw
        var annotateButton = this.drawRectButton( 215, this.appHeight - 80, 60, 60, 'annotate');
        var penImage = new PIXI.Sprite.fromImage("Images/penImage.png", true);
            penImage.height = 50;
            penImage.width = 50;
            penImage.x = 220;
            penImage.y = this.appHeight - 75;
            penImage.alpha = 0.7;
        annotateButton.addChild(penImage);
        this.buttonArray[this.buttonArray.length] = annotateButton;
        this.container.addChild(annotateButton);

        this.container.scale.x = this.container.scale.y = 0.70;

        
    }


    drawRectButton(x_position, y_position, height, width, action)
    {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1); // Color and opacity
        graphics.lineStyle(2, 0x414141, 1);
        graphics.drawRect(x_position, y_position, width, height);
        graphics.endFill();
        graphics.interactive = true;
        graphics.on('mouseover', this.onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
        .on('mouseout', this.onHoverOff)
        .on('pointerdown', this.onSelect)
        .on('pointerdown', this.nextActivity)
        .on('pointerdown', removeLastStroke)
        .on('pointerdown', makeButtonAppear);
        graphics.alpha = 0.5;
        graphics.assignAction(action);

        return graphics;
    }

    onHoverOver(event)
    {
        this.data = event.data;
        this.alpha = 1;
    }

    onHoverOff(event)
    {
        this.data = event.data;
        if(this.currentlySelectedButtonAction == this.action)
            return;
        this.alpha = 0.5;
    }

    onSelect(event)
    {
        //if(currentActivity == 'Multi-block')
        //{
            //this.instructionDisable();
        //}
        this.data = event.data;
        this.currentlySelectedButtonAction = this.action;
        if(this.currentlySelectedButtonAction == 'help')
            //this.instructionEnable();
        // Loop through each other button and disable them
        for(var i = 0; i < this.buttonArray.length; i++)
        {
            this.buttonArray[i].alpha = 0.5;
            if(this.buttonArray[i].action == this.currentlySelectedButtonAction) {
                this.buttonArray[i].alpha = 1;
            }
        }
    }

    // Functionality to enable the welcome page
    instructionEnable(event)
    {
        //this.instructionContainer.visible = true;
    }
    
    // Functionality to disable the welcome page
    instructionDisable(event)
    {
        //this.instructionContainer.visible = false;
    }

    // Moves the current activity to the next
    nextActivity()
    {
        if(this.currentlySelectedButtonAction != 'switchActivity')
            return;
        
        // Loops through array to determine which activity we are on
        for(var i = 0; i < this.activityArray.length; i++)
        {
            // if found current activity in the array, move it to the next one
            if(this.currentActivity == this.activityArray[i] && this.activityArray[i + 1] != null)
            {
                this.currentActivity = this.activityArray[i + 1];
                updateActivity();
                return;
            }
        }
    }

    // Adds additional functionality to existing buttons (for Multi-block)
    makeButtonAppear()
    {
        if(this.currentActivity != 'Multi-block')
        {
            return;
        }

        this.additionalButtons.clear();

        // remove all additional buttons from the screen
        console.log(this.buttonArray.length);
        for(var i = this.buttonArray.length - 1; i > 12; i--)
        {
            this.buttonArray[i].parent.removeChild(this.buttonArray[i]);
            this.buttonArray.length = i;
        }

        // remove all additional icons from the screen
        for(var i = this.extraIconForButtonArray.length - 1; i > -1; i--)
        {
            this.extraIconForButtonArray[i].parent.removeChild(this.extraIconForButtonArray[i]);
            this.extraIconForButtonArray.length = i;
        }

        if(this.currentlySelectedButtonAction == 'annotate' || this.currentlySelectedButtonAction == 'annotateUndo')
        {
            this.additionalButtons.beginFill(0xFFFFFF, 1); // Color and opacity
            this.additionalButtons.lineStyle(2, 0x414141, 1);
            this.additionalButtons.drawRect(app.screen.width - 80, app.screen.height - 80, 60, 60);
            this.additionalButtons.endFill();
            this.additionalButtons.interactive = true;
            this.additionalButtons.on('mouseover', this.onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
            .on('mouseout', this.onHoverOff)
            .on('pointerdown', this.onSelect)
            .on('pointerdown', this.removeLastStroke)
            .on('pointerdown', this.makeButtonAppear);
            this.additionalButtons.alpha = 0.5;
            this.additionalButtons.assignAction('annotateUndo');
            this.buttonArray[this.buttonArray.length] = this.additionalButtons;
            this.container.addChild(this.additionalButtons);

            // Add the eraser icon
            var eraserImage = new PIXI.Sprite.fromImage('Images/eraser.png', true);
            var iconContainer = new PIXI.Container();
            eraserImage.height = 50;
            eraserImage.width = 50;
            eraserImage.x = app.screen.width - 75;
            eraserImage.y = app.screen.height - 75;
            eraserImage.alpha = 0.7;
            iconContainer.addChild(eraserImage);
            this.extraIconForButtonArray[this.extraIconForButtonArray.length] = iconContainer;
            this.container.addChild(iconContainer);
        }
        else if(this.currentlySelectedButtonAction == 'highlight' || this.currentlySelectedButtonAction == 'boxCalculation')
        {
            this.additionalButtons.beginFill(0xFFFFFF, 1); // Color and opacity
            this.additionalButtons.lineStyle(2, 0x414141, 1);
            this.additionalButtons.drawRect(app.screen.width - 80, app.screen.height - 80, 60, 60);
            this.additionalButtons.endFill();
            this.additionalButtons.interactive = true;
            this.additionalButtons.on('mouseover', this.onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
            .on('mouseout', this.onHoverOff)
            .on('pointerdown', this.onSelect)
            .on('pointerdown', this.boxCalculation)
            .on('pointerdown', this.makeButtonAppear);
            this.additionalButtons.alpha = 0.5;
            this.additionalButtons.assignAction('boxCalculation');
            this.buttonArray[this.buttonArray.length] = this.additionalButtons;
            this.container.addChild(this.additionalButtons);

            // Add the eraser icon
            var mathImage = new PIXI.Sprite.fromImage('Images/math.png', true);
            var iconContainer = new PIXI.Container();
            mathImage.height = 40;
            mathImage.width = 40;
            mathImage.x = app.screen.width - 70;
            mathImage.y = app.screen.height - 70;
            mathImage.alpha = 0.7;
            iconContainer.addChild(mathImage);
            this.extraIconForButtonArray[this.extraIconForButtonArray.length] = iconContainer;
            this.containeraddChild(iconContainer);
        }
    }
    








}