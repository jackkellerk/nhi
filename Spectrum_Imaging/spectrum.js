/*
todo:
    modularize code
    draw box and tint only inside the box
 */

let dropdownContainer = new PIXI.Container();
let optionContainer = new PIXI.Container();
let metalsprite, dropdownBtn, optionBtns;

class Spectrum{
//globals
// let colors = ['white', 'black', 'yellow', 'red', 'green', 'orange', 'blue', 'grey', 'purple'];

    static pixiSetup() {
        metalsprite = new PIXI.Sprite.from('Images/sinteredMetal.png');
        metalsprite.anchor.set(0.5);
        metalsprite.scale.set(2);
        app.stage.addChild(metalsprite);
    }


    static getHexColor(colorStr) {
        let a = document.createElement('div');
        a.style.color = colorStr;
        let colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
        document.body.removeChild(a);
        return (colors.length >= 3) ? '0x' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
    }

    static onClickDropdownBtn(){
        optionContainer.visible = !optionContainer.visible;
    }

    static onClickColorOptions(color){
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

    static createColorPickDropdown(){
        dropdownBtn = Spectrum.createButton(20,app.screen.height-80, 60, 60,
            Spectrum.onClickDropdownBtn);
        dropdownBtn.buttonMode = true;
        dropdownContainer.addChild(dropdownBtn);

        optionBtns = [];
        let options = ["red", "green", "blue", "original"];
        let texts = [];
        for (let i = 0; i < 4; i++) {
            optionBtns.push(Spectrum.createButton(85 + i*65, app.screen.height-80, 60, 60,
                function(){Spectrum.onClickColorOptions(options[i])}));
            optionBtns[i].buttonMode = true;
            texts.push(new PIXI.Text(options[i]));
            texts[i].style = {align: "center"};
            optionBtns[i].addChild(texts[i]);
            optionContainer.addChild(optionBtns[i]);
        }
        optionContainer.visible = false;
        dropdownContainer.addChild(optionContainer);

        app.stage.addChild(dropdownContainer);
    }

// actions: [pointerdown, pointerup, mouseover, mouseout]
    static createButton(x, y, height, width, clickAction)
    {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.lineStyle(2, 0x414141, 1);
        graphics.drawRect(x, y, width, height);
        graphics.endFill();
        graphics.interactive = true;
        graphics.on('mouseover', function(){ this.alpha = 0.5; })
            .on('mouseout', function(){ this.alpha = 1; });
        if(clickAction){
            graphics.on('pointerdown', clickAction)
        }
        graphics.alpha = 0.5;
        return graphics;
    }

    static startSpectrum() {
        Spectrum.pixiSetup();
        Spectrum.createColorPickDropdown();
    }

}
