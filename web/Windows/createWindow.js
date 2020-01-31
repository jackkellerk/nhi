
// class for work windows. customizable window name, position, image to be worked on, and sprite's image format
class WorkWindow
{

    constructor(windowName, x=0, y=0, image_src, spriteOnly=false) 
    {
        this.isOpen = true;  // to determine which one of multiple windows is in front of screen
        this.inFront = true;
        this.windowName = windowName;
        this.container = new PIXI.Container();
        this.windowRect = new PIXI.Graphics();
        this.width = 1.3*h;
        this.height = 0.73125*h;
        this.sprite = new PIXI.Sprite();
        if (spriteOnly) { this.sprite = new PIXI.Sprite(image_src); } // image is a texture
        else { this.sprite = new PIXI.Sprite.from(image_src); } // "image" is a path

        // initializing tool buttons as graphics
        this.tool1 = new PIXI.Graphics();
        this.tool2 = new PIXI.Graphics();
        this.tool3 = new PIXI.Graphics();
        this.tool4 = new PIXI.Graphics();

        // initialize interactive + dragable window border
        this.windowBorder = new PIXI.Graphics();

        w = app.screen.width;
        h = app.screen.height;

        this.createPositionX = x; //(w*0.25-3);
        this.createPositionY = y; //0;

        // set the initial coords for this window; these variables are in moveWindowAroundScreen.js
        this.xPositionWindow = this.createPositionX;
        this.yPositionWindow = this.createPositionY;

    }

    drawWindow(fill, image_src) {

        // backdrop to tool buttons
        var a_backdrop = new PIXI.Graphics();
            a_backdrop.beginFill(0xdddddd);
            a_backdrop.drawRect(0,0, 46,175);
            a_backdrop.endFill();
            a_backdrop.x = this.xPositionWindow + this.width;
            a_backdrop.y = this.yPositionWindow + 27;
        this.container.addChild(a_backdrop);


        // ------------------------- tool icons -------------------------

        this.tool1.lineStyle(2, 0xdddddd, 2);
        this.tool1.beginFill(0xdcdcdc);
        this.tool1.drawRoundedRect(-10,0, 55, 45, 3);
        this.tool1.endFill();
        this.tool1.buttonMode = true;
        this.tool1.x = this.xPositionWindow + this.width;
        this.tool1.y = this.yPositionWindow + 25;
        this.container.addChild(this.tool1);

        var zoomIcon = new PIXI.Sprite.from("Images/zoom-icon.png");
            zoomIcon.width = 40;
            zoomIcon.height = 40;
            zoomIcon.x = 3;
            zoomIcon.y = 2;
        this.tool1.addChild(zoomIcon);

        this.tool2.lineStyle(2, 0xdddddd, 2);
        this.tool2.beginFill(0xdcdcdc);
        this.tool2.drawRoundedRect(-10,0, 55,45, 3);
        this.tool2.endFill();
        this.tool2.buttonMode = true;
        this.tool2.x = this.tool1.x;
        this.tool2.y = this.tool1.y + 45; 
        this.container.addChild(this.tool2);

        let spectrumIcon = new PIXI.Sprite.from("Images/color-wheel.png");
            spectrumIcon.width = 35;
            spectrumIcon.height = 35;
            spectrumIcon.x = 6;
            spectrumIcon.y = 4;
        this.tool2.addChild(spectrumIcon);

        this.tool3.lineStyle(2, 0xdddddd, 2);
        this.tool3.beginFill(0xdcdcdc);
        this.tool3.drawRoundedRect(-10,0, 55,45, 3);
        this.tool3.endFill();
        this.tool3.buttonMode = true;
        this.tool3.x = this.tool2.x;
        this.tool3.y = this.tool2.y + 45; 
        this.container.addChild(this.tool3);

        let multiblockIcon = new PIXI.Sprite.from("Images/multi-block-icon.png");
            multiblockIcon.width = 37;
            multiblockIcon.height = 37;
            multiblockIcon.x = 5;
            multiblockIcon.y = 4;
        this.tool3.addChild(multiblockIcon);

            this.tool4.lineStyle(2, 0xdddddd, 2);
            this.tool4.beginFill(0xdcdcdc);
            this.tool4.drawRoundedRect(-10,0, 55,45, 3);
            this.tool4.endFill();
            this.tool4.buttonMode = true;
            this.tool4.x = this.tool3.x;
            this.tool4.y = this.tool3.y + 45; 
        this.container.addChild(this.tool4);

        let lineintensityIcon = new PIXI.Sprite.from("Images/line-intensity.png");
            lineintensityIcon.width = 37;
            lineintensityIcon.height = 37;
            lineintensityIcon.x = 5;
            lineintensityIcon.y = 3;
        this.tool4.addChild(lineintensityIcon);


        // ------------------------- window -------------------------

        // This is the thing we click on to drag the window around the screen
        this.windowBorder.beginFill(fill);
        this.windowBorder.drawRoundedRect(0,0, 1.3*h,0.73125*h, 5);
        this.windowBorder.endFill();
        this.windowBorder.pivot.set(0,0);
        this.windowBorder.buttonMode = true;
        this.windowBorder.position.x = this.xPositionWindow;
        this.windowBorder.position.y = this.yPositionWindow;
        this.container.addChild(this.windowBorder);

        // window background that masks tools
        this.windowRect.beginFill(0x000000);
        this.windowRect.drawRect(5,25, 1.3*h-10,0.73125*h-30);
        this.windowRect.endFill();
        this.windowRect.position.x = this.xPositionWindow;
        this.windowRect.position.y = this.yPositionWindow;
        this.container.addChild(this.windowRect);

        var windowTitle = new PIXI.Text(this.windowName,{fontFamily: 'Arial', fontSize: 15, fontType: 'bold', fill: 0x000000});
        windowTitle.position.x = this.windowRect.x + 12;
        windowTitle.position.y = this.windowRect.y + 4;
        this.container.addChild(windowTitle);


        if (isTouch) {
            w_menuCloseContainer.scale.x = w_menuCloseContainer.scale.y = 0.5;
            w_menuCloseContainer.x = w_menuCloseContainer.x + 300;
            w_menuCloseContainer.y = w_menuCloseContainer.y + 100;
        }

        this.closeWindowMenu = new PopupRect("Would you like to Exit " + this.windowName, "Exit");
        this.closeWindowMenu.graphics.lineStyle(5, 0xdddddd, 3);
        this.closeWindowMenu.drawPopup(0x7f7f7f, 2);
        
        this.closeIcon = new PIXI.Sprite.from("Images/cancel-icon.png");
        this.closeIcon.width = 24;
        this.closeIcon.height = 24;
        this.closeIcon.x = this.xPositionWindow + 1.3*h - 30;
        this.closeIcon.y = this.yPositionWindow;
        this.closeIcon.buttonMode = true;
        this.closeIcon.alpha = 0.8;
        this.container.addChild(this.closeIcon);
        
        this.minIcon = new PIXI.Sprite.from("Images/minimize-icon.png");
        this.minIcon.width = 22;
        this.minIcon.height = 20;
        this.minIcon.x = this.xPositionWindow + 1.3*h - 57;
        this.minIcon.y = this.yPositionWindow + 2;
        this.minIcon.buttonMode = true;
        this.minIcon.alpha = 0.8;
        this.container.addChild(this.minIcon);

        if (isTouch) {
            this.container.scale.x = this.container.scale.y = 0.4;
        }

        app.stage.addChild(this.container);



        /* All tools are put into individual (labeled) global containers 
        upon their start function call. Then the containers are resized to fit the
        work window. (see below)
        The tool buttons attached to the work window add the specified container
        to the work window container upon click/touch. */

        // I'm now attempting to put all tools into one container - Jack
        

        // Low Spectrum Magnification Imaging
        /*let myZoom = new Zoom(null, 0, 0);
        myZoom.LMSIContainer.scale.x = myZoom.LMSIContainer.scale.y = 0.9;
        myZoom.LMSIContainer.y += 20;
        myZoom.LMSIContainer.mask = this.windowRect;
        this.container.addChild(myZoom.LMSIContainer);
        this.ZoomContainer = myZoom.LMSIContainer;
        this.ZoomContainer.scale.x = this.ZoomContainer.scale.y = 0.9;
        this.ZoomContainer.y += 20;
        this.ZoomContainer.mask = this.windowRect;*/

        // The background image to be accessed is instantiated here; To access it in the window functions, do "this.parent.backgroundSprite".
        this.texture = PIXI.Texture.fromImage(image_src, true);
        this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.DEFAULT;//NEAREST;
        this.backgroundSprite = new PIXI.Sprite(this.texture);
        this.backgroundSpriteMaterial = null;

        // Create the 3D screen
        /* this.threeJSPath = "Images/blank.png";
        currentThreeJSInstance = new ThreeJS(this.threeJSPath, this);
        this.threeJS = currentThreeJSInstance;
        createThreeJS(); */

        // Multi-Block Analysis (The background image is defined as this.multiBlockObject.dragImage)
        this.multiBlockObject = new MultiBlock(this);

        // Multi-Spectrum Imaging
        this.spectrumObject = new Spectrum(this);
        
        // Line-Intensity Analysis
        //this.LIContainer = new PIXI.Container();
        //this.LIContainer.scale.x = this.LIContainer.scale.y = 0.97;
        //this.LIContainer.width = 1.3*h-10;
        //this.LIContainer.y += 23;
        //let myLineIntensity = new LineApplication(this.LIContainer);
        //myLineIntensity.LI_showAll();


        // This is to set the position
        this.container.position.set(0 - this.xPositionWindow, 0 - this.yPositionWindow);

    }

