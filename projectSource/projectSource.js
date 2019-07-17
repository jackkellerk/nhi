
class Source {
    constructor(name, image, info1, info2) {
        this.name = name;
        this.image = image;
        this.info1 = info1;
        this.info2 = info2;
    }
}
// containers to hold image and information about microscopes in source page
var source_infoContainer = new PIXI.Container();
var ins_infoContainer = new PIXI.Container();

// graphics for line and hexagon
var line = new PIXI.Graphics();
var hex = new PIXI.Graphics();
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
var insTile = "Images/institution/cmu.png";
var insImages = ['Images/institution/cmu.png', 'Images/institution/drexel.png', 'Images/institution/lehigh.png', 'Images/institution/ohio.png', 'Images/institution/pennstate.png',];
var insNames = ['CMU', 'Drexel', 'Lehigh', 'Ohio', 'Penn State'];
var sourceImages = [];
var sourceTEMNames = ['JEOL JEM-1200EX', 'JEOL JEM-2000FX', 'JEOL JEM-2200FS', 'JEOL JEM-ARM200CF'];
var sourceSEMNames = ['Hitachi 4300 SE/N', 'ZEISS 1550', 'FEI SCIOS FIB', 'FEI XL30 ESEM', 'JEOL JSM-840', 'JEOL JXA-8900'];
var defaultSources = [];
var source1 = new Source("FEI Tecnai G2 Spirit BioTWIN","Images/Sources/yale_microscope.jpg","80 kV microscope, optimized for examining biological specimen",
"Equipped with a SIS Morada 11 megapixel CCD camera");
defaultSources.push(source1);

var source2 = new Source("FEI Tecnai G2 F20 XT (TF20 TOMO)","Images/Sources/yale_microscope_002.jpg","Contains a Schottky field emitter is designed to produce high resolution performance",
"Features a 4k x 4k FEI Eagle CCD and an AMT NanoSprint1200 CMOS camera");
defaultSources.push(source2);

var source3 = new Source("FEI Tecnai F20 Cryo EM ","Images/Sources/yale_microscope_003.jpg","Has a Schottky Field Emission source, operates at 200 kV and is equipped with a Gatan K2 Summit Direct Detector",
"Is dedicated for high-resolution single particle imaging and cryo electron tomography");
defaultSources.push(source3);
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

// screen_limit is the x coordinate of hexagon right before it go gover x_limit
var screen_limit;

// array for commands
var ps_buttonCommands = [];

// next & previous button for sources
const ps_nextPage = new PIXI.Sprite.from("Images/next_arrow.png");
ps_nextPage.width = 50;
ps_nextPage.height = 50;
ps_nextPage.x = 0;
ps_nextPage.y = 0;
ps_nextPage.interactive = true;
ps_nextPage.buttonMode = true;
ps_nextPage.on("pointerdown", ps_pointerDown);
ps_nextPage.on("pointerup", ps_pointerOut);
ps_nextPage.on("pointerupoutside", ps_pointerOut);
ps_buttonCommands.push(ps_nextPage);

const ps_prevPage = new PIXI.Sprite.from("Images/prev_arrow.png");
ps_prevPage.width = 50;
ps_prevPage.height = 50;
ps_prevPage.x = 0;
ps_prevPage.y = 0;
ps_prevPage.interactive = true;
ps_prevPage.buttonMode = true;
ps_prevPage.on("pointerdown", ps_pointerDown);
ps_prevPage.on("pointerup", ps_pointerOut);
ps_prevPage.on("pointerupoutside", ps_pointerOut);
ps_buttonCommands.push(ps_prevPage);


var institutionArray = new Array();
/**
 * 
 * @param numSource 
 */
