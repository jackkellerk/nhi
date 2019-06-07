/*
todo:
    modularize code
    draw box and tint only inside the box
 */

//globals
// let colors = ['white', 'black', 'yellow', 'red', 'green', 'orange', 'blue', 'grey', 'purple'];
let dropdownContainer = new PIXI.Container();
let optionContainer = new PIXI.Container();
let metalsprite, dropdownBtn, optionBtns;

function pixiSetup() {
//     let type = "WebGL";
//     if (!PIXI.utils.isWebGLSupported()) {
//         type = "canvas";
//     }
//     PIXI.utils.sayHello(type);
//
// //Create a PixiJS Application
//     app = new PIXI.Application();
//     app = new PIXI.Application({
//             width: 800,         // default: 800
//             height: window.innerHeight,        // default: 600
//             antialias: true,    // default: false
//             transparent: false, // default: false
//             resolution: 1,       // default: 1
//         }
//     );

// Set canvas to fill the entire window. Use with "<style>* {padding: 0; margin: 0}</style>" in html
//     app.renderer.view.style.position = "absolute";
//     app.renderer.view.style.display = "block";
//     app.renderer.autoDensity = true;
// app.renderer.resize(container.innerWidth, container.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
//     document.body.appendChild(app.view);
    metalsprite = new PIXI.Sprite.from('Images/sinteredMetal.png');
    metalsprite.anchor.set(0.5);
    metalsprite.scale.set(2);
    app.stage.addChild(metalsprite);
}


function getHexColor(colorStr) {
    var a = document.createElement('div');
    a.style.color = colorStr;
    var colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
    document.body.removeChild(a);
    return (colors.length >= 3) ? '0x' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
}

function onClickDropdownBtn(){
    optionContainer.visible = !optionContainer.visible;
}



function onClickColorOptions(color){
    switch(color) {
        case "red":
            metalsprite.tint = getHexColor("red");
            break;
        case "green":
            metalsprite.tint = getHexColor("green");
            break;
        case "blue":
            metalsprite.tint = getHexColor("blue");
            break;
        case "original":
            metalsprite.tint = 0xFFFFFF;
            break;
        default: void(0);
    }
}

function createColorPickDropdown(){
    dropdownBtn = createButton(20,app.screen.height-80, 60, 60,
            onClickDropdownBtn);
    dropdownBtn.buttonMode = true;
    dropdownContainer.addChild(dropdownBtn);
    
    optionBtns = [];
    let options = ["red", "green", "blue", "original"];
    let texts = [];
    for (let i = 0; i < 4; i++) {
        optionBtns.push(createButton(85 + i*65, app.screen.height-80, 60, 60,
                function(){onClickColorOptions(options[i])}));
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
function createButton(x_position, y_position, height, width, clickAction)
{
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF, 1);
    graphics.lineStyle(2, 0x414141, 1);
    graphics.drawRect(x_position, y_position, width, height);
    graphics.endFill();
    graphics.interactive = true;
    graphics.on('mouseover', onHoverOver)
            .on('mouseout', onHoverOff);
    if(clickAction){
        graphics.on('pointerdown', clickAction)
    }
    graphics.alpha = 0.5;
    return graphics;
}

function onHoverOver()
{
    this.alpha = 1;
}

function onHoverOff()
{
    this.alpha = 0.5;
}


function startSpectrum() {
    pixiSetup();
    createColorPickDropdown();
}

