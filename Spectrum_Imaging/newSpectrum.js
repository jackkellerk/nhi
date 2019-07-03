var MSContainer = new PIXI.Container(); // Spectrum Imaging container
var metalsprite = new PIXI.Sprite();

/*
todo:
 */

// let colors = ['white', 'black', 'yellow', 'red', 'green', 'orange', 'blue', 'grey', 'purple'];

//helper function
function ms_getHexColor(colorStr) {
    let a = document.createElement('div');
    a.style.color = colorStr;
    let colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
    document.body.removeChild(a);
    return (colors.length >= 3) ? '0x' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
}
    
// actions: [pointerdown, pointerup, mouseover, mouseout]
//icon: Sprite

function ms_createButton(x, y, height, width, clickAction, icon=null, text=null)
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

function ms_onClickColorOptions(color){
    switch(color) {
        case "red":
            metalsprite.tint = ms_getHexColor("red");
            break;
        case "green":
            metalsprite.tint = ms_getHexColor("green");
            break;
        case "blue":
            metalsprite.tint = ms_getHexColor("blue");
            break;
        case "original":
            metalsprite.tint = 0xFFFFFF;
            break;
        default: void(0);
    }
}

function pixiSetup() {
    metalsprite = new PIXI.Sprite.from('Images/sinteredMetal.png');
    metalsprite.anchor.set(0.5);
    metalsprite.scale.set(2);
    MSContainer.addChild(metalsprite);
}
    
function createColorPickDropdown(){
    let optionContainer = new PIXI.Container();
    let dropdownContainer = new PIXI.Container();
    let side = 60;
    let dropdownBtn = ms_createButton(20,app.screen.height-80, side, side,
        function(){
            optionContainer.visible = !optionContainer.visible;
    });
    dropdownBtn.buttonMode = true;
    dropdownContainer.addChild(dropdownBtn);

    let options = ["red", "green", "blue", "original"];
    for (let i = 0; i < 4; i++) {
        let optionBtn = ms_createButton(85 + i*65, app.screen.height-80, side, side,
            function(){ ms_onClickColorOptions(options[i])}, null, options[i]);
        optionBtn.buttonMode = true;
        optionContainer.addChild(optionBtn);
    }
    optionContainer.visible = false;
    dropdownContainer.addChild(optionContainer);

    MSContainer.addChild(dropdownContainer);
}

function startSpectrum() {
    pixiSetup();
    createColorPickDropdown();
}
