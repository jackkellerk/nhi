// containers to hold image and information about microscopes in source page
var source_infoContainer = new PIXI.Container();

// graphics for line and hexagon
var line = new PIXI.Graphics();
var hex = new PIXI.Graphics();
var ps_title;

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
var x_limit;
var y_limit;
var x_infostarts;
var x_infoends;
var y_infostarts;
// var y_infoends;

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

// number lines to display
var numLines = 6;

/**
 * drawSourceInfo() draws two polygon; one hexagon for the image of the electron microscope, one octagon with least 2 lines of explanation of microscope
 */
function drawSourceInfo(numSource) {
    
    // set number of sources if numSource is null
    if (numSource == null) {
        numSource = numLines;
    }

    // set color as white (0xffffff), line thickness as 3
    hex.lineStyle(2, 0xffffff, 3);

    // calculate the screen_limit
    var x = app.screen.width / 8;
    while (x < x_limit) {
        screen_limit = x;
        x += 71.6 * 2;
    }

    // reset x, y which shows (x,y) coordinates for hexagon containers in source page
    x = app.screen.width / 8;
    var y = app.screen.height / 8;
    
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
        // if lowest point of the new row is over y_limit, break;
        if (y + 80 * 2 > y_limit) {
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
    source_infoContainer.addChild(line);
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
    ps_title = new PIXI.Text('Sources: Lehigh', ps_title_style);
    ps_title.x = 10;
    ps_title.y = 10;
    app.stage.addChild(ps_title);
    
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