    clearWindow(event) {
        /* this.container.removeChild(this.ZoomContainer);
        this.container.removeChild(this.MScontainer);
        this.container.removeChild(this.MBContainer);
        this.container.removeChild(this.LIContainer); */

        this.tool1.x = this.xPositionWindow + this.width;
        this.tool2.x = this.xPositionWindow + this.width;
        this.tool3.x = this.xPositionWindow + this.width;
        this.tool4.x = this.xPositionWindow + this.width;
    }

}

// function to reset all buttons to original position before emitting the next tool + clearing window tools
function clearWindow(window) {
    /* window.container.removeChild(this.ZoomContainer);
    window.container.removeChild(this.MScontainer);
    this.container.removeChild(this.MBContainer);
    window.container.removeChild(this.LIContainer); */

    if (window.tool1.x > window.tool2.x) { 
        window.tool1.x -= 5;
    } else if (window.tool2.x > window.tool3.x) {
        window.tool2.x -= 5;
    } else if (window.tool3.x > window.tool4.x) {
        window.tool3.x -= 5;
    } else if (window.tool4.x > window.tool1.x) {
        window.tool4.x -= 5;
    }
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.parent.pivot.set(0,0);
    this.parent.position.set(0 - xPositionWindow, 0 - yPositionWindow);
    this.dragging = true;
}

function onDragEnd(event) {
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove(event) {
    if (this.dragging) {
        /* var newPosition = this.data.getLocalPosition(this.parent);
        this.parent.x = newx;
        this.parent.y = newPosition.y; */

        // This ensures the image does not clip
        this.parent.x = 0 - xPositionWindow - deltaXWindow;
        this.parent.y = 0 - yPositionWindow - deltaYWindow;
    }
}

