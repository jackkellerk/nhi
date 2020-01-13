class Spectrum
{
    
    /*
    parent: the parent object of this class. Call this object by using: this.spectrumObject = new Spectrum(this);
    sprite: the background sprite we are using
     */

    constructor(parent)
    {
        // Our instance variables
        this.parent = parent;
        this.currentlySelectedButtonAction = null;
        this.backgroundSprite = this.parent.backgroundSprite;
        this.SPContainer = new PIXI.Container();
        this.SPContainer.scale.x = 0.75; // This number is to make the container fit the WorkWindow
        this.SPContainer.scale.y = 0.72; // This number is to make the container fit the WorkWindow
        this.buttonArray = [];
        this.buttonContainer = new PIXI.Container();
        
        // This creates the button UI
        this.redButton = new RectButton(20, app.screen.height - 80, 60, 60, 'red', this);
        this.greenButton = new RectButton(85, app.screen.height - 80, 60, 60, 'green', this);
        this.blueButton = new RectButton(150, app.screen.height - 80, 60, 60, 'blue', this);
        this.originalButton = new RectButton(215, app.screen.height - 80, 60, 60, 'original', this);
        this.SPContainer.addChild(this.buttonContainer);

        // Add all our UI to the screen
        this.SPContainer.mask = this.parent.windowRect;
        this.parent.container.addChild(this.SPContainer);
    }


    UIBool(bool)
    {
        this.SPContainer.visible = bool;
    }
}
