

function RectButton(x_position, y_position, height, width, source)
{

    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF, 1.5); // Color and opacity
    graphics.lineStyle(2, 0x414141, 1);
    graphics.drawRect(x_position, y_position, width, height);
    graphics.endFill();
    graphics.interactive = true;
    graphics.on('mouseover', onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
    .on('mouseout', onHoverOff)
    .on('pointerdown', onSelect);
    graphics.alpha = 0.5;
    graphics.source = source;

    bgSprite.addChild(graphics);

}

function onHoverOver(event){
    this.data = event.data;
    this.alpha = 1;
}

function onHoverOff(event){
    this.data = event.data;
    this.alpha = 0.5;
}

function onSelect(event) {
    this.data = event.data;
    var PopupSprite = new PIXI.Sprite.fromImage(this.source, true);
        PopupSprite.scale.set(0.9, 0.9);
        PopupSprite.x = 20;
        PopupSprite.width = app.screen.width * 0.9;
        PopupContainer.addChild(PopupSprite);
    enablePopup();
}

