function showInfoBox(x, y, width, text)
{
    const boxStyle = new PIXI.TextStyle({fill: "black", fontFamily: "Helvetica", fontSize: 14});


    var box = new PIXI.Graphics();
    box.beginFill(0xffffff, 100); // Color and opacity
    box.lineStyle(1, 0xd3d3d3, 1000);
    box.drawPolygon([x,y, x+width,y, x+width,y+18, x,y+18]);
    box.endFill();
    box.alpha = 0.6;
    w_menuContainer.addChild(box);

    let label = new PIXI.Text(text, boxStyle);
    label.position.x = x+5;
    label.position.y = y-1;
    w_menuContainer.addChild(label);
}

//function hideInfoBox(x, y,)