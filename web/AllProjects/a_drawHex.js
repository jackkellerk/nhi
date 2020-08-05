var bgHexContainer = new PIXI.Container();
var initialHex;

// variables to determine the maximum width/height of the hexagon grid
var max_x;
var max_y;

function a_drawHexGrid()
{
  max_x = app.screen.width/140 + 1;
  max_y = app.screen.height/140 - 2;

  // coordinates of initial hexagon center (change throughout function)
  var hex_x = -10;
  //var hex_y = (app.screen.height)/3.5; //(app.screen.height - (max_y*hexSize*1.4875))/2 + 60;
  var hex_y = window.innerHeight/3.5;

  initialHex = new Hexagon({x:hex_x, y:hex_y}, 0, 80);

  // grid is drawn one row at a time with an x-offset for every other row
  for(i=0; i<max_y; i++)
  {
    for (j=0; j<max_x; j++)
    {
      
      var hex = new Hexagon({x:hex_x, y:hex_y}, 0, 80);
      hex.graphics.lineStyle(2, 0x7D7D7D, 3);
      hex.graphics.alpha = 0.025;
      hex.draw();
      app.stage.removeChild(hex.container);
      bgHexContainer.addChild(hex.container);

      hex_x = hex.getCenterRight(0).x;
    }
    // if-statement to determine if x-offset is necessary
    if (i%2 == 1){ hex_x = -10; }
    else if (i%2 == 0) { hex_x = initialHex.getCenterLowerRight(0).x; }
    hex_y = hex_y + 80*1.4875;
  }

  app.stage.addChild(bgHexContainer);
}

// different function to be used for MultiTouch screen (screen ratio: 5:1)
function a_drawHexGridTouch()
{
  max_x = app.screen.width/45 + 1;
  max_y = 3;

  var hex_x = -10;
  var hex_y = 90;

  // initial hex is a global variable. is used also as reference for drawing project shapes
  initialHex = new Hexagon({x:hex_x, y:hex_y}, 0, 27);

  for(i=0; i<max_y; i++)
  {
    for (j=0; j<max_x; j++)
    {
      
      var hex = new Hexagon({x:hex_x, y:hex_y}, 0, 27);
      hex.graphics.lineStyle(2, 0x7D7D7D, 3);
      hex.graphics.alpha = 0.025;
      hex.draw();
      app.stage.removeChild(hex.container);
      bgHexContainer.addChild(hex.container);

      hex_x = hex.getCenterRight(0).x;
    }
    if (i%2 == 1){ hex_x = -10; }
    else if (i%2 == 0) { hex_x = initialHex.getCenterLowerRight(0).x; }
    hex_y = hex_y + 27*1.4875;
  }

  app.stage.addChild(bgHexContainer);
}

// helper function for style changes
function removeHexGrid()
{
  app.stage.removeChild(w_hexGridContainer);
}

