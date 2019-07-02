var w_hexGridContainer = new PIXI.Container();

function drawHexGrid(withCoordinates)
{
  //const style = new PIXI.TextStyle({fill: "white", fontFamily: "Helvetica", fontSize: 10});

  var hex_x = 200;
  var hex_y = 101;


  for(var i=0; i<4; i++)
  {
    for (var j=0; j<6; j++)
    {
      var hex = new Hexagon({x:hex_x, y:hex_y}, 0, 80);
      hex.graphics.lineStyle(2, 0x7D7D7D, 3);
      hex.graphics.alpha = 0.025;
      hex.draw();

      //w_hexGridContainer.addChild(hex);

      /*
      if (withCoordinates)
      {
        var coorText1 = (hex_x+36.8) + ", " + hex_y;
        let coordinate1 = new PIXI.Text(coorText1, style);
        coordinate1.position.x = hex_x+20;
        coordinate1.position.y = hex_y+15;
        w_hexGridContainer.addChild(coordinate1);

        var coorText2 = hex_x + ", " + (hex_y+72);
        let coordinate2 = new PIXI.Text(coorText2, style);
        coordinate2.position.x = hex_x-20;
        coordinate2.position.y = hex_y+79;
        w_hexGridContainer.addChild(coordinate2);
      }
      */
      hex_x = hex.getCenterRight(0).x;
    }
    if (i%2 == 1){ hex_x = 200; }
    else if (i%2 == 0) { hex_x = 130; }
    hex_y = hex_y + 119;
  }

}

function removeHexGrid()
{
  app.stage.removeChild(w_hexGridContainer);
}

