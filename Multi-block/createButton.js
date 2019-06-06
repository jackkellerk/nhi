/* This is for button selecting and pressing */
var currentlySelectedButtonAction = null;
var buttonArray = [];
var extraIconForButtonArray = [];

/* default button with white background, grey outline, and full opacity
 * To use, write 'var button = new RectButton(x_position, y_position, height, width, action);'
 * x_position, y_position, height, and width are Integers in pixels
 * action is supposed to be a string describing the action of the button (this is custom made by you)
 * 
 * Now, once you create your button, add '.on('pointerdown', yourFunctionName);' to the list of .on's below.
 * add yourFunctionName() to where ever you want and program its function
 * When programming your functionality, make sure the first line of your function starts with 'if(currentlySelectedButtonAction != 'yourAction') return;'
 * This makes sure that your button is pressed, and not another button is pressed
 * If you want to see some examples, look at the functions below. If you have any other questions, ask Jack Kellerk.
*/
function RectButton(x_position, y_position, height, width, action)
{
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF, 1); // Color and opacity
    graphics.lineStyle(2, 0x414141, 1);
    graphics.drawRect(x_position, y_position, width, height);
    graphics.endFill();
    graphics.interactive = true;
    graphics.on('mouseover', onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
    .on('mouseout', onHoverOff)
    .on('pointerdown', onSelect)
    .on('pointerdown', removeLastStroke)
    .on('pointerdown', makeButtonAppear);
    graphics.alpha = 0.5;
    graphics.assignAction(action);
    buttonArray[buttonArray.length] = graphics;
    app.stage.addChild(graphics);
}

function onHoverOver(event)
{
    this.data = event.data;
	this.alpha = 1;
}

function onHoverOff(event)
{
    this.data = event.data;
    if(currentlySelectedButtonAction == this.action)
        return;
    this.alpha = 0.5;
}

function onSelect(event)
{
    // instructionDisable(); for now because we are implementing everyone's code
    this.data = event.data;
    currentlySelectedButtonAction = this.action;
    if(currentlySelectedButtonAction == 'help')
        instructionEnable();
    // Loop through each other button and disable them
    for(var i = 0; i < buttonArray.length; i++)
    {
        buttonArray[i].alpha = 0.5;
        if(buttonArray[i].action == currentlySelectedButtonAction)
            buttonArray[i].alpha = 1;
    }
}

// Adds additional functionality to existing buttons
function makeButtonAppear()
{
    var graphics = new PIXI.Graphics();

    graphics.clear();

    // remove all additional buttons from the screen
    for(var i = buttonArray.length - 1; i > 4; i--)
    {
        buttonArray[i].parent.removeChild(buttonArray[i]);
        buttonArray.length = i;
    }

    // remove all additional icons from the screen
    for(var i = extraIconForButtonArray.length - 1; i > -1; i--)
    {
        extraIconForButtonArray[i].parent.removeChild(extraIconForButtonArray[i]);
        extraIconForButtonArray.length = i;
    }

    if(currentlySelectedButtonAction == 'annotate' || currentlySelectedButtonAction == 'annotateUndo')
    {
        graphics.beginFill(0xFFFFFF, 1); // Color and opacity
        graphics.lineStyle(2, 0x414141, 1);
        graphics.drawRect(app.screen.width - 80, app.screen.height - 80, 60, 60);
        graphics.endFill();
        graphics.interactive = true;
        graphics.on('mouseover', onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
        .on('mouseout', onHoverOff)
        .on('pointerdown', onSelect)
        .on('pointerdown', removeLastStroke)
        .on('pointerdown', makeButtonAppear);
        graphics.alpha = 0.5;
        graphics.assignAction('annotateUndo');
        buttonArray[buttonArray.length] = graphics;
        app.stage.addChild(graphics);

        // Add the eraser icon
        var eraserImage = new PIXI.Sprite.fromImage('eraser.png', true);
        var iconContainer = new PIXI.Container();
		eraserImage.height = 50;
		eraserImage.width = 50;
		eraserImage.x = app.screen.width - 75;
		eraserImage.y = app.screen.height - 75;
        eraserImage.alpha = 0.7;
        iconContainer.addChild(eraserImage);
        extraIconForButtonArray[extraIconForButtonArray.length] = iconContainer;
        app.stage.addChild(iconContainer);
    }
    else if(currentlySelectedButtonAction == 'highlight' || currentlySelectedButtonAction == 'boxCalculation')
    {
        graphics.beginFill(0xFFFFFF, 1); // Color and opacity
        graphics.lineStyle(2, 0x414141, 1);
        graphics.drawRect(app.screen.width - 80, app.screen.height - 80, 60, 60);
        graphics.endFill();
        graphics.interactive = true;
        graphics.on('mouseover', onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
        .on('mouseout', onHoverOff)
        .on('pointerdown', onSelect)
        .on('pointerdown', boxCalculation)
        .on('pointerdown', makeButtonAppear);
        graphics.alpha = 0.5;
        graphics.assignAction('boxCalculation');
        buttonArray[buttonArray.length] = graphics;
        app.stage.addChild(graphics);

        // Add the eraser icon
        var mathImage = new PIXI.Sprite.fromImage('math.png', true);
        var iconContainer = new PIXI.Container();
		mathImage.height = 40;
		mathImage.width = 40;
		mathImage.x = app.screen.width - 70;
		mathImage.y = app.screen.height - 70;
        mathImage.alpha = 0.7;
        iconContainer.addChild(mathImage);
        extraIconForButtonArray[extraIconForButtonArray.length] = iconContainer;
        app.stage.addChild(iconContainer);
    }
}