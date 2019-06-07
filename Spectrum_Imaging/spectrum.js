/*
todo:
    modularize code
    draw box and tint only inside the box
 */


class Spectrum{
//globals
    static dropdownContainer = new PIXI.Container();
    static optionContainer = new PIXI.Container();
    static metalsprite;
    static dropdownBtn;
    static optionBtns;
// let colors = ['white', 'black', 'yellow', 'red', 'green', 'orange', 'blue', 'grey', 'purple'];

    static pixiSetup() {
        Spectrum.metalsprite = new PIXI.Sprite.from('Images/sinteredMetal.png');
        Spectrum.metalsprite.anchor.set(0.5);
        Spectrum.metalsprite.scale.set(2);
        app.stage.addChild(Spectrum.metalsprite);
    }


    static getHexColor(colorStr) {
        let a = document.createElement('div');
        a.style.color = colorStr;
        let colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
        document.body.removeChild(a);
        return (colors.length >= 3) ? '0x' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
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

    static createColorPickDropdown(){
        Spectrum.dropdownBtn = Spectrum.createButton(20,app.screen.height-80, 60, 60,
            Spectrum.onClickDropdownBtn);
        Spectrum.dropdownBtn.buttonMode = true;
        Spectrum.dropdownContainer.addChild(Spectrum.dropdownBtn);

        Spectrum.optionBtns = [];
        let options = ["red", "green", "blue", "original"];
        let texts = [];
        for (let i = 0; i < 4; i++) {
            Spectrum.optionBtns.push(Spectrum.createButton(85 + i*65, app.screen.height-80, 60, 60,
                function(){Spectrum.onClickColorOptions(options[i])}));
            Spectrum.optionBtns[i].buttonMode = true;
            texts.push(new PIXI.Text(options[i]));
            texts[i].style = {align: "center"};
            Spectrum.optionBtns[i].addChild(texts[i]);
            Spectrum.optionContainer.addChild(Spectrum.optionBtns[i]);
        }
        Spectrum.optionContainer.visible = false;
        Spectrum.dropdownContainer.addChild(Spectrum.optionContainer);

        app.stage.addChild(Spectrum.dropdownContainer);
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
        graphics.on('mouseover', function(){ this.alpha = 1; })
            .on('mouseout', function(){ this.alpha = 0.5; });
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
