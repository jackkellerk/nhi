var bgHexContainer = new PIXI.Container();
var initialHex;

function a_drawHexGrid()
{
  var max_x = app.screen.width/(hexSize*1.75) + 1;
  var max_y = app.screen.height/(hexSize*1.4875) - 2;

  var hex_x = -10;
  var hex_y = app.screen.height/3.5; //(app.screen.height - (max_y*hexSize*1.4875))/2 + 60;

  initialHex = new Hexagon({x:hex_x, y:hex_y}, 0, hexSize);

  for(i=0; i<max_y; i++)
  {
    for (j=0; j<max_x; j++)
    {
      
      var hex = new Hexagon({x:hex_x, y:hex_y}, 0, hexSize);
      hex.graphics.lineStyle(2, 0x7D7D7D, 3);
      hex.graphics.alpha = 0.025;
      hex.draw();
      app.stage.removeChild(hex.container);
      bgHexContainer.addChild(hex.container);

      hex_x = hex.getCenterRight(0).x;
    }
    if (i%2 == 1){ hex_x = -10; }
    else if (i%2 == 0) { hex_x = initialHex.getCenterLowerRight(0).x; }
    hex_y = hex_y + hexSize*1.4875;
  }

  app.stage.addChild(bgHexContainer);
}

function removeHexGrid()
{
  app.stage.removeChild(w_hexGridContainer);
}

