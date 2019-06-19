function drawInfoBox(tip_x, tip_y, width, text)
{
    var box = new PIXI.Graphics();
    box.beginFill(0xFFFFFF, 1); // Color and opacity
    box.lineStyle(2, 0x414141, 3);
    box.drawPolygon([tip_x,tip_y, tip_x+20,tip_y+20, tip_x+60,tip_y+20, tip_x+60,tip_y+50, tip_x-60,tip_y+50, tip_x-60,tip_y+20, tip_x-20,tip_y+20, tip_x,tip_y]);
    box.endFill();
    box.alpha = 0.6;
    w_settingsContainer.addChild(box);

    let label = new PIXI.Text(text, w_style);
    label.position.x = tip_x-53;
    label.position.y = tip_y+25;
    w_settingsContainer.addChild(label);
}