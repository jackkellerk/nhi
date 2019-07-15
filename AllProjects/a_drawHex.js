var bgHexContainer = new PIXI.Container();
var initialHex;

var max_x;
var max_y;

function a_drawHexGrid()
{
  max_x = app.screen.width/140 + 1;
  max_y = app.screen.height/140 - 2;

  var hex_x = -10;
  var hex_y = app.screen.height/3.5; //(app.screen.height - (max_y*hexSize*1.4875))/2 + 60;

  initialHex = new Hexagon({x:hex_x, y:hex_y}, 0, 80);

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
    if (i%2 == 1){ hex_x = -10; }
    else if (i%2 == 0) { hex_x = initialHex.getCenterLowerRight(0).x; }
    hex_y = hex_y + 80*1.4875;
  }

  app.stage.addChild(bgHexContainer);
}

function a_drawHexGridTouch()
{
  max_x = app.screen.width/45 + 1;
  max_y = 3;

  var hex_x = -10;
  var hex_y = 90;

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

function removeHexGrid()
{
  app.stage.removeChild(w_hexGridContainer);
}

