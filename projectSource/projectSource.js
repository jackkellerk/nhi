// containers to hold image and information about microscopes in source page
var source_infoContainer = new PIXI.Container();

// graphics for line and hexagon
var line = new PIXI.Graphics();
//var hex = new PIXI.Graphics();
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

//Creates style used by text. It is currently unnecessary but more of an example
const ps_title_style = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 30,
    fontWeight: 'bold',
    fill: '#FFFFFF', // gradient
    align: 'center',
    strokeThickness: 4,
    wordWrap: true,
    wordWrapWidth: 500,
});

// set background image
//var source_bg = new PIXI.Sprite.from('Images/projectSource_test.jpg');

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
        console.log("numSource: " + numIns + "\nx: " + x + "\ny: " + y);
        console.log("i:" + i + "\ninsImage:" + " " + insImages[i]);

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
        console.log(i)
        app.stage.addChild(institutionArray[i]);
        institutionArray[i].interactive = true;
        institutionArray[i].on('pointerdown', drawSourceInfo);
    }
}

function drawSourceInfo() {
    for( var i = 0; i < institutionArray.length; i++ ){
        console.log(i)
        positionTransform(-280, institutionArray[i].y, institutionArray[i], 30);
        alphaTransform(institutionArray[i], 0.0, 30)
        positionTransform(-200,ps_title.y, ps_title, 30)
    }

}



/**
 * startSorucePage sets the background and stage containers required
 */
function startSourcePage() {
    const gradTexture = createGradTexture();
    const sprite = new PIXI.Sprite(gradTexture);
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;
    app.stage.addChild(sprite);

    insTile = PIXI.Sprite.from(insImages[0]);
    drawInsInfo();
    
    //
    x = app.screen.width / 8;
    y = app.screen.height / 8;

    // variables to set border for hexagons
    x_limit = app.screen.width * 7 / 8;
    y_limit = app.screen.height * 7 / 8;

    // set width and height of the backgrond sprite, stage it to the app
    //source_bg.width = app.screen.width;
    //source_bg.height = app.screen.height;
    //app.stage.addChild(source_bg);

    // set location of the next & prev buttons
    ps_prevPage.x = x_limit;
    ps_prevPage.y = y_limit;
    ps_nextPage.x = x_limit + 50 + 10;
    ps_nextPage.y = y_limit;

    // set title
    ps_title = new PIXI.Text('Institutions', ps_title_style);
    // ps_title = new PIXI.Text('Sources: Lehigh', ps_title_style);
    ps_title.x =  app.screen.width / 16;
    ps_title.y = app.screen.height / 16;
    app.stage.addChild(ps_title);

    // set example texts
    // ps_sampleImage = new PIXI.Text('1', ps_title_style);
    // ps_sampleImage.x = app.screen.width / 8 + 38.8;
    // ps_sampleImage.y = 117 + 40;
    // app.stage.addChild(ps_sampleImage);
    
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
