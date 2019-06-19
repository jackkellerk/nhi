
function drawHexOutline(tip_x, tip_y, scale)
{

    var hex = new PIXI.Graphics();
    hex.lineStyle(2, 0x414141, 3);
    hex.drawPolygon([tip_x*scale,tip_y*scale, (tip_x+8.7)*scale,(tip_y+5)*scale, (tip_x+8.7)*scale,(tip_y+15)*scale, tip_x*scale,(tip_y+20)*scale, (tip_x-8.7)*scale,(tip_y+15)*scale, (tip_x-8.7)*scale,(tip_y+5)*scale]);
    //hex.alpha = 0.4;
    app.stage.addChild(hex);

}



function makeHex(tip_x, tip_y, scale, source, containerID)
{

    clickcounter = 0;
    showTitle = 1;

    var hex = new PIXI.Graphics();
    hex.beginFill(0xFFFFFF, 1); // Color and opacity
    hex.lineStyle(2, 0x414141, 3);
    hex.drawPolygon([tip_x*scale,tip_y*scale, (tip_x+8.7)*scale,(tip_y+5)*scale, (tip_x+8.7)*scale,(tip_y+15)*scale, tip_x*scale,(tip_y+20)*scale, (tip_x-8.7)*scale,(tip_y+15)*scale, (tip_x-8.7)*scale,(tip_y+5)*scale]);
    hex.endFill();
    hex.interactive = true;
    hex.on('mouseover', w_hexHoverOver); // When mouse hovers over the button, it calls onHoverOver() function
    hex.on('mouseout', w_hexHoverOff);

    if (containerID == 1) {
        hex.on('pointerdown', w_ImageMenuSelect);
    } else if (containerID == 2) {
        hex.on('pointerdown', w_SettingsSelect);
    } else if (containerID == 3) {
        hex.on('pointerdown', w_SaveSelect);
    }
    hex.alpha = 0.6;
    app.stage.addChild(hex);

    const hexImg = new PIXI.Sprite.fromImage(source);
    hexImg.width = 16*scale;
    hexImg.height = 16*scale;
    hexImg.position.x = (tip_x-8.3)*scale;
    hexImg.position.y = (tip_y+2)*scale;
    app.stage.addChild(hexImg);



}

function w_hexHoverOver()
{
    this.alpha = 0.8;
}

function w_hexHoverOff()
{
    this.alpha = 0.6;
}

function w_ImageMenuSelect()
{
    if (clickcounter == 0)
    {
        app.stage.addChild(w_menuContainer);
        clickcounter = 1;
    }
    else if (clickcounter == 1)
    {
        app.stage.removeChild(w_menuContainer);
        clickcounter = 0;
    }
}

function w_SettingsSelect()
{
    if (showTitle == 1) {
        app.stage.removeChild(w_titleContainer);
        showTitle = 0;
    }
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






function makeImageHex(tip_x, tip_y, scale, source, text)
{

    var btn = new PIXI.Graphics();
    btn.beginFill(0xFFFFFF, 1); // Color and opacity
    btn.lineStyle(2, 0x414141, 3);
    btn.drawPolygon([tip_x*scale,tip_y*scale, (tip_x+8.7)*scale,(tip_y+5)*scale, (tip_x+8.7)*scale,(tip_y+15)*scale, tip_x*scale,(tip_y+20)*scale, (tip_x-8.7)*scale,(tip_y+15)*scale, (tip_x-8.7)*scale,(tip_y+5)*scale]);
    btn.endFill();
    btn.interactive = true;
    btn.on('mouseover', w_ImageHoverOver); // When mouse hovers over the button, it calls onHoverOver() function
    btn.on('mouseout', w_ImageHoverOff);
    btn.on('pointerdown', w_ImageSelect);
    btn.alpha = 0.4;
    btn.source = source;
    w_menuContainer.addChild(btn);

    let label = new PIXI.Text(text, w_style);
    label.position.x = tip_x*scale - 30;
    label.position.y = tip_y*scale + 20;
    w_menuContainer.addChild(label);


}

function w_ImageHoverOver(event)
{
    this.data = event.data;
    this.alpha = 0.7;
}

function w_ImageHoverOff(event)
{
    this.data = event.data;
    this.alpha = 0.4;
}

function w_ImageSelect(event)
{
    this.data = event.data;

    var PopupSprite = new PIXI.Sprite.fromImage(this.source, true);
        PopupSprite.scale.set(0.9, 0.9);
        PopupSprite.x = 20;
        PopupSprite.width = app.screen.width * 0.9;
    w_PopupContainer.addChild(PopupSprite);

    app.stage.addChild(w_PopupContainer);
}
