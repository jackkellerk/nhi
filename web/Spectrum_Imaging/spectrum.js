class Spectrum{
    
    /*
    parent: the parent object of this class. Call this object by using: this.spectrumObject = new Spectrum(this);
    sprite: the background sprite we are using
     */
    constructor(sprite, parent)
    {
        // Our instance variables
        this.parent = parent;
        this.SPContainer = new PIXI.Container();
        this.SPContainer.scale.x = 0.75; // This number is to make the container fit the WorkWindow
        this.SPContainer.scale.y = 0.72; // This number is to make the container fit the WorkWindow
        this.metalsprite = sprite;
        this.buttonArray = [];
        this.buttonContainer = new PIXI.Container();
        
        // This creates the button UI
        this.redButton = new RectButton(20, app.screen.height - 80, 60, 60, 'red', this);
        this.greenButton = new RectButton(85, app.screen.height - 80, 60, 60, 'green', this);
        this.blueButton = new RectButton(150, app.screen.height - 80, 60, 60, 'blue', this);
        this.originalButton = new RectButton(215, app.screen.height - 80, 60, 60, 'original', this);
        this.SPContainer.addChild(this.buttonContainer);

        // Add functionality to the sprite
        //this.parent.multiBlockObject.dragImage.on('pointerdown', (event) => { alert(this.parent.multiBlockObject.currentlySelectedButtonAction); })

        // Add all our UI to the screen
        this.SPContainer.mask = this.parent.windowRect;
        this.parent.container.addChild(this.SPContainer);

        // This is old -- remove it
        return;
        this.optionContainer = new PIXI.Container();
        let dropdownContainer = new PIXI.Container();
        this.height = 0.73125*(app.screen.height)-30;
        this.width = 1.3*(app.screen.height)-10;
        let icon = null;
        let text = null;
        let side = this.height * 0.1;
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.lineStyle(2, 0x414141, 1);
        graphics.drawRect(0, 0, this.width, this.height);
        graphics.endFill();
        graphics.interactive = true;
        graphics.on('mouseover', (event) => { this.graphics.alpha = 1; })
                .on('mouseout', (event) => { this.graphics.alpha = 0.5; })
                .on('pointerdown', (event) => { this.optionContainer.visible = !this.optionContainer.visible; });
        graphics.alpha = 0.5;
        this.SPContainer.addChild(graphics);
        if(icon){
            this.SPContainer.addChild(icon);
            icon.height = height;
            icon.width = width;
            icon.alpha = 0.5;
        }
        if(text){
            let style = {align: "center", fontWeight:"bold", fontSize: "60"};
            let textSprite = new PIXI.Text(text, style);
            textSprite.anchor.set(0.5);
            textSprite.x = width/2;
            textSprite.y = height/2;
            this.SPContainer.addChild(textSprite);
        }
        this.SPContainer.x = x;
        this.SPContainer.y = y;

        let dropdownBtn = this.createButton(this.height * 0.1, this.height * 0.8, side, side,
            function(){
                optionContainer.visible = !optionContainer.visible;
        });
        dropdownBtn.buttonMode = true;
        dropdownContainer.addChild(dropdownBtn);

        let options = ["red", "green", "blue", "original"];
        for (let i = 0; i < 4; i++) {
            let optionBtn = this.createButton(this.height * 0.1 + (i + 1) * this.height * 0.12, this.height * 0.8, side, side,
                () => { this.onClickColorOptions(options[i]) }, null, options[i]);
            optionBtn.buttonMode = true;
            optionContainer.addChild(optionBtn);
        }
        optionContainer.visible = false;
        dropdownContainer.addChild(optionContainer);

        this.SPContainer.addChild(dropdownContainer);
        
    }
    //helper function
    static getHexColor(colorStr) {
        let a = document.createElement('div');
        a.style.color = colorStr;
        let colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
        document.body.removeChild(a);
        return (colors.length >= 3) ? '0x' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
    }
    
    //icon: Sprite
    static createButton(x, y, height, width, clickAction, icon=null, text=null)
    {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.lineStyle(2, 0x414141, 1);
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();
        graphics.interactive = true;
        graphics.on('mouseover', function(){ this.alpha = 1; if(icon){icon.alpha = 1;}})
                .on('mouseout', function(){ this.alpha = 0.5; if(icon){icon.alpha = 0.5;}});
        if(clickAction){
            graphics.on('pointerdown', clickAction)
        }
        graphics.alpha = 0.5;
        this.SPContainer.addChild(graphics);
        if(icon){
            this.SPContainer.addChild(icon);
            icon.height = height;
            icon.width = width;
            icon.alpha = 0.5;
        }
        if(text){
            let style = {align: "center", fontWeight:"bold", fontSize: "60"};
            let textSprite = new PIXI.Text(text, style);
            textSprite.anchor.set(0.5);
            textSprite.x = width/2;
            textSprite.y = height/2;
            this.SPContainer.addChild(textSprite);
        }
        this.SPContainer.x = x;
        this.SPContainer.y = y;
        return this.SPContainer;
    }

    onClickColorOptions(color){
        switch(color) {
            case "red":
                this.metalsprite.tint = Spectrum.getHexColor("red");
                break;
            case "green":
                this.metalsprite.tint = Spectrum.getHexColor("green");
                break;
            case "blue":
                this.metalsprite.tint = Spectrum.getHexColor("blue");
                break;
            case "original":
                this.metalsprite.tint = 0xFFFFFF;
                break;
            default: void(0);
        }
    }
    
    // static pixiSetup() {
    //     Spectrum.metalsprite = new PIXI.Sprite.from('Images/sinteredMetal.png');
    //     Spectrum.metalsprite.anchor.set(0.5);
    //     Spectrum.metalsprite.scale.set(2);
    //     app.stage.addChild(Spectrum.metalsprite);
    // }
    
    createColorPickDropdown(){
        let optionContainer = new PIXI.Container();
        let dropdownContainer = new PIXI.Container();
        let side = this.height * 0.1;
        let dropdownBtn = this.createButton(this.height * 0.1, this.height * 0.8, side, side,
            function(){
                optionContainer.visible = !optionContainer.visible;
        });
        dropdownBtn.buttonMode = true;
        dropdownContainer.addChild(dropdownBtn);

        let options = ["red", "green", "blue", "original"];
        for (let i = 0; i < 4; i++) {
            let optionBtn = Spectrum.createButton(this.height * 0.1 + (i + 1) * this.height * 0.12, this.height * 0.8, side, side,
                () => { this.onClickColorOptions(options[i]) }, null, options[i]);
            optionBtn.buttonMode = true;
            optionContainer.addChild(optionBtn);
        }
        optionContainer.visible = false;
        dropdownContainer.addChild(optionContainer);

        this.SPContainer.addChild(dropdownContainer);
    }

    UIBool(bool)
    {
        this.SPContainer.visible = bool;
    }

    // static startSpectrum() {
    //     Spectrum.pixiSetup();
    //     Spectrum.createColorPickDropdown();
    // }

}
