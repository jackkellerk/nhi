// Instantiate PIXI JS (from example)
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported())
{
    type = "canvas";
}
PIXI.utils.sayHello(type);

let app = new PIXI.Application({ 
        width: window.innerWidth - 20,
        height: window.innerHeight - 20,
        antialias: true,
        transparent: false,
        autoResize: true,
        resolution: devicePixelRatio,
        backgroundColor: 0xe0e0e0, 
});

document.body.appendChild(app.view);
// End of PIXI instantiate

// Add background image
gridImage = new PIXI.Sprite.from("./background.png");
gridImage.height = app.screen.height * 2;
gridImage.width = app.screen.height * 2;
app.stage.addChild(gridImage);

// Create the nodes
/* nodeList = [];
for(i = 0; i < 800; i += 200)
{
    graphics = new PIXI.Graphics();
    graphics.beginFill(0x595959);
    graphics.drawRoundedRect(i, i, 200, 200, 10);
    graphics.endFill();
    graphics.beginFill(0xb3b3b3);
    graphics.drawRoundedRect(i + 5, i + 5, 190, 190, 10);
    graphics.endFill();
    graphics
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
    nodeList.push(graphics);
    app.stage.addChild(nodeList[i / 200]);
} */

graphics = new PIXI.Graphics();
graphics.beginFill(0x595959);
graphics.drawRoundedRect(0, 0, 200, 200, 10);
graphics.endFill();
graphics.beginFill(0xb3b3b3);
graphics.drawRoundedRect(5, 5, 190, 190, 10);
graphics.endFill();
graphics
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);
app.stage.addChild(graphics);

// Dragging functions
function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}

// run the render loop
animate();

function animate() 
{
    app.renderer.render(app.stage);
    requestAnimationFrame( animate );
}