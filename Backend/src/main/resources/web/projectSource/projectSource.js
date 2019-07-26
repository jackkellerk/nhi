class Institution{
    constructor(institution, index, container){
        this.institution = institution;
        this.index = index;
        this.container = container;
    }

    getIns(){
        return this.institution;
    }
}

// containers to hold image and information about microscopes in source page
var ins_infoContainer = new PIXI.Container();

// graphics for line and hexagon
var line = new PIXI.Graphics();
var ins_mask = new PIXI.Graphics();
var ps_title;

// booleans for institution page
var totalIns = 0;
var defaultIns = 3;

// booleans for sources page to determine whether next page is required
var nextpage = false;
var numPage = 0;
var totalSource = 0;
var reaminingSource = 0;
var defaultLines = 6; // default number of lines to display

// names and images for institution & sources
var insArr = new Array (10);
var insHexArr = new Array (10);

//console.log("Length: " + defaultSources.length);
//Creates style used by text. It is currently unnecessary but more of an example
const ps_title_style = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 30,
    fontWeight: 'bold',
    fill: '#FFFFFF', // gradient
    align: 'center',
    strokeThickness: 4,
    wordWrap: true,
    wordWrapWidth: 800,
});

const ps_caption_style = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 20,
    fill: '#FFFFFF', // gradient
    align: 'center',
    strokeThickness: 1,
    wordWrap: true,
    wordWrapWidth: 800,
});

// set background image
var source_bg = new PIXI.Sprite.from('Images/projectSource_test.jpg');
var selected_Icon = new PIXI.Sprite.from('Images/selected_icon.jpg')

// variables to set border for hexagons
// x_limit: x coordinates of the screen, set in startSourcePage()
// x_infostarts/ends: start and end x coordinates of infobox
var x, y;
var x_limit;
var y_limit;
var x_infostarts;
var x_infoends;
var y_infostarts;
// var y_infoends;

var ps_sampleText;
var ps_sampleImage;

// array for commands
//var ps_buttonCommands = [];

var sourcesArray = [];
var institutionArray = [];
var sourceDescriptionBoxes = [];
/**
 * 
 * @param numSource 
 */
function drawInsInfo (numIns) {
    // set number of sources if numSource is null
    if (numIns == null) {
        numIns = defaultIns;
        totalIns = defaultIns;
    }
    else {
        totalIns = numSource;
    }
    // Hexagon Info: (all numbers already scaled)
    x = app.screen.width/6;
    y = app.screen.height/5;
    var scale = 2.2
    xChange = 100 * ((scale -2.3) + 1.0);
    showInstitutions(x,y, 2.2);
    showInstitutions(x + (xChange*4), y, 2.2)
    showInstitutions(x + (xChange*8), y, 2.2)
    var count = 0;
    institutionArray.forEach( function(element) {
        console.log(count);
        app.stage.addChild(element.container);
        var text = element.institution
        var res = text.replace("Images/institution/", "");
        res = res.replace(".png", "")
        res = res.replace(".jpg", "")
        console.log(res)
        element.container.interactive = true;
        element.container.on('pointerdown', drawSourceInfo);
        element.container.on('mouseout', ins_HoverOff);
        element.container.on('mouseover', ins_HoverOver1);
        element.container.on('mouseover', function(){
            ins_HoverOver(res);
        });
        count++;
    });
}


//lehigh, oakridge, john hopkins, ohio state
function drawSourceInfo() {
    var count = 1;
    var change = true;
    for( var i = 0; i < institutionArray.length; i++ ){
        count++
        if (count == 3){
            count = 0
            change ^= true;
        }if ( change == true){
            positionTransform(institutionArray[i].container.x -1000, institutionArray[i].container.y -1000, institutionArray[i].container, 30);
            alphaTransform(institutionArray[i].container, 0.0, (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 4) + 1))
        }else{
            alphaTransform(institutionArray[i].container, 0.0, (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 4) + 1))
            positionTransform(institutionArray[i].container.x +1000, institutionArray[i].container.y + 1000, institutionArray[i].container, 30);
        }
    }
    ps_title.text = "Sources";
    ps_title.interactive = true;
    ps_title.buttonMode = true;
    
    // stage the infroConatiner
    sourcesArray.forEach(element => {
        console.log("ellloooo")
        positionTransform(0, 0, element, 30)
    });
}

