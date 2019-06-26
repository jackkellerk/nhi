// containers to hold image and information about microscopes in source page
var source_infoContainer = new PIXI.Container();

// graphics for line and hexagon
var line = new PIXI.Graphics();
var hex = new PIXI.Graphics();

// set background image
var source_bg = new PIXI.Sprite.from('Images/projectSource_test.jpg');

// variables to set border for hexagons
// x_limit: x coordinates of the screen
// x_infostarts/ends: start and end x coordinates of infobox
var x_limit;
var y_limit;
var x_infostarts;
var x_infoends;
var y_infostarts;
// var y_infoends;
var screen_limit;

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
    while (x < x_limit * 7) {
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
    
    // make rows of hexagon, which depends on the number of sources
    for (var i = 0; i < numSource; i++, y += 80 * 2 + 4 * 2) {

        // draw hexagon thumbnail
        hex.drawPolygon([x+(34.8 + 4)*2,y, x+(34.8*2 + 4)*2,y+20*2, x+(34.8*2 + 4)*2,y+60*2, x+(34.8 + 4)*2,y+80*2, x+4*2,y+60*2, x+4*2,y+20*2]);

        console.log("x: " + x + " y: " + y);
        console.log("screen limit: " + screen_limit);
        // draw octagon infobox
        x_infoends = x;
        x += (34.8 + 34.8 + 4) * 2;
        hex.drawPolygon([x+(34.8 + 4)*2,y,  screen_limit+(34.8 + 4)*2,y,  screen_limit+(34.8*2 + 4)*2,y+20*2,  screen_limit+(34.8*2 + 4)*2,y+(20*3)*2, screen_limit+(34.8 + 4)*2,y+(20*4)*2,  x+(34.8 + 4)*2,y+(20*4)*2,  x+4*2,y+(20*3)*2,  x+4*2,y+20*2]);

        // // draw Hexagons for Image and Info, until 1/8 of the screen remains
        // while (x < x_limit * 7) {
        //     console.log("x: " + x + " y: " + y);
        //     hex.drawPolygon([x+36.8*2,y, x+71.6*2,y+20*2, x+71.6*2,y+60*2, x+36.8*2,y+80*2, x+2*2,y+60*2, x+2*2,y+20*2]);
        //     x_infoends = x;
        //     x += 71.6 * 2;
        // }

        // // set coordinates of info box
        // x_infostarts = (app.screen.width / 8) + (71.6 *2) + (36.8 * 2);
        // x_infoends += 36.8 * 2;
        // y_infostarts = y;
        
        
        // line.lineStyle(2, 0xffffff, 3);
        
        // console.log("x_start: " + x_infostarts + " y_start: " + y_infostarts);

        // // move line.Graphics to beginning of the upper line
        // line.position.set(x_infostarts, y_infostarts);

        // // draw line for upper bounary of infobox
        // line.moveTo(0, 0).lineTo(x_infoends - x_infostarts, 0);

        // y_infostarts += 80 * 2;

        // // move line.Graphics to beginning of the lower line
        // line.position.set(x_infostarts, y_infostarts);

        // // draw line for lower bounary of infobox
        // line.moveTo(0, 0).lineTo(x_infoends - x_infostarts, 0);

        x = app.screen.width / 8;

    }

    // end filling
    hex.endFill();

    // stage the line 
    // app.stage.addChild(line);

    // add child to the container
    source_infoContainer.addChild(hex);
    source_infoContainer.addChild(line);

    // stage the infroConatiner
    app.stage.addChild(source_infoContainer);

}

/**
 * startSorucePage sets the background and stage containers required
 */
function startSourcePage() {
    
    // variables to set border for hexagons
    x_limit = app.screen.width / 8;
    y_limit = app.screen.width / 8;

    // set width and height of the backgrond sprite, stage it to the app
    source_bg.width = app.screen.width;
    source_bg.heihgt = app.screen.height;
    app.stage.addChild(source_bg);
}