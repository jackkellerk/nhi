var initialHex;

function a_drawHexGrid()
{
  max_x = app.screen.width/140 + 1;
  max_y = app.screen.height/119 - 2;

  hex_x = -10;
  hex_y = (app.screen.height - (max_y*119))/2 + 60;

  initialHex = new Hexagon({x:hex_x, y:hex_y}, 0, 80);

  for(i=0; i<max_y; i++)
  {
    for (j=0; j<max_x; j++)
    {
      
      var hex = new Hexagon({x:hex_x, y:hex_y}, 0, 80);
      hex.graphics.lineStyle(2, 0x7D7D7D, 3);
      hex.graphics.alpha = 0.025;
      hex.draw();

      hex_x = hex.getCenterRight(0).x;
    }
    if (i%2 == 1){ hex_x = -10; }
    else if (i%2 == 0) { hex_x = 60; }
    hex_y = hex_y + 119;
  }

  var hahaHex = new Hexagon({x:-10, y:(app.screen.height - (max_y*119))/2 + 60}, 0, 80);
  //hahaHex.draw(0xffffff);
}

function removeHexGrid()
{
  app.stage.removeChild(w_hexGridContainer);
}

