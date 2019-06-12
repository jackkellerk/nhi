/*
todo:
 */

// let colors = ['white', 'black', 'yellow', 'red', 'green', 'orange', 'blue', 'grey', 'purple'];
class Spectrum{
    
    //helper function
    static getHexColor(colorStr) {
        let a = document.createElement('div');
        a.style.color = colorStr;
        let colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
        document.body.removeChild(a);
        return (colors.length >= 3) ? '0x' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
    }
    
// actions: [pointerdown, pointerup, mouseover, mouseout]
    static createButton(x, y, height, width, clickAction)
    {
        let container = new PIXI.Container();
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.lineStyle(2, 0x414141, 1);
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();
        graphics.interactive = true;
        graphics.on('mouseover', function(){ this.alpha = 1; })
                .on('mouseout', function(){ this.alpha = 0.5; });
        if(clickAction){
            graphics.on('pointerdown', clickAction)
        }
        graphics.alpha = 0.5;
        container.addChild(graphics);
        container.x = x;
        container.y = y;
        return container;
    }

    static onClickColorOptions(color, metalsprite){
        switch(color) {
            case "red":
                metalsprite.tint = Spectrum.getHexColor("red");
                break;
            case "green":
                metalsprite.tint = Spectrum.getHexColor("green");
                break;
            case "blue":
                metalsprite.tint = Spectrum.getHexColor("blue");
                break;
            case "original":
                metalsprite.tint = 0xFFFFFF;
                break;
            default: void(0);
        }
    }
    
    static pixiSetup() {
        let metalsprite = new PIXI.Sprite.from('Images/sinteredMetal.png');
        metalsprite.anchor.set(0.5);
        metalsprite.scale.set(2);
        app.stage.addChild(metalsprite);
        return metalsprite;
    }
    
    static createColorPickDropdown(metalsprite){
        let optionContainer = new PIXI.Container();
        let dropdownContainer = new PIXI.Container();
        let dropdownBtn = Spectrum.createButton(20,app.screen.height-80, 60, 60,
            function(){
                optionContainer.visible = !optionContainer.visible;
        });
        dropdownBtn.buttonMode = true;
        dropdownContainer.addChild(dropdownBtn);

        let options = ["red", "green", "blue", "original"];
        for (let i = 0; i < 4; i++) {
            let optionBtn = Spectrum.createButton(85 + i*65, app.screen.height-80, 60, 60,
                function(){Spectrum.onClickColorOptions(options[i], metalsprite)});
            optionBtn.buttonMode = true;
            let text = new PIXI.Text(options[i]);
            text.style = {align: "center"};
            optionBtn.addChild(text);
            optionContainer.addChild(optionBtn);
        }
        optionContainer.visible = false;
        dropdownContainer.addChild(optionContainer);

        app.stage.addChild(dropdownContainer);
    }

    static startSpectrum() {
        let metalsprite = Spectrum.pixiSetup();
        Spectrum.createColorPickDropdown(metalsprite);
    }

}