function drawInsInfo (numIns) {
    var ins_infoContainer = new PIXI.Container();
    // set number of sources if numSource is null
    if (numIns == null) {
        numIns = defaultIns;
        totalIns = defaultIns;
    }
    else {
        totalIns = numSource;
    }
    // Hexagon Info: (all numbers already scaled)
    x = 50
    y = 100
    var temp = x;
    for (var i = 0; i < numIns; i++, y += 80 * 1.8) {
        var ins_infoContainer = new PIXI.Container();

        //make the align zigzag
        if (i%2 != 0) {
            x += 80;
        } else {
            x = temp;
        }
        
        var newSprite = new PIXI.Sprite.from(insImages[i]);
        newSprite.width = 100;
        newSprite.height = 100;
        newSprite.x = x + 30;
        newSprite.y = y+ 30;

        var hex = new PIXI.Graphics();
        // set color as white (0xffffff), line thickness as 3
        hex.lineStyle(2,0x808080, 3);
        // fill hexagon with grey (0x808080)
        hex.beginFill(0xffffff);
        // draw hexagon for institution
        hex.drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]);
        hex.endFill();
        //newSprite.mask = hex;

        //Outline Hexegon
        var hex1 = new PIXI.Graphics();
        hex1.lineStyle(2, 0x808080, 4);
        // draw hexagon for institution
        hex1.drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]);
       
        ins_infoContainer.addChild(hex);
        ins_infoContainer.addChild(hex1);
        ins_infoContainer.addChild(newSprite);

        institutionArray.push(ins_infoContainer);
    }

    for( var i = 0; i < institutionArray.length; i++ ){
        app.stage.addChild(institutionArray[i]);
        institutionArray[i].interactive = true;
        institutionArray[i].on('pointerdown', drawSourceInfo);
    }
}


//lehigh, oakridge, john hopkins, ohio state
function drawSourceInfo() {
    for( var i = 0; i < institutionArray.length; i++ ){
        positionTransform(institutionArray[i].x -300, institutionArray[i].y, institutionArray[i], 15);
    }
    ps_title.text = "Sources";
    ps_title.interactive = true;
    ps_title.buttonMode = true;
    positionTransform(0.0, source_infoContainer.y, source_infoContainer, 10);
    //alphaTransform(source_infoContainer, 1, 10)
    hex.clear();

    // set number of sources if numSource is null
    //if (numSource == null) {
      //  numSource = defaultLines;
    //    totalSource = defaultLines;
   // }
   // else {
    //    totalSource = numSource;
  //  }

    // set color as white (0xffffff), line thickness as 3
    hex.lineStyle(9, 0xffffff, 9);

    // calculate the screen_limit
    x = app.screen.width / 8;
    while (x < x_limit) {
        screen_limit = x;
        x += 71.6 * 2;
    }

    // reset x, y which shows (x,y) coordinates for hexagon containers in source page
    x = app.screen.width / 8;
    y = app.screen.height / 8;
    
    // fill hexagon with grey (0x808080)
    hex.beginFill(0x808080);

    var textContainer = new PIXI.Container();
    var hexContainer = new PIXI.Container();

    // Hexagon Info: (all numbers already scaled)
    // a (side of hexagon) : sqrt((34.8 * 2)^2 + (20 * 2)^2) = 80.28
    // 2R (circumcircle of hexagon) : 80 * 2 = 160
    // gap bewteen hexagon: 4 * 2 = 8
    // x difference: 34.6
    // y difference: 20
    // scale: *2
    
    // make rows of hexagon, which depends on the number of sources and y_limit
    for (var i = 0; i < 3; i++, y += 80 * 2 + 4 * 2) {
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
        //console.log("y: " + y + "y_limit: " + y_limit);
        // check if all sources are loaded
        // if lowest point of the new row is over y_limit, break;
        if (y + 80 * 2 > y_limit) {
            nextpage = true;
            reaminingSource = totalSource - i;
            break;
        }
        var pl_radius = 0;
        if (app.screen.width >= app.screen.height) { pl_radius = app.screen.height/2.5;
        } else { pl_radius = app.screen.width/2.5; }
        pl_radius = app.screen.width * (1/20);
        var mask_hex = new Hexagon({x: app.screen.width/8, y: 0 + app.screen.height * ((1 + i)/4)}, 0, pl_radius);
        mask_hex.graphics.lineStyle(1, 0xFFFFFF);
        mask_hex.draw(0xFFFFFF, 1);
        app.stage.removeChild(mask_hex.container);
        hexContainer.addChild(mask_hex.container);

        var border_hex = new Hexagon({x: app.screen.width/8, y: 0 + app.screen.height * ((1 + i)/4)}, 0, pl_radius);
        border_hex.graphics.lineStyle(9, 0xFFFFFF);
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
        if (app.screen.width >= app.screen.height) { pl_radius = app.screen.height * (1/200);
        } else { pl_radius = app.screen.width * (1/200); }
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
        if (app.screen.width >= app.screen.height) { pl_radius = app.screen.height * (1/200);
        } else { pl_radius = app.screen.width * (1/200); }
        var tiny_hex2 = new Hexagon({x: indentSpace, y: infoCaption2.y + infoCaption2.height/2}, 0, pl_radius);
        tiny_hex2.graphics.lineStyle(9, 0xFFFFFF);

      //  mask_hex.graphics.on("pointerdown",moveLogin);
        tiny_hex2.draw(0xFFFFFF, 0);
        tiny_hex2.graphics.beginFill(0xDE3249);
        tiny_hex2.graphics.endFill();
        app.stage.removeChild(tiny_hex2.container);
        hexContainer.addChild(tiny_hex2.container);



        //        hex.drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]);

        // draw octagon infobox
        //x_infoends = x;
        //x += (34.8 + 34.8 + 4) * 2;
        // hex.drawPolygon([x+(34.8 + 4)*2,y,  screen_limit+(34.8 + 4)*2,y,  screen_limit+(34.8*2 + 4)*2,y+20*2,  screen_limit+(34.8*2 + 4)*2,y+(20*3)*2, screen_limit+(34.8 + 4)*2,y+(20*4)*2,  x+(34.8 + 4)*2,y+(20*4)*2,  x+4*2,y+(20*3)*2,  x+4*2,y+20*2]);

//        x = app.screen.width / 8;
    }

    // end filling
    hex.endFill();

    // stage the line 
    // app.stage.addChild(line);

    // add child to the container
    source_infoContainer.addChild(hex);
    source_infoContainer.addChild(textContainer);
    source_infoContainer.addChild(hexContainer);

    // source_infoContainer.addChild(line);
    // source_infoContainer.addChild(ps_title);
    source_infoContainer.addChild(ps_prevPage);
    source_infoContainer.addChild(ps_nextPage);

    // stage the infroConatiner
    app.stage.addChild(source_infoContainer);

}

