

function startAllProjects()
{
    // background from gradient texture

    const gradTexture = createGradTexture();

    const sprite = new PIXI.Sprite(gradTexture);
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;
    app.stage.addChild(sprite);








}
