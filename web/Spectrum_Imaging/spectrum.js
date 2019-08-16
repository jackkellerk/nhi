/*
 */

class Spectrum{
    
    /*
    container: contains the whole activity.
    height: height of container. will be used to locate the buttons.
    width: currently not used.
     */
    constructor(container, width, height){
        this.container = container;
        this.width = width;
        this.height = height;
        this.metalsprite = new PIXI.Sprite.from('Images/sinteredMetal.png');
        this.container.addChild(this.metalsprite);
        // this.metalsprite.anchor.set(0.5);
        // this.metalsprite.scale.set(2);
        this.createColorPickDropdown();
        
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
        let container = new PIXI.Container();
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
        container.addChild(graphics);
        if(icon){
            container.addChild(icon);
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
            container.addChild(textSprite);
        }
        container.x = x;
        container.y = y;
        return container;
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
        let dropdownBtn = Spectrum.createButton(this.height * 0.1, this.height * 0.8, side, side,
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

        this.container.addChild(dropdownContainer);
    }

    // static startSpectrum() {
    //     Spectrum.pixiSetup();
    //     Spectrum.createColorPickDropdown();
    // }

}
