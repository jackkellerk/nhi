// This class creates button objects for Multi-Block
class RectButton
{
    constructor(x_position, y_position, height, width, action, parent)
    {
        // Set the parent object of this object to the window
        this.parent = parent;

        // Create the UI and display it in the parent window
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFFFFFF, 1); // Color and opacity
        this.graphics.lineStyle(2, 0x414141, 1);
        this.graphics.drawRect(x_position, y_position, width, height);
        this.graphics.endFill();
        this.graphics.interactive = true;
        this.action = action;
        this.graphics.on('mouseover', (event) => { this.graphics.alpha = 1; }) // When mouse hovers over the button, it calls onHoverOver() function
            .on('mouseout', (event) => { if(this.parent.currentlySelectedButtonAction != this.action) { this.graphics.alpha = 0.5; } })
            .on('pointerdown', (event) => 
            {
                this.parent.currentlySelectedButtonAction = this.action;
                if(this.parent.currentlySelectedButtonAction == 'help')
                {
                    this.parent.instructionEnable();
                }
                
                // Loop through each other button and disable them
                for(var i = 0; i < this.parent.buttonArray.length; i++)
                {
                    this.parent.buttonArray[i].graphics.alpha = 0.5;
                    if(this.parent.buttonArray[i].action == this.parent.currentlySelectedButtonAction)
                        this.parent.buttonArray[i].graphics.alpha = 1;
                }
            });
        this.graphics.alpha = 0.5;
        this.parent.buttonArray[this.parent.buttonArray.length] = this;
        this.parent.buttonContainer.addChild(this.graphics);
    }
}