        function startMultiblock()
        {
             // Grab Background Image
            var texture = PIXI.Texture.fromImage('Images/sinteredMetal.png', true);
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

            // Instantiate the PIXI JS Graphics Library
            var graphics = new PIXI.Graphics();

            // Create draggable image
            var dragImage = new PIXI.Sprite(texture);
            dragImage.interactive = true;
            dragImage.buttonMode = true;
            dragImage.anchor.set(0, 0);
            dragImage.scale.set(3); // 3 times actual size
            /* dragImage
				.on('pointerdown', onDragStart)
                .on('pointerdown', getMousePositionBefore)
                .on('pointerdown', highlightStart)
                .on('pointerdown', rotateImageStart)
                .on('pointerup', highlightFinish)
				.on('pointerup', onDragEnd)
                .on('pointerup', getMousePositionAfter)
                .on('pointerup', drawFinish)
                .on('pointerup', rotateImageFinish)
                .on('pointerupoutside', onDragEnd)
                .on('pointermove', draw)
                .on('pointermove', rotateImage)
                .on('pointermove', onDragMove)
                .on('pointermove', highlight)
				.on('pointermove', updateMousePosition); */
            dragImage.x = 0;
            dragImage.y = 0;
            app.stage.addChild(dragImage);









        // This creates the welcome GUI (should probably be updated later)
        var instructionGraphics = new PIXI.Graphics();
        var instructionContainer = new PIXI.Container();
        var style = { font: '36px Verdana', fill: '#FFF', stroke: '#000', strokeThickness : 3, wordWrap : true, wordWrapWidth : 780 }
        var styleGotIt = { font: '50px Verdana', fill: '#8BBBFF', stroke: '#4090FF', strokeThickness: 2 }

        // Creates the big red circle
        instructionGraphics.beginFill(0xFF5B5B, 0.9);
        instructionGraphics.drawEllipse(25, app.screen.height - 70, app.screen.width * 3 / 4, app.screen.height * 3/ 4);
        instructionGraphics.endFill();
        instructionContainer.addChild(instructionGraphics);

        // Creates the welcome text
        var textSample = new PIXI.Text('Welcome!', style);
        textSample.position.x = 25;
        textSample.position.y = app.screen.height * 1 / 4;
        instructionContainer.addChild(textSample);
        
        // Creates the instruction text
        var textOtherSample = new PIXI.Text('Click the \n - move arrow button to drag the image across the screen \n - the rotate button to rotate the image \n - the highlight button to perform calculations \n - the help button for assistance \n - the draw button to annotate', style);
		textOtherSample.position.x = 25;
        textOtherSample.position.y = app.screen.height * 1 / 2;
        instructionContainer.addChild(textOtherSample);
        
        // Creates the 'got it' text
        var textGotIt = new PIXI.Text('Ok', styleGotIt);
		textGotIt.position.x = app.screen.width * 7 / 11;
		textGotIt.position.y = app.screen.height * 9 / 10;
		textGotIt.interactive = true;
		textGotIt.buttonMode = true;
        textGotIt.on('pointerdown', instructionDisable);
        instructionContainer.addChild(textGotIt);

        // Add the container to the stage
        app.stage.addChild(instructionContainer);









        // Create the button functionality GUI

        // Create the button to drag
		var dragButton = new RectButton( 20, app.screen.height - 80, 60, 60, 'drag');
        // Create the button to rotate
        var rotateButton = new RectButton( 85, app.screen.height - 80, 60, 60, 'rotate');
        // Create the button to highlight
        var highlightButton = new RectButton( 150, app.screen.height - 80, 60, 60, 'highlight');
        // Create the help button for assistance
        var helpButton = new RectButton( app.screen.width - 80, 20, 60, 60, 'help');
        // Create the annotation button to draw
        var annotateButton = new RectButton( 215, app.screen.height - 80, 60, 60, 'annotate');

        // This creates the icons for each button
        var iconContainer = new PIXI.Container();

        // Create the rotateImage
		var rotateImage = new PIXI.Sprite.fromImage('Images/rotateImage.png', true);
		rotateImage.height = 30;
		rotateImage.width = 30;
		rotateImage.x = 100;
		rotateImage.y = app.screen.height - 65;
        rotateImage.alpha = 0.7;
        iconContainer.addChild(rotateImage);
		// Create the pen icon
		var penImage = new PIXI.Sprite.fromImage('Images/penImage.png', true);
		penImage.height = 50;
		penImage.width = 50;
		penImage.x = 220;
		penImage.y = app.screen.height - 75;
        penImage.alpha = 0.7;
        iconContainer.addChild(penImage);
		// Create the questionMark image
		var questionMark = new PIXI.Sprite.fromImage('Images/questionMark.png', true);
		questionMark.height = 30;
		questionMark.width = 30;
		questionMark.x = app.screen.width - 65;
		questionMark.y = 33;
        questionMark.alpha = 0.7;
        iconContainer.addChild(questionMark);
		// Create the image to drag
		var dragCursor = new PIXI.Sprite.fromImage('Images/dragCursor.png', true);
		dragCursor.height = 40;
		dragCursor.width = 40;
		dragCursor.x = 30;
		dragCursor.y = app.screen.height - 70;
        dragCursor.alpha = 0.7;
        iconContainer.addChild(dragCursor);
        // Create the highlight image to highlight
        var highlightCursor = new PIXI.Sprite.fromImage('Images/highlightImage.png', true);
		highlightCursor.height = 40;
		highlightCursor.width = 40;
		highlightCursor.x = 165;
		highlightCursor.y = app.screen.height - 70;
        highlightCursor.alpha = 1;
        iconContainer.addChild(highlightCursor);

        // Add the iconContainer to the stage
        app.stage.addChild(iconContainer);
        }

        throw new Error('Halt the rest of Multi-block for now! - Jack');









        // This creates the highlight functionality (this creates the rectangles)
        var initialXMousePosition;
        var initialYMousePosition;
        var boxArray = [];
        var comparisonBoxArray = [];
        var informationBoxArray = [];
        var intensity = []; // holds values for pixel intensity
        var mouseData = app.renderer.plugins.interaction.mouse.global; // Change to pointer later
        var offset = 50; // 50 pixels between comparison boxes
        var width;
        var height;

        // Start function to create rectangles
        function highlightStart(event)
		{
			if(currentlySelectedButtonAction != 'highlight')
				return;
			initialXMousePosition = mouseData.x;
			initialYMousePosition = mouseData.y;
        }
        
        // Each frame draw a rectangle and erase last frame's rectangle
		function highlight(event)
		{
			if(currentlySelectedButtonAction != 'highlight' || !down)
				return;
			
			graphics.clear();

			width = mouseData.x - initialXMousePosition;
			height = mouseData.y - initialYMousePosition;

			graphics.lineStyle(5, 0xFFFB33, 1);
			graphics.drawRect(initialXMousePosition, initialYMousePosition, width, height);
			graphics.interactive = true;

            // draws it on the main stage, doesnt matter because it gets erased anyways
			app.stage.addChild(graphics);
        }
        
        // After the user finishes drawing their rectangle, redraw the last rectangle from highlight(); Also store the information in an array for later reference
		function highlightFinish(event)
		{
			if(currentlySelectedButtonAction != 'highlight')
				return;
            
            // Create the container and instantiate the graphics library
            const mainBoxGraphics = new PIXI.Graphics();
            const boxContainer = new PIXI.Container();

			boxContainer.width = dragImage.width;
            boxContainer.height = dragImage.height;
            boxContainer.position.set(0 - xPosition, 0 - yPosition);
			mainBoxGraphics.lineStyle(5, 0xFFFB33, 1);
			mainBoxGraphics.beginFill(0xFFFFFF, 0.01);
			mainBoxGraphics.drawRect(initialXMousePosition + xPosition, initialYMousePosition + yPosition, width, height);
			mainBoxGraphics.endFill();
            mainBoxGraphics.interactive = true;
            boxContainer.addChild(mainBoxGraphics);

			boxArray[boxArray.length] = boxContainer;
            app.stage.addChild(boxContainer);
            
            // this adds the specific information for the box
            var newBox = new boxInformation(initialXMousePosition + xPosition, initialYMousePosition + yPosition, width, height);
            informationBoxArray[informationBoxArray.length] = newBox;

			// Create comparisonRectangles
			comparisonRectangles();
        }

        // Creates comparisonRectangles
        function comparisonRectangles()
        {
            if(width < 0)
				offset = offset * -1;

            const comparisonGraphics = new PIXI.Graphics();
            const comparisonContainer = new PIXI.Container();
            comparisonContainer.width = dragImage.width;
            comparisonContainer.height = dragImage.height;
            comparisonContainer.position.set(0 - xPosition, 0 - yPosition);
			comparisonGraphics.lineStyle(5, 0xFFFB33, 1);
			comparisonGraphics.beginFill(0xFFFFFF, 0.01);
			comparisonGraphics.drawRect(initialXMousePosition - offset - width + xPosition, initialYMousePosition + yPosition, width, height);
			comparisonGraphics.interactive = true;

			comparisonGraphics.lineStyle(5, 0xFFFB33, 1);
			comparisonGraphics.drawRect(initialXMousePosition + offset + width + xPosition, initialYMousePosition + yPosition, width, height);
			comparisonGraphics.endFill();
            comparisonGraphics.interactive = true;
            
            comparisonContainer.addChild(comparisonGraphics);

			comparisonBoxArray[comparisonBoxArray.length] = comparisonContainer;
			app.stage.addChild(comparisonContainer);

			height = null;
			width = null;
        }

        // Calculates the pixel intensity across. It is async because it takes time for the image to load from the source
        async function boxCalculation()
        {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var img = new Image();
            img.src = "sinteredMetal.png";

            // Waits until image loads
            while(img.height <= 0)
            {
                await sleep(50);
            }

            canvas.width = img.width;
            canvas.height = img.height;      
            context.drawImage(img, 0, 0);  

            // iterate through each column **ONLY WORKS FOR THE FIRST BOX CREATED RIGHT NOW**
            for(var i = 0; i < /* informationBoxArray[0].height  ONLY USE THE FIRST ROW RIGHT NOW */ 1; i++)
            {
                // iterate through each row
                for(var j = 0; j < informationBoxArray[0].width; j++)
                {
                    // getImageData takes in x-cooridinate/y-coordinate/width/height **Remember to divide each of the values by 3 because it is scaled by 3**
                    var rgba = context.getImageData((j + informationBoxArray[0].x_position) / 3, (i + informationBoxArray[0].y_position) / 3, 1, 1).data;
                    var temp = ((0.2126 * rgba[0]) + (0.7152 * rgba[1]) + (0.0722 * rgba[2]));
                    intensity[intensity.length] = temp;
                    console.log(rgba[0]);
                }
            }

            // once done collecting the data, call create a graph function
            createGraph();
        }

        // Helper sleep function for async functions in milliseconds
        function sleep(ms) 
        {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        










        // Create the annotating button functionality (drawing functionality)
        var strokeArray = [];
        var drawingArray = [];

        function draw()
        {
            if(currentlySelectedButtonAction != 'annotate' || !down)
                return;
            
            const drawingGraphics = new PIXI.Graphics();
            const drawingContainer = new PIXI.Container();
            drawingContainer.width = dragImage.width;
            drawingContainer.height = dragImage.height;
            drawingContainer.position.set(0 - xPosition, 0 - yPosition);
            drawingGraphics.beginFill(0xFF5B5B, 1);
            drawingGraphics.drawCircle(mouseData.x + xPosition, mouseData.y + yPosition, 5);
            drawingGraphics.endFill();

            drawingContainer.addChild(drawingGraphics);
            drawingArray[drawingArray.length] = drawingContainer;
            app.stage.addChild(drawingContainer);
        }

        function drawFinish()
        {
            if(currentlySelectedButtonAction != 'annotate')
                return;
            
            strokeArray[strokeArray.length] = drawingArray;
            drawingArray = [];
        }

        // removes the last stroke made 
        function removeLastStroke()
        {
            if(currentlySelectedButtonAction != 'annotateUndo' || strokeArray.length <= 0)
                return;
            
            // since each stroke is an array of dots itself, we made another array. this removes each dot in the stroke's array
            for(var i = 0; i < strokeArray[strokeArray.length - 1].length; i++)
            {
                strokeArray[strokeArray.length - 1][i].parent.removeChild(strokeArray[strokeArray.length - 1][i]);
            }
            strokeArray.pop();
        }
        








        // These are the dragging functions (from example but I edited them)
        function onDragStart(event)
        {
            // Ensure that the last box is erased from highlight
            graphics.clear();


            // If the drag button is not selected, return; (this variable is in createButton.js)
            if(currentlySelectedButtonAction != 'drag')
                return;

            this.data = event.data;
            let position = this.data.getLocalPosition(this);
            this.pivot.set(0,0);
            this.position.set(0 - xPosition, 0 - yPosition);
            this.dragging = true;

            
            // Ensure that each box follows the dragging pattern
            // Move each box in boxArray
            for(var i = 0; i < boxArray.length; i++)
            {
                boxArray[i].position.set(0 - xPosition, 0 - yPosition);
                
                // comparisonBoxArray has same length as boxArray so this works inside this for loop
                comparisonBoxArray[i].position.set(0 - xPosition, 0 - yPosition);
            }

            // Must do this for the annotations too
            for(var i = 0; i < strokeArray.length; i++)
            {
                for(var j = 0; j < strokeArray[i].length; j++)
                {
                    strokeArray[i][j].position.set(0 - xPosition, 0 - yPosition);
                }
            }
        }

        function onDragMove(event)
        {
            // If the drag button is not selected, return; (this variable is in createButton.js)
            if(currentlySelectedButtonAction != 'drag')
                return;
            
            if(this.dragging)
            {
                var newPosition = this.data.getLocalPosition(this.parent);

                // This ensures the image does not clip
                if(!(xPosition + deltaX <= 0) && !(xPosition + app.screen.width + deltaX >= dragImage.width))
                {
                    this.x = 0 - xPosition - deltaX;
                }

                if(!(yPosition + deltaY <= 0) && !(yPosition + app.screen.height + deltaY >= dragImage.height))
                {
                    this.y = 0 - yPosition - deltaY;
                }
                


                // Ensure that each box follows the dragging pattern
                // Move each box in boxArray
                for(var i = 0; i < boxArray.length; i++)
                {
                    boxArray[i].position.set(0 - xPosition - deltaX, 0 - yPosition - deltaY);

                    // comparisonBoxArray has same length as boxArray so this works inside this for loop
                    comparisonBoxArray[i].position.set(0 - xPosition - deltaX, 0 - yPosition - deltaY);
                }

                // Must do this for the annotation button too
                for(var i = 0; i < strokeArray.length; i++)
                {
                    for(var j = 0; j < strokeArray[i].length; j++)
                    {
                        strokeArray[i][j].position.set(0 - xPosition - deltaX, 0 - yPosition - deltaY);
                    }
                }   
            }
        }

        function onDragEnd(event)
        {
            // If the drag button is not selected, return; (this variable is in createButton.js)
            if(currentlySelectedButtonAction != 'drag')
                return;
            
            this.dragging = false;
            this.data = null;
        }









        // rotate the image starting function
        var clockwiseRotation = null;
        function rotateImageStart(event)
        {
            if(currentlySelectedButtonAction != 'rotate')
                return;

            initialXMousePosition = mouseData.x;
            initialYMousePosition = mouseData.y;
            
            setTimeout(determineRotation, 200);
        }

        function determineRotation()
        {
            if(mouseData.x < initialXMousePosition && mouseData.y > initialYMousePosition)
            {
                clockwiseRotation = true;
            }
            else if(mouseData.x > initialXMousePosition && mouseData.y > initialYMousePosition)
            {
                clockwiseRotation = true;
            }
            else 
            {
                clockwiseRotation = false;
            }
        }

        function updateRotateMousePosition()
        {
            initialXMousePosition = mouseData.x;
			initialYMousePosition = mouseData.y;
        }

        // move function of rotateImage
        function rotateImage(event)
        {
            if((currentlySelectedButtonAction != 'rotate') || !down || (clockwiseRotation == null))
                return;
            
            // set pivot at the center of the screen
            dragImage.pivot.set(0, 0);
            
            // rotate image counter-clockwise
            if(clockwiseRotation)
            {
                dragImage.rotation -= (0.001 * (Math.abs(mouseData.x - initialXMousePosition) + Math.abs(mouseData.y - initialYMousePosition)));
            }
            else
            {
                dragImage.rotation += (0.001 * (Math.abs(mouseData.x - initialXMousePosition) + Math.abs(mouseData.y - initialYMousePosition)));
            }

            // we want to reset the mouse position
            updateRotateMousePosition();
        }

        function rotateImageFinish(event)
        {
            clockwiseRotation = null;
        }








        // Functionality to enable the welcome page
        function instructionEnable(event)
		{
			instructionContainer.visible = true;
        }
        
        // Functionality to disable the welcome page
        function instructionDisable(event)
		{
			instructionContainer.visible = false;
        }