

function makeRectButton(x_position, y_position, height, width, source)
{

    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF, 1.5); // Color and opacity
    graphics.lineStyle(2, 0x414141, 2);
    graphics.drawRoundedRect(x_position, y_position, width, height, 2);
    graphics.endFill();
    graphics.interactive = true;
    graphics.on('mouseover', w_HoverOver); // When mouse hovers over the button, it calls onHoverOver() function
    graphics.on('mouseout', w_HoverOff);
    graphics.on('pointerdown', w_Select);
    graphics.alpha = 0.2;
    graphics.source = source;

    w_menuContainer.addChild(graphics);

}

function w_HoverOver(event){
    this.data = event.data;
    this.alpha = 0.35;
}

function w_HoverOff(event){
    this.data = event.data;
    this.alpha = 0.2;
}

function w_Select(event) {
    this.data = event.data;

    var PopupSprite = new PIXI.Sprite.fromImage(this.source, true);
        PopupSprite.scale.set(0.9, 0.9);
        PopupSprite.x = 20;
        PopupSprite.width = app.screen.width * 0.9;
    w_PopupContainer.addChild(PopupSprite);

    app.stage.addChild(w_PopupContainer);
}






function makeMenuButton(x_position, y_position, width, height)
{
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF); // Color and opacity
    graphics.lineStyle(2, 0x414141, 2);
    graphics.drawRoundedRect(x_position, y_position, width, height, 2);
    graphics.endFill();
    graphics.interactive = true;
    graphics.on('mouseover', w_HoverOverMenu); // When mouse hovers over the button, it calls onHoverOver() function
    graphics.on('mouseout', w_HoverOffMenu);
    graphics.on('pointerdown', w_SelectMenu);
    graphics.alpha = 0.6;

    app.stage.addChild(graphics);
}

function w_HoverOverMenu(event){
    this.data = event.data;
    this.alpha = 0.9;
}

function w_HoverOffMenu(event){
    this.data = event.data;
    this.alpha = 0.6;
}

function w_SelectMenu(event) {
    this.data = event.data;
    app.stage.addChild(w_menuContainer);
}