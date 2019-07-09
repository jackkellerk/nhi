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
    
    // set color as white (0xffffff), line thickness as 3
    hex.lineStyle(2, 0xffffff, 3);

    // fill hexagon with grey (0x808080)
    hex.beginFill(0x808080);
    
    // Hexagon Info: (all numbers already scaled)
    // a (side of hexagon) : sqrt((34.8 * 2)^2 + (20 * 2)^2) = 80.28
    // 2R (circumcircle of hexagon) : 80 * 2 = 160
    // gap bewteen hexagon: 4 * 2 = 8
    // x difference: 34.6
    // y difference: 20
    // scale: *2
    for (var i = 0; i < numIns; i++, y += 80 * 2 + 4 * 2) {
        

        console.log("numSource: " + numIns + "\nx: " + x + "\ny: " + y);
        console.log("i:" + i + "\ninsImage:" + " " + insImages[i]);

        // 1st try
        insArr[i] = new PIXI.Graphics();
        insArr[i].lineStyle(2, 0xffffff, 3);
        // insArr[i].beginFill(0x808080);
		insArr[i].drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]);

        app.stage.addChild(insArr[i]);

        insHexArr[i] = PIXI.Sprite.from(insImages[i]);

        // app.stage.addChild(insHexArr[i]);

        //mask 1st thumbnail image
        insHexArr[i].mask = insArr[i];

        // end fill
        // insArr[i].endFill();
            
        // ins_infoContainer.addChild(insHexArr[i]);


        // 2nd try
        
        // draw hexagon for institution
        // ins_mask.drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]);

        // set image
        // console.log("i:" + i + "\ninsImage:" + " " + insImages[i]);
        // const insTile = PIXI.BaseTexture.from(insImages[i]);
        // const insImage = new PIXI.Texture(insTile, hex.drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]));
        // insTile = PIXI.Sprite.from(insImages[i]);
        // app.stage.addChild(insTile);
        // app.stage.addChild(hex);

        //mask 1st thumbnail image
        // insTile.mask = ins_mask;

        x += (80 * 2 + 4 * 2) * 2;

        // draw hexagon for institution
        hex.drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]);
        
        // mask 2nd thumbnail
        // const insTile = PIXI.Sprite.from(insImages[i]);
        // app.stage.addChild(insTile);
        // app.stage.addChild(hex);

        //mask image
        // insTile.mask = ins_mask;
        
        x += (80 * 2 + 4 * 2) * 2;

        // draw hexagon for institution
        hex.drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]);

        x -= (80 * 2 + 4 * 2) * 3;

        // make the align zigzag
        if (i%2 != 0) {
            x -= (80 * 2 + 4 * 2) * 2;
        }

    }

    // end filling  
    hex.endFill();

    // add child to the container
    ins_infoContainer.addChild(hex);

    // stage the infroConatiner
    app.stage.addChild(ins_infoContainer);

}

/**
 * drawSourceInfo() draws two polygon; one hexagon for the image of the electron microscope, one octagon with least 2 lines of explanation of microscope
 */
function drawSourceInfo(numSource) {
    
    hex.clear();

    // set number of sources if numSource is null
    if (numSource == null) {
        numSource = defaultLines;
        totalSource = defaultLines;
    }
    else {
        totalSource = numSource;
    }

    // set color as white (0xffffff), line thickness as 3
    hex.lineStyle(2, 0xffffff, 3);

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

    // Hexagon Info: (all numbers already scaled)
    // a (side of hexagon) : sqrt((34.8 * 2)^2 + (20 * 2)^2) = 80.28
    // 2R (circumcircle of hexagon) : 80 * 2 = 160
    // gap bewteen hexagon: 4 * 2 = 8
    // x difference: 34.6
    // y difference: 20
    // scale: *2
    
    // make rows of hexagon, which depends on the number of sources and y_limit
    for (var i = 0; i < numSource; i++, y += 80 * 2 + 4 * 2) {

        console.log("y: " + y + "y_limit: " + y_limit);
        // check if all sources are loaded
        // if lowest point of the new row is over y_limit, break;
        if (y + 80 * 2 > y_limit) {
            nextpage = true;
            reaminingSource = totalSource - i;
            break;
        }

        // draw hexagon thumbnail
        hex.drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]);

        // draw octagon infobox
        x_infoends = x;
        x += (34.8 + 34.8 + 4) * 2;
        hex.drawPolygon([x+(34.8 + 4)*2,y,  screen_limit+(34.8 + 4)*2,y,  screen_limit+(34.8*2 + 4)*2,y+20*2,  screen_limit+(34.8*2 + 4)*2,y+(20*3)*2, screen_limit+(34.8 + 4)*2,y+(20*4)*2,  x+(34.8 + 4)*2,y+(20*4)*2,  x+4*2,y+(20*3)*2,  x+4*2,y+20*2]);

        x = app.screen.width / 8;
    }

    // end filling
    hex.endFill();

    // stage the line 
    // app.stage.addChild(line);

    // add child to the container
    source_infoContainer.addChild(hex);
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
    ps_sampleImage = new PIXI.Text('1', ps_title_style);
    ps_sampleImage.x = app.screen.width / 8 + 38.8;
    ps_sampleImage.y = 117 + 40;
    app.stage.addChild(ps_sampleImage);
    
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