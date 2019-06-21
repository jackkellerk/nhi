function drawHexGrid(withCoordinates)
{
    const style = new PIXI.TextStyle({fill: "white", fontFamily: "Helvetica", fontSize: 10});

    var x = 0;
    var y = 8;
    for(var i=0; i<4; i++)
    {
      x = 0;
      for (var j=0; j<14; j++)
      {
        var hex = new PIXI.Graphics();
        hex.lineStyle(2, 0x414141, 3);
        hex.drawPolygon([x+36.8,y, x+71.6,y+20, x+71.8,y+60, x+36.8,y+80, x+2,y+60, x+2,y+20]);
        w_hexGridContainer.addChild(hex);
        hex.drawPolygon([x,y+64, x+34.8,y+84, x+34.8,y+124, x,y+144, x-34.8,y+124, x-34.8,y+84]);
        w_hexGridContainer.addChild(hex);

        if (withCoordinates)
        {
            var coorText1 = (x+36.8) + ", " + y;
            let coordinate1 = new PIXI.Text(coorText1, style);
            coordinate1.position.x = x+20;
            coordinate1.position.y = y+15;
            w_hexGridContainer.addChild(coordinate1);

            var coorText2 = x + ", " + (y+72);
            let coordinate2 = new PIXI.Text(coorText2, style);
            coordinate2.position.x = x-20;
            coordinate2.position.y = y+79;
            w_hexGridContainer.addChild(coordinate2);
        }
        x = x+74;
      }
      y = y+128;
    }

    app.stage.addChild(w_hexGridContainer);

}

function removeHexGrid()
{
    app.stage.removeChild(w_hexGridContainer);
}





function makeTaskHex(x, y, task)
{
    this.task = task;

    // task-specific counters
    menuCC = 0; 
    showTitle = 1;

    var hex = new PIXI.Graphics();
    hex.beginFill(0xFFFFFF, 1); // Color and opacity
    hex.lineStyle(2, 0x414141, 3);
    hex.drawPolygon([x,y, x+34.8,y+20, x+34.8,y+60, x,y+80, x-34.8,y+60, x-34.8,y+20]);
    hex.endFill();
    hex.interactive = true;
    hex.alpha = 0.6;

    hex.on('mouseover', w_hexHoverOver); // When mouse hovers over the button, it calls onHoverOver() function
    hex.on('mouseout', w_hexHoverOff);

    switch(task) {
        case "menu":
            hex.on('pointerdown', w_MenuSelect);
            app.stage.addChild(hex);
            break;
        case "save":
            hex.on('pointerdown', w_SaveSelect);
            w_menuContainer.addChild(hex);
            break;
        case "settings":
            hex.on('pointerdown', w_SettingsSelect);
            w_menuContainer.addChild(hex);
            break;
        case "Hide Menu":
            hex.on('pointerdown', w_HideSelect);
            w_menuContainer.addChild(hex);
            break;
        case "image1":
            hex.source = images[0];
            hex.on('pointerdown', w_ImageSelect);
            w_imageContainer.addChild(hex);
            break;
        case "image2":
            hex.source = images[1];
            hex.on('pointerdown', w_ImageSelect);
            w_imageContainer.addChild(hex);
            break;
        case "image3":
            hex.source = images[2];
            hex.on('pointerdown', w_ImageSelect);
            w_imageContainer.addChild(hex);
            break;
        case "image4":
            hex.source = images[3];
            hex.on('pointerdown', w_ImageSelect);
            w_imageContainer.addChild(hex);
            break;
        default:
          // code block
    }

    var settingsInfo = new showInfoBox(x-10, y+50, 25+task.length*5, task);

}

function w_hexHoverOver()
{
    app.stage.addChildAt(w_settingsContainer, app.stage.children.length-1);
    this.alpha = 0.8;
}

function w_hexHoverOff()
{
    app.stage.removeChild(w_settingsContainer);
    this.alpha = 0.6;
}

function w_MenuSelect()
{
    if (menuCC == 0)
    {
        app.stage.addChild(w_menuContainer);
        menuCC = 1;
    }
    else if (menuCC == 1)
    {
        app.stage.removeChild(w_menuContainer);
        menuCC = 0;
    }
}

function w_SaveSelect()
{
    if (saveCC == 0)
    {
        saveCC = 1;
    }
    else if (settingsCC == 1)
    {
        saveCC = 0;
    }
}

function w_SettingsSelect()
{
    if (settingsCC == 0)
    {
        app.stage.addChild(w_settingsContainer);
        settingsCC = 1;
    }
    else if (settingsCC == 1)
    {
        app.stage.removeChild(w_settingsContainer);
        settingsCC = 0;
    }
}

function w_HideSelect()
{
    app.stage.removeChild(w_settingsContainer);
    app.stage.removeChild(w_imageContainer);
    app.stage.removeChild(w_menuContainer);
}

function w_ImageSelect()
{
    if (showTitle == 1) {
        app.stage.removeChild(w_titleContainer);
        showTitle = 0;
    }
    var PopupSprite = new PIXI.Sprite.fromImage(this.source);
        PopupSprite.scale.set(0.9, 0.9);
        PopupSprite.x = 20;
        PopupSprite.width = app.screen.width * 0.9;
    w_PopupContainer.addChild(PopupSprite);

    app.stage.addChild(w_PopupContainer);
}