/**
 * startSorucePage sets the background and stage containers required
 */
function startSourcePage() {
    

    insTile = PIXI.Sprite.from(insImages[0]);

    //
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

    // set location of the next & prev buttons
    ps_prevPage.x = x_limit;
    ps_prevPage.y = y_limit;
    ps_nextPage.x = x_limit + 50 + 10;
    ps_nextPage.y = y_limit;

    // set title
    ps_title = new PIXI.Text('Institutions', ps_title_style);
    ps_title.on("pointerdown", moveSources);

    // ps_title = new PIXI.Text('Sources: Lehigh', ps_title_style);
    ps_title.x =  app.screen.width / 16;
    ps_title.y = app.screen.height / 16;
    app.stage.addChild(ps_title);

    // set example texts
    ps_sampleImage = new PIXI.Text('1', ps_title_style);
    ps_sampleImage.x = app.screen.width / 8 + 38.8;
    ps_sampleImage.y = 117 + 40;
    app.stage.addChild(ps_sampleImage);
    
}

function moveSources(){
    console.log("Array Length: " + institutionArray.length);
    for( var i = 0; i < institutionArray.length; i++ ){
        console.log(i)
        positionTransform(institutionArray[i].x + 300, institutionArray[i].y, institutionArray[i], 15);
    }

    ps_title.text = "Institutions";
    ps_title.interactive = false;
    ps_title.buttonMode = false;
    //ps_title.on("pointerdown", moveSources);
    positionTransform(app.screen.width + 200, source_infoContainer.y, source_infoContainer, 30);
    //alphaTransform(source_infoContainer, 0, 30)

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

function ins_HoverOver(){
    scaleTransform(1.05, 1.05, this, 5)
}

function ins_HoverOff(){
    scaleTransform(1.0, 1.0, this, 5)
}
