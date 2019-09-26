
// similar to createWindow but specifically made for window with 3d model
class SpecialWindow{

    constructor(imagePath)
    {
        // initial image displayed in window
        this.imagePath = imagePath;
        this.image = new PIXI.Sprite.from(imagePath);

        this.image.position.x = 0;
        this.image.position.y = 0;
        this.image.height = 0.73125*h - 30;

        this.isOpen = true;
        this.windowName = "3D Model Window";
        this.container = new PIXI.Container();
        this.windowRect = new PIXI.Graphics();
        this.width = 1.3*h;
        this.height = 0.73125*h;
        this.windowBorder = new PIXI.Graphics();
        this.tool1 = new PIXI.Graphics();

        w = app.screen.width;
        h = app.screen.height;

        //coolDown
        this.coolDownTexture = PIXI.Texture.from("Images/cooldown.png");

        
        this.createPositionX = x; //(w*0.25-3);
        this.createPositionY = y; //0;

        // set the initial coords for this window; these variables are in moveWindowAroundScreen.js
        this.xPositionWindow = this.createPositionX;
        this.yPositionWindow = this.createPositionY;
        
    }

    // call mySpecialWindow.drawWindow() to draw window to screen
    drawWindow(fill=0xDCDCDC)
    {
        // ------------------------- Window Graphics -------------------------

        // This is the thing we click on to drag the window around the screen
        this.windowBorder.beginFill(fill);
        this.windowBorder.drawRoundedRect(0,0, 1.3*h,0.73125*h, 5);
        this.windowBorder.endFill();
        this.windowBorder.pivot.set(0,0);
        this.windowBorder.buttonMode = true;
        this.windowBorder.position.x = 0; //this.xPositionWindow;
        this.windowBorder.position.y = 0; //this.yPositionWindow;
        this.container.addChild(this.windowBorder);

        // window background that masks tools
        this.windowRect.beginFill(0x000000);
        this.windowRect.drawRect(5,25, 1.3*h-10,0.73125*h-30);
        this.windowRect.endFill();
        this.windowRect.position.x = 0; //this.xPositionWindow;
        this.windowRect.position.y = 0; //this.yPositionWindow;
        this.container.addChild(this.windowRect);

        var windowTitle = new PIXI.Text(this.windowName,{fontFamily: 'Arial', fontSize: 15, fontType: 'bold', fill: 0x000000});
        windowTitle.position.x = this.windowRect.x + 12;
        windowTitle.position.y = this.windowRect.y + 4;
        this.container.addChild(windowTitle);
        
        this.refreshImage(this.imagePath);



        // ------------------------- Close Menu -------------------------

        // container sizes and positions are modified for multitouch screen (if isTouch boolean evaluates to true)
        if (isTouch) {
            w_menuCloseContainer.scale.x = w_menuCloseContainer.scale.y = 0.5;
            w_menuCloseContainer.x = w_menuCloseContainer.x + 300;
            w_menuCloseContainer.y = w_menuCloseContainer.y + 100;
        }

        this.closeWindowMenu = new PopupRect("Would you like to Exit " + this.windowName, "Exit");
        this.closeWindowMenu.graphics.lineStyle(5, 0xdddddd, 3);
        this.closeWindowMenu.drawPopup(0x7f7f7f, 2);
        
        // 'x' button to close window. clicking button prompts "would you like to close this window" popup 
        this.closeIcon = new PIXI.Sprite.from("Images/cancel-icon.png");
        this.closeIcon.width = 24;
        this.closeIcon.height = 24;
        this.closeIcon.x = 0 + 1.3*h - 30; //this.xPositionWindow + 1.3*h - 30;
        this.closeIcon.y = 0; //this.yPositionWindow;
        this.closeIcon.buttonMode = true;
        this.closeIcon.alpha = 0.8;
        this.container.addChild(this.closeIcon);
        
        // button to minimize window
        this.minIcon = new PIXI.Sprite.from("Images/minimize-icon.png");
        this.minIcon.width = 22;
        this.minIcon.height = 20;
        this.minIcon.x = 0 + 1.3*h - 57; //this.xPositionWindow + 1.3*h - 57;
        this.minIcon.y = 0 + 2; //this.yPositionWindow + 2;
        this.minIcon.buttonMode = true;
        this.minIcon.alpha = 0.8;
        this.container.addChild(this.minIcon);

        if (isTouch) {
            this.container.scale.x = this.container.scale.y = 0.4;
        }

        app.stage.addChild(this.container);

        // This is to set the position
        this.container.position.set(80, 80); //this.xPositionWindow, 0 - this.yPositionWindow);
        this.container.addChild(this.image);

        this.container.position.set(0 - this.xPositionWindow, 0 - this.yPositionWindow);
    }

    // function is called to change displayed image in window (called regularly for animated effect)
    refreshImage(imagePath)
    {
        this.image.texture = PIXI.Texture.from(imagePath);
        this.image.mask = this.windowRect;
        //this.image.texture = null;
        /* this.image.destroy();
        this.image = new PIXI.Sprite.from(imagePath);
        this.image.position.x = 0;
        this.image.position.y = 0;
        this.image.height = 0.73125*h - 30;
        this.container.addChild(this.image);
        this.image.mask = this.windowRect; */
    }

    // Jack Kellerk
    coolDownImage()
    {
        this.image.texture = this.coolDownTexture;
    }

}
