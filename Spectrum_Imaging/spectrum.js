/*
todo:
 */

// let colors = ['white', 'black', 'yellow', 'red', 'green', 'orange', 'blue', 'grey', 'purple'];
class Spectrum{
    //globals
    static optionContainer = new PIXI.Container();
    static metalsprite;
    
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

    static onClickDropdownBtn(){
        Spectrum.optionContainer.visible = !Spectrum.optionContainer.visible;
    }

    static onClickColorOptions(color){
        switch(color) {
            case "red":
                Spectrum.metalsprite.tint = Spectrum.getHexColor("red");
                break;
            case "green":
                Spectrum.metalsprite.tint = Spectrum.getHexColor("green");
                break;
            case "blue":
                Spectrum.metalsprite.tint = Spectrum.getHexColor("blue");
                break;
            case "original":
                Spectrum.metalsprite.tint = 0xFFFFFF;
                break;
            default: void(0);
        }
    }
    
    static pixiSetup() {
        Spectrum.metalsprite = new PIXI.Sprite.from('Images/sinteredMetal.png');
        Spectrum.metalsprite.anchor.set(0.5);
        Spectrum.metalsprite.scale.set(2);
        app.stage.addChild(Spectrum.metalsprite);
    }
    
    static createColorPickDropdown(){
        let dropdownContainer = new PIXI.Container();
        let dropdownBtn = Spectrum.createButton(20,app.screen.height-80, 60, 60,
            Spectrum.onClickDropdownBtn);
        dropdownBtn.buttonMode = true;
        dropdownContainer.addChild(dropdownBtn);

        let optionBtns = [];
        let options = ["red", "green", "blue", "original"];
        let texts = [];
        for (let i = 0; i < 4; i++) {
            optionBtns.push(Spectrum.createButton(85 + i*65, app.screen.height-80, 60, 60,
                function(){Spectrum.onClickColorOptions(options[i])}));
            optionBtns[i].buttonMode = true;
            texts.push(new PIXI.Text(options[i]));
            texts[i].style = {align: "center"};
            optionBtns[i].addChild(texts[i]);
            Spectrum.optionContainer.addChild(optionBtns[i]);
        }
        Spectrum.optionContainer.visible = false;
        dropdownContainer.addChild(Spectrum.optionContainer);

        app.stage.addChild(dropdownContainer);
    }

    static startSpectrum() {
        Spectrum.pixiSetup();
        Spectrum.createColorPickDropdown();
    }

}
