

function makeRectButton(x_position, y_position, height, width, source)
{

    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF, 1.5); // Color and opacity
    graphics.lineStyle(2, 0x414141, 1);
    graphics.drawRect(x_position, y_position, width, height);
    graphics.endFill();
    graphics.interactive = true;
    graphics.on('mouseover', w_HoverOver); // When mouse hovers over the button, it calls onHoverOver() function
    graphics.on('mouseout', w_HoverOff);
    graphics.on('pointerdown', w_Select);
    graphics.alpha = 0.5;
    graphics.source = source;

    bgSprite.addChild(graphics);

}

function w_HoverOver(event){
    this.data = event.data;
    this.alpha = 0.7;
}

function w_HoverOff(event){
    this.data = event.data;
    this.alpha = 0.5;
}

function w_Select(event) {
    this.data = event.data;

    var PopupSprite = new PIXI.Sprite.fromImage(this.source, true);
        PopupSprite.scale.set(0.9, 0.9);
        PopupSprite.x = 20;
        PopupSprite.width = app.screen.width * 0.9;
    w_PopupContainer.addChild(PopupSprite);

    bgSprite.addChild(w_PopupContainer);
}

