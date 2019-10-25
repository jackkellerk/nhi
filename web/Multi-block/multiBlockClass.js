// Create an instance of the MultiBlock window
class MultiBlock
{
    constructor(background_sprite_path, parent)
    {
        // Assign the parent
        this.parent = parent;

        /* Instantiate variables (previously stored in globalVariables.js) */
        this.MBContainer = new PIXI.Container();
        this.MBContainer.scale.x = 0.75; // This number is to make the container fit the WorkWindow
        this.MBContainer.scale.y = 0.72; // This number is to make the container fit the WorkWindow

        /* This is for button selecting and pressing */
        this.currentlySelectedButtonAction = null;
        this.buttonArray = [];
        this.extraIconForButtonArray = [];
        this.additionalButtons = new PIXI.Graphics();

        // Instantiate the PIXI JS Graphics Library (this is for the UI stuff)
        this.graphics = new PIXI.Graphics();
        this.dragImage = null;

        // These are the variables for the highlight function in Multi-block
        this.initialXMousePosition;
        this.initialYMousePosition;
        this.boxArray = [];
        this.comparisonBoxArray = [];
        this.informationBoxArray = [];
        this.intensity = []; // holds values for pixel intensity
        this.offset = 50; // 50 pixels between comparison boxes
        this.width = 0;
        this.height = 0;

        // These are the variables for the annotation feature in Multi-block
        this.strokeArray = [];
        this.drawingArray = [];

        // Variables for rotation feature
        this.clockwiseRotation = null;

        // This is for the instruction feature
        this.instructionContainer = new PIXI.Container();
        /* End of variables from globalVariables */

        // Grab Background Image
        this.texture = PIXI.Texture.fromImage(background_sprite_path, true);
        this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        // Instantiate the position coordinate system
        this.positionSystem = new Position(0, 0);

        // Create draggable image
        this.dragImage = new PIXI.Sprite(this.texture);
        this.dragImage.interactive = true;
        this.dragImage.buttonMode = true;
        this.dragImage.anchor.set(0, 0);
        this.dragImage.scale.set(3); // 3 times actual size
        this.dragImage
            .on('pointerdown', (event) => 
            {
                // This is the onDragStart function

                // Ensure that the last box is erased from highlight because when you draw a box it creates two. Try commenting it out to see why.
                this.graphics.clear();

                // If the drag button is not selected, return; (this variable is in createButton.js)
                if(this.currentlySelectedButtonAction != 'drag')
                    return;

                this.dragImage.pivot.set(0,0);
                this.dragImage.position.set(0 - this.positionSystem.xPosition, 0 - this.positionSystem.yPosition);
                this.dragImage.dragging = true;

        
                // Ensure that each box follows the dragging pattern
                // Move each box in boxArray
                for(var i = 0; i < this.boxArray.length; i++)
                {
                    this.boxArray[i].position.set(0 - this.positionSystem.xPosition, 0 - this.positionSystem.yPosition);
            
                    // comparisonBoxArray has same length as boxArray so this works inside this for loop
                    this.comparisonBoxArray[i].position.set(0 - this.positionSystem.xPosition, 0 - this.positionSystem.yPosition);
                }

                // Must do this for the annotations too
                for(var i = 0; i < this.strokeArray.length; i++)
                {
                    for(var j = 0; j < this.strokeArray[i].length; j++)
                    {
                        this.strokeArray[i][j].position.set(0 - this.positionSystem.xPosition, 0 - this.positionSystem.yPosition);
                    }
                }
            })
            .on('pointerdown', (event) => 
            {
                // This is the getMousePositionBefore function
                var mouseData = app.renderer.plugins.interaction.mouse.global;
                this.positionSystem.initialMouseX = mouseData.x;   
                this.positionSystem.initialMouseY = mouseData.y;
            })
            .on('pointerdown', (event) => 
            {
                // This is the highlightStart function

                if(this.currentlySelectedButtonAction != 'highlight')
				    return;
                
                var mouseData = app.renderer.plugins.interaction.mouse.global;
                this.initialXMousePosition = mouseData.x;
			    this.initialYMousePosition = mouseData.y;
            })
            .on('pointerdown', rotateImageStart)
            .on('pointerup', (event) =>
            {
                // This is the highlightFinish function

                if(this.currentlySelectedButtonAction != 'highlight')
				    return;
            
                // Create the container and instantiate the graphics library
                const mainBoxGraphics = new PIXI.Graphics();
                const boxContainer = new PIXI.Container();

			    boxContainer.width = this.dragImage.width;
                boxContainer.height = this.dragImage.height;
                boxContainer.position.set(0 - this.positionSystem.xPosition, 0 - this.positionSystem.yPosition);
			    mainBoxGraphics.lineStyle(5, 0xFFFB33, 1);
			    mainBoxGraphics.beginFill(0xFFFFFF, 0.01);
			    mainBoxGraphics.drawRect(this.initialXMousePosition + this.positionSystem.xPosition, this.initialYMousePosition + this.positionSystem.yPosition, this.width, this.height);
			    mainBoxGraphics.endFill();
                mainBoxGraphics.interactive = true;
                boxContainer.addChild(mainBoxGraphics);

			    this.boxArray[this.boxArray.length] = boxContainer;
                this.MBContainer.addChild(boxContainer);
                this.parent.container.addChild(this.MBContainer);
            
                // this adds the specific information for the box
                //var newBox = new boxInformation(initialXMousePosition + xPosition, initialYMousePosition + yPosition, width, height);
                //informationBoxArray[informationBoxArray.length] = newBox;

			    // Create comparisonRectangles
			    if(this.width < 0)
				    this.offset = this.offset * -1;

                const comparisonGraphics = new PIXI.Graphics();
                const comparisonContainer = new PIXI.Container();
                comparisonContainer.width = this.dragImage.width;
                comparisonContainer.height = this.dragImage.height;
                comparisonContainer.position.set(0 - this.positionSystem.xPosition, 0 - this.positionSystem.yPosition);
			    comparisonGraphics.lineStyle(5, 0xFFFB33, 1);
			    comparisonGraphics.beginFill(0xFFFFFF, 0.01);
			    comparisonGraphics.drawRect(this.initialXMousePosition - this.offset - this.width + this.positionSystem.xPosition, this.initialYMousePosition + this.positionSystem.yPosition, this.width, this.height);
    			comparisonGraphics.interactive = true;

			    comparisonGraphics.lineStyle(5, 0xFFFB33, 1);
			    comparisonGraphics.drawRect(this.initialXMousePosition + this.offset + this.width + this.positionSystem.xPosition, this.initialYMousePosition + this.positionSystem.yPosition, this.width, this.height);
			    comparisonGraphics.endFill();
                comparisonGraphics.interactive = true;
            
                comparisonContainer.addChild(comparisonGraphics);

			    this.comparisonBoxArray[this.comparisonBoxArray.length] = comparisonContainer;
                this.MBContainer.addChild(comparisonContainer);
                this.parent.container.addChild(this.MBContainer);

			    height = 0;
			    width = 0;
            })
            .on('pointerup', (event) =>
            {
                // This is the onDragEnd function

                // If the drag button is not selected, return; (this variable is in createButton.js)
                if(this.currentlySelectedButtonAction != 'drag')
                    return;
        
                this.dragImage.dragging = false;
            })
            .on('pointerup', (event) => 
            {
                // This is the getMousePositionAfter function

                this.positionSystem.xPosition = this.positionSystem.xPosition + this.positionSystem.deltaX;
                this.positionSystem.yPosition = this.positionSystem.yPosition + this.positionSystem.deltaY;
                this.positionSystem.deltaX = 0;
                this.positionSystem.deltaY = 0;
            })
            .on('pointerup', drawFinish)
            .on('pointerup', rotateImageFinish)
            .on('pointerupoutside', (event) => 
            {
                // This is the onDragEnd function

                // If the drag button is not selected, return; (this variable is in createButton.js)
                if(this.currentlySelectedButtonAction != 'drag')
                    return;
        
                this.dragImage.dragging = false;
            })
            .on('pointermove', draw)
            .on('pointermove', MB_rotateImage)
            .on('pointermove', (event) => 
            {
                // This is the onDragMove function

                // If the drag button is not selected, return; (this variable is in createButton.js)
                if(this.currentlySelectedButtonAction != 'drag')
                    return;

                if(this.dragImage.dragging)
                {
                    // This ensures the image does not clip
                    if(!(this.positionSystem.xPosition + this.positionSystem.deltaX <= 0) && !(this.positionSystem.xPosition + app.screen.width + this.positionSystem.deltaX >= this.dragImage.width))
                    {
                        this.dragImage.x = 0 - this.positionSystem.xPosition - this.positionSystem.deltaX;
                    }
            
                    if(!(this.positionSystem.yPosition + this.positionSystem.deltaY <= 0) && !(this.positionSystem.yPosition + app.screen.height + this.positionSystem.deltaY >= this.dragImage.height))
                    {
                        this.dragImage.y = 0 - this.positionSystem.yPosition - this.positionSystem.deltaY;
                    }

                    // Ensure that each box follows the dragging pattern
                    // Move each box in boxArray
                    for(var i = 0; i < this.boxArray.length; i++)
                    {
                        this.boxArray[i].position.set(0 - this.positionSystem.xPosition - this.positionSystem.deltaX, 0 - this.positionSystem.yPosition - this.positionSystem.deltaY);

                        // comparisonBoxArray has same length as boxArray so this works inside this for loop
                        this.comparisonBoxArray[i].position.set(0 - this.positionSystem.xPosition - this.positionSystem.deltaX, 0 - this.positionSystem.yPosition - this.positionSystem.deltaY);
                    }

                    // Must do this for the annotation button too
                    for(var i = 0; i < this.strokeArray.length; i++)
                    {
                        for(var j = 0; j < this.strokeArray[i].length; j++)
                        {
                            this.strokeArray[i][j].position.set(0 - this.positionSystem.xPosition - this.positionSystem.deltaX, 0 - this.positionSystem.yPosition - this.positionSystem.deltaY);
                        }
                    }   
                }
            })
            .on('pointermove', (event) =>
            {
                // This is the highlight function

                if(this.currentlySelectedButtonAction != 'highlight' || !down)
				    return;
			
			    this.graphics.clear();

                var mouseData = app.renderer.plugins.interaction.mouse.global;
			    this.width = mouseData.x - this.initialXMousePosition;
			    this.height = mouseData.y - this.initialYMousePosition;

			    this.graphics.lineStyle(5, 0xFFFB33, 1);
			    this.graphics.drawRect(this.initialXMousePosition, this.initialYMousePosition, this.width, this.height);
			    this.graphics.interactive = true;

                // draws it on the main stage, doesnt matter because it gets erased anyways
                this.MBContainer.addChild(this.graphics);
                this.parent.container.addChild(this.MBContainer);
            })
            .on('pointermove', (event) =>
            {
                // This is the updateMousePosition function

                if(!down) // Checks whether left click is pressed
                    return;

                var mouseData = app.renderer.plugins.interaction.mouse.global;
                this.positionSystem.deltaX = this.positionSystem.initialMouseX - mouseData.x;
                this.positionSystem.deltaY = this.positionSystem.initialMouseY - mouseData.y;

                // this stops the canvas from clipping
                if(this.positionSystem.xPosition + this.positionSystem.deltaX <= 0)
                {
                    this.positionSystem.deltaX = -this.positionSystem.xPosition;
                }
                else if(this.positionSystem.xPosition + this.positionSystem.deltaX + app.screen.width >= this.dragImage.width)
                {
                    this.positionSystem.deltaX = this.dragImage.width - this.positionSystem.xPosition - app.screen.width;
                }

                if(this.positionSystem.yPosition + this.positionSystem.deltaY <= 0)
                {
                    this.positionSystem.deltaY = -this.positionSystem.yPosition;
                }
                else if(this.positionSystem.yPosition + this.positionSystem.deltaY + app.screen.height >= this.dragImage.height)
                {
                    this.positionSystem.deltaY = this.dragImage.height - app.screen.height - this.positionSystem.yPosition;
                }
            });
        
        this.dragImage.x = 0;
        this.dragImage.y = 0;
        this.MBContainer.addChild(this.dragImage);

        // This creates the welcome GUI (should probably be updated later)
        this.instructionGraphics = new PIXI.Graphics();
        this.style = { font: '36px Verdana', fill: '#FFF', stroke: '#000', strokeThickness : 3, wordWrap : true, wordWrapWidth : 780 };
        this.styleGotIt = { font: '50px Verdana', fill: '#8BBBFF', stroke: '#4090FF', strokeThickness: 2 };

        // Creates the big red circle
        this.instructionGraphics.beginFill(0xFF5B5B, 0.9);
        this.instructionGraphics.drawEllipse(25, app.screen.height - 70, app.screen.width * 3 / 4, app.screen.height * 3/ 4);
        this.instructionGraphics.endFill();
        this.instructionContainer.addChild(this.instructionGraphics);

        // Creates the welcome text
        this.textSample = new PIXI.Text('Welcome!', this.style);
        this.textSample.position.x = 25;
        this.textSample.position.y = app.screen.height * 1 / 4;
        this.instructionContainer.addChild(this.textSample);

        // Creates the instruction text
        this.textOtherSample = new PIXI.Text('Click the \n - move arrow button to drag the image across the screen \n - the rotate button to rotate the image \n - the highlight button to perform calculations \n - the help button for assistance \n - the draw button to annotate', this.style);
        this.textOtherSample.position.x = 25;
        this.textOtherSample.position.y = app.screen.height * 1 / 2;
        this.instructionContainer.addChild(this.textOtherSample);

        // Creates the 'got it' text
        this.textGotIt = new PIXI.Text('Ok', this.styleGotIt);
        this.textGotIt.position.x = app.screen.width * 7 / 11;
        this.textGotIt.position.y = app.screen.height * 9 / 10;
        this.textGotIt.interactive = true;
        this.textGotIt.buttonMode = true;
        this.textGotIt.on('pointerdown', (event) => { this.instructionContainer.visible = false; });
        this.instructionContainer.addChild(this.textGotIt);

        // Add the container to the stage
        this.MBContainer.addChild(this.instructionContainer);

        // Create the button functionality GUI

        // Create the button to drag
        this.buttonContainer = new PIXI.Container();
		this.dragButton = new RectButton( 20, app.screen.height - 80, 60, 60, 'drag', this);
        // Create the button to rotate
        this.rotateButton = new RectButton( 85, app.screen.height - 80, 60, 60, 'rotate', this);
        // Create the button to highlight
        this.highlightButton = new RectButton( 150, app.screen.height - 80, 60, 60, 'highlight', this);
        // Create the help button for assistance
        this.helpButton = new RectButton( app.screen.width - 50, 50, 60, 60, 'help', this);
        // Create the annotation button to draw
        //this.annotateButton = new RectButton( 215, app.screen.height - 80, 60, 60, 'annotate', this); Commenting out the annotation tool because I should probably remove it
        this.MBContainer.addChild(this.buttonContainer);

        // This creates the icons for each button
        this.iconContainer = new PIXI.Container();

        // Create the rotateImage
		this.rotateImage = new PIXI.Sprite.fromImage('Images/rotateImage.png', true);
		this.rotateImage.height = 30;
		this.rotateImage.width = 30;
		this.rotateImage.x = 100;
		this.rotateImage.y = app.screen.height - 65;
        this.rotateImage.alpha = 0.7;
        this.iconContainer.addChild(this.rotateImage);
		// Create the pen icon
		this.penImage = new PIXI.Sprite.fromImage('Images/penImage.png', true);
		this.penImage.height = 50;
		this.penImage.width = 50;
		this.penImage.x = 220;
		this.penImage.y = app.screen.height - 75;
        this.penImage.alpha = 0.7;
        //this.iconContainer.addChild(this.penImage); Commenting out the annotation tool because I should probably remove it
		// Create the questionMark image
		this.questionMark = new PIXI.Sprite.fromImage('Images/questionMark.png', true);
		this.questionMark.height = 30;
		this.questionMark.width = 30;
		this.questionMark.x = app.screen.width - 35;
		this.questionMark.y = 63;
        this.questionMark.alpha = 0.7;
        this.iconContainer.addChild(this.questionMark);
		// Create the image to drag
		this.dragCursor = new PIXI.Sprite.fromImage('Images/dragCursor.png', true);
		this.dragCursor.height = 40;
		this.dragCursor.width = 40;
		this.dragCursor.x = 30;
		this.dragCursor.y = app.screen.height - 70;
        this.dragCursor.alpha = 0.7;
        this.iconContainer.addChild(this.dragCursor);
        // Create the highlight image to highlight
        this.highlightCursor = new PIXI.Sprite.fromImage('Images/highlightImage.png', true);
		this.highlightCursor.height = 40;
		this.highlightCursor.width = 40;
		this.highlightCursor.x = 165;
		this.highlightCursor.y = app.screen.height - 70;
        this.highlightCursor.alpha = 1;
        this.iconContainer.addChild(this.highlightCursor);

        // Add the iconContainer to the stage
        this.MBContainer.addChild(this.iconContainer);

        // Mask the container and add it to the parent's container
        this.MBContainer.mask = this.parent.windowRect;
        this.parent.container.addChild(this.MBContainer);
    }

    instructionEnable()
    {
        this.instructionContainer.visible = true;
    }

    buttonBool(bool)
    {
        this.buttonContainer.visible = bool;
    }
}