/**
 * startSorucePage sets the background and stage containers required
 */
function startSourcePage() {
    x = app.screen.width / 8;
    y = app.screen.height / 8;
    // variables to set border for hexagons
    x_limit = app.screen.width * 7 / 8;
    y_limit = app.screen.height * 7 / 8;
    // set width and height of the backgrond sprite, stage it to the app
    source_bg.width = app.screen.width;
    source_bg.height = app.screen.height;
    app.stage.addChild(source_bg);
    drawInsInfo();

    // set title
    ps_title = new PIXI.Text('Institutions', ps_title_style);
    ps_title.on("pointerdown", moveSources);

    // ps_title = new PIXI.Text('Sources: Lehigh', ps_title_style);
    ps_title.x =  app.screen.width / 16;
    ps_title.y = app.screen.height / 25;
    app.stage.addChild(ps_title);

    // set example texts
    ps_sampleImage = new PIXI.Text(' ', ps_title_style);
    ps_sampleImage.x = app.screen.width * (6/8);
    ps_sampleImage.y = app.screen.height / 25;
    app.stage.addChild(ps_sampleImage);

    populateSourceArray();
}


function moveSources(){
    console.log("Array Length: " + institutionArray.length);
    var count = 1;
    var change = true;
    for( var i = 0; i < institutionArray.length; i++ ){
        count++
        if (count == 3){
            count = 0
            change ^= true;
        }if ( change == true){
            positionTransform(institutionArray[i].container.x +1000, institutionArray[i].container.y + 1000, institutionArray[i].container, 30);
            alphaTransform(institutionArray[i].container, 1.0, 10)
        }else{
            alphaTransform(institutionArray[i].container, 1.0, 10)
            positionTransform(institutionArray[i].container.x - 1000, institutionArray[i].container.y - 1000, institutionArray[i].container, 30);
        } 
    }
    ps_title.text = "Institutions";
    ps_title.interactive = false;
    ps_title.buttonMode = false;
    //ps_title.on("pointerdown", moveSources);
    sourcesArray.forEach(element => {
        positionTransform(app.screen.width + 200, element.y, element, 30);
    });
    //alphaTransform(source_infoContainer, 0, 30)

}


function clickSource(){
    console.log("hi") 
}


/**
 * ps_prevUp() shows previous source page.
 */
function ps_prevUp() {

}


/**
 * ps_nextUp() shows next source page.
 */
function ps_nextUp() {

}


/**
 * ps_pointerDown make pressed button visually more focused
 */
function ps_pointerDown() {
    this.alpha = 0.5;
}


/**
 * ps_pointerOut make button lighter when not pressed (outside)
 */
function ps_pointerOut() {
    this.alpha = 1;
}


function ins_HoverOver(input){
    ps_sampleImage.text = input;
}


function ins_HoverOver1(){
    scaleTransform(1.02, 1.02, this, 5)
}


function ins_HoverOff(){
    scaleTransform(1.0, 1.0, this, 5)
    ps_sampleImage.text = " ";
}

function populateSourceArray() {
    for (var i = 0; i < defaultSources.length; i++, y += 80 * 2 + 4 * 2) {
        var source_infoContainer = new PIXI.Container();
        var textContainer = new PIXI.Container();
        var hexContainer = new PIXI.Container();
        var hex = new PIXI.Graphics();
        hex.clear();
        // set color as white (0xffffff), line thickness as 3
        hex.lineStyle(6, 0xffffff, 9);
        // fill hexagon with grey (0x808080)
        hex.beginFill(0x808080);

        var sourceName;
        var imgPath;
        var info1;
        var info2;
        if(i < defaultSources.length){
            sourceName = defaultSources[i].name;
            imgPath = defaultSources[i].image;
            info1 = defaultSources[i].info1;
            info2 = defaultSources[i].info2;
        }
        else{
            sourceName = "Source " + (i + 1)
            imgPath = "Images/Sources/electron_microscope_001.jpg";
            info1 = "Nothing much to say here";
            info2 = "Nothing much to say here again";
        }
        // check if all sources are loaded
        // if lowest point of the new row is over y_limit, break;

        var pl_radius = 0;
        if(app.screen.width >= app.screen.height) {
            pl_radius = app.screen.height/2.5;
        }
        else { 
            pl_radius = app.screen.width/2.5; 
        }
        pl_radius = app.screen.width * (1/20);
        var mask_hex = new Hexagon({x: app.screen.width/8, y: 0 + app.screen.height * ((1 + i)/4)}, 0, pl_radius);
        mask_hex.graphics.lineStyle(1, 0xFFFFFF);
        mask_hex.draw(0xFFFFFF, 1);
        app.stage.removeChild(mask_hex.container);
        hexContainer.addChild(mask_hex.container);

        var border_hex = new Hexagon({x: app.screen.width/8, y: 0 + app.screen.height * ((1 + i)/4)}, 0, pl_radius);
        border_hex.graphics.lineStyle(6, 0xFFFFFF);
        border_hex.draw(0xFFFFFF, 0);
        app.stage.removeChild(border_hex.container);
        hexContainer.addChild(border_hex.container);

        const sourceImg = new PIXI.Sprite.from(imgPath);
        source_infoContainer.addChild(sourceImg);
        sourceImg.mask = mask_hex.graphics;
        sourceImg.width = mask_hex.width;
        sourceImg.height = mask_hex.height;
        sourceImg.x = app.screen.width/8 - sourceImg.width/2;
        sourceImg.y = 0 + app.screen.height * ((1 + i)/4) - sourceImg.height/2;

        // draw hexagon thumbnail
        hex.drawPolygon([mask_hex.x + pl_radius * 2 ,mask_hex.y - pl_radius, mask_hex.x + pl_radius * 2  + app.screen.width * (5/8),mask_hex.y - pl_radius, mask_hex.x + pl_radius * 2  + app.screen.width* (5/8),mask_hex.y + pl_radius,mask_hex.x + pl_radius * 2 ,mask_hex.y + pl_radius]);
       
        var sourceTitle = new PIXI.Text(sourceName, ps_title_style);
        sourceTitle.x = mask_hex.x + pl_radius * 2;
        sourceTitle.y = mask_hex.y - pl_radius;
        textContainer.addChild(sourceTitle);


        var indentSpace = mask_hex.x + pl_radius * 2 + hex.width/50;

        var infoCaption = new PIXI.Text(info1, ps_caption_style);
        infoCaption.x = indentSpace + hex.width/50;
        infoCaption.y = sourceTitle.y + sourceTitle.height;
        textContainer.addChild(infoCaption);

        pl_radius = 0;
        if (app.screen.width >= app.screen.height) { 
            pl_radius = app.screen.height * (1/200);
        } else { 
            pl_radius = app.screen.width * (1/200); 
        }
        var tiny_hex = new Hexagon({x: indentSpace, y: infoCaption.y + infoCaption.height/2}, 0, pl_radius);
        tiny_hex.graphics.lineStyle(9, 0xFFFFFF);

        //  mask_hex.graphics.on("pointerdown",moveLogin);
        tiny_hex.draw(0xFFFFFF, 0);
        tiny_hex.graphics.beginFill(0xDE3249);
        tiny_hex.graphics.endFill();
        app.stage.removeChild(tiny_hex.container);
        hexContainer.addChild(tiny_hex.container);

        var infoCaption2 = new PIXI.Text(info2, ps_caption_style);
        infoCaption2.x = indentSpace + hex.width/50;
        infoCaption2.y = infoCaption.y + infoCaption.height;
        textContainer.addChild(infoCaption2);

        pl_radius = 0;
        if (app.screen.width >= app.screen.height){ 
            pl_radius = app.screen.height * (1/200);
        }else{ 
            pl_radius = app.screen.width * (1/200); 
        }
        var tiny_hex2 = new Hexagon({x: indentSpace, y: infoCaption2.y + infoCaption2.height/2}, 0, pl_radius);
        tiny_hex2.graphics.lineStyle(9, 0xFFFFFF);

        //  mask_hex.graphics.on("pointerdown",moveLogin);
        tiny_hex2.draw(0xFFFFFF, 0);
        tiny_hex2.graphics.beginFill(0xDE3249);
        tiny_hex2.graphics.endFill();
        app.stage.removeChild(tiny_hex2.container);
        hexContainer.addChild(tiny_hex2.container);
        // end filling
        hex.endFill();

        hex.interactive = true;
        hex.buttonMode = true;
        hex.on('pointerdown', clickSource);

        // var selected_Icon = new PIXI.Sprite.from('Images/selected_icon2.png')
        // selected_Icon.width = 50;
        // selected_Icon.height = 50;
        // selected_Icon.x = hex.width-10
        // selected_Icon.y= hex.height - hex.height-10;
        // source_infoContainer.addChild(selected_Icon)
        // console.log(selected_Icon.x + "     " +selected_Icon.y);

        // add child to the container
        sourceDescriptionBoxes.push(hex);
        source_infoContainer.addChild(hex);
        source_infoContainer.addChild(textContainer);
        source_infoContainer.addChild(hexContainer);
        source_infoContainer.x = app.stage.width + 10;
        sourcesArray.push(source_infoContainer);
        app.stage.addChild(source_infoContainer);
    }
}


function showInstitutions(startX, startY, inScale){
    var x = startX
    var y = startY
    var scale = inScale;
    var temp = x;
    var incX = 100 * ((scale -2.3) + 1.0);
    var incY = 120 * ((scale -2.0) + 1.0);
    for (var i = 0; i < insImages.length; i++, x += incX *2 ) {
        var ins_infoContainer = new PIXI.Container();
        
        var newSprite = new PIXI.Sprite.from(insImages[i]);
        newSprite.width = 100 * (((scale-2.1) * 0.5) + 1.0);
        newSprite.height = 100 * (((scale-2.1) * 0.5) + 1.0);
        newSprite.x = x + 30 * ((scale-2.0) + 1.0);
        newSprite.y = y + 30 * ((scale-2.0) + 1.0);

        var hex = new PIXI.Graphics();
        // set color as white (0xffffff), line thickness as 3
        hex.lineStyle(2,0x808080, 3);
        // fill hexagon with grey (0x808080)
        hex.beginFill(0xffffff);
        // draw hexagon for institution
        hex.drawPolygon([x+(34.8 + 4)*scale, y, x+(34.8*2 + 4)*scale, y+20*scale, x+(34.8*2 + 4)*scale, y+60*scale, x+(34.8 + 4)*scale, y+80*scale, x+4*scale ,y+60*scale, x+4*scale, y+20*scale]);
        hex.endFill();
        //newSprite.mask = hex;

        //Outline Hexegon
        var hex1 = new PIXI.Graphics();
        hex1.lineStyle(2, 0x808080, 4);
        // draw hexagon for institution
        hex1.drawPolygon([x+(34.8 + 4)*scale, y, x+(34.8*2 + 4)*scale, y+20*scale, x+(34.8*2 + 4)*scale, y+60*scale, x+(34.8 + 4)*scale, y+80*scale, x+4*scale ,y+60*scale, x+4*scale, y+20*scale]);
       
        ins_infoContainer.addChild(hex);
        ins_infoContainer.addChild(hex1);
        ins_infoContainer.addChild(newSprite);
        ins_infoContainer.pivot.x = (ins_infoContainer.width/2)
        ins_infoContainer.pivot.y = (ins_infoContainer.height/2)

        var newInstitution = new Institution(insImages[i], i, ins_infoContainer);
        institutionArray.push(newInstitution);

        //make the align zigzag
        var compare = i % 4;
        if ( compare == 1 && i != 0 ){
            x -= incX*3
            y += incY;
        } else if ( compare == 3){
            x = temp - incX * 2;
            y += incY;
        } 
    } 
}
