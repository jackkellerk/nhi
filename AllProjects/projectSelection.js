const a_style1 = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
const a_style2 = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 24, letterSpacing: 3});

var a_titleContainer = new PIXI.Container();
var a_settingsContainer = new PIXI.Container();
var a_project1Container = new PIXI.Container();

var a_settingsCC; // settings button counter (open/closed)

function startAllProjects()
{
    // background from gradient texture

    const gradTexture = createGradTexture();

    const sprite = new PIXI.Sprite(gradTexture);
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;
    app.stage.addChild(sprite);



    // Title

    const title = new PIXI.Text('Select an Existing Project', a_style1);
    a_titleContainer.addChild(title);
  
    const subtitle = new PIXI.Text('or Create a New Project to Begin', a_style2);
    subtitle.position.y = 45;
    a_titleContainer.addChild(subtitle);
  
    a_titleContainer.x = app.screen.width/3.5;
    a_titleContainer.y = 15;
  
    app.stage.addChild(a_titleContainer);


/*
    let myHex = new Hexagon({x: 100, y: 100}, 5, 0);
    myHex.graphics.interactive = true;
    myHex.graphics.on('mouseover', a_hexHoverOver); // When mouse hovers over the button, it calls onHoverOver() function
    myHex.graphics.on('mouseout', a_hexHoverOff);
    myHex.draw(0xFFFFFF);
*/


    let settings = drawHex(50, 55, 37, 32, 0xFFFFFF);
    let profilesettings = new PIXI.Sprite.fromImage("Images/profilesettings.png");
        profilesettings.width = 65;
        profilesettings.height = 60;
        profilesettings.position.x = 17.5;
        profilesettings.position.y = 26;
    app.stage.addChild(profilesettings);

    //let project1 = drawHex(270, 220, 80, 70, 0x000000);
    let x = 270;
    let y = 220;
    let radius = 80;
    let hwidth = 70;
    let fill = 0xFFFFFF;
    let myHex = new PIXI.Graphics();
    myHex.beginFill(fill);
    myHex.lineStyle(2, 0x7D7D7D, 3);
    myHex.drawPolygon([  // every two number represents a coordinate of a point on the path of this hexagon
        x, y - radius,
        x + hwidth, y - radius/2,
        x + hwidth, y + radius/2,
        x, y + radius,
        x - hwidth, y + radius/2,
        x - hwidth, y - radius/2
    ]);
    myHex.endFill();
    myHex.interactive = true;
    myHex.on('mouseover', a_hexHoverOver); // When mouse hovers over the button, it calls onHoverOver() function
    myHex.on('mouseout', a_hexHoverOff);
    myHex.on('pointerdown', a_SettingsSelect);
    myHex.alpha = 0.7;
    app.stage.addChild(myHex);

    let p1_image = new PIXI.Sprite.fromImage("Images/sinteredMetal.png");
        p1_image.width = 100;
        p1_image.height = 100;
        p1_image.position.x = 200;
        p1_image.position.y = 200;
    a_project1Container.addChild(p1_image);
    app.stage.addChild(a_project1Container);

    a_project1Container.mask = myHex;





}

function a_hexHoverOver()
{
    this.alpha = 0.9;
}

function a_hexHoverOff()
{
    this.alpha = 0.7;
}

function a_SettingsSelect()
{
    if (a_settingsCC == 0)
    {
        app.stage.addChild(a_settingsContainer);
        a_settingsCC = 1;
    }
    else if (settingsCC == 1)
    {
        app.stage.removeChild(a_settingsContainer);
        a_settingsCC = 0;
    }
}

function a_project1Select()
{
    app.stage.removeChild(a_titleContainer);
}


function drawHex(x, y, radius, hwidth, fill)
{
    let myHex = new PIXI.Graphics();
    myHex.beginFill(fill);
    myHex.lineStyle(2, 0x7D7D7D, 3);
    myHex.drawPolygon([  // every two number represents a coordinate of a point on the path of this hexagon
        x, y - radius,
        x + hwidth, y - radius/2,
        x + hwidth, y + radius/2,
        x, y + radius,
        x - hwidth, y + radius/2,
        x - hwidth, y - radius/2
    ]);
    myHex.endFill();
    myHex.interactive = true;
    myHex.on('mouseover', a_hexHoverOver); // When mouse hovers over the button, it calls onHoverOver() function
    myHex.on('mouseout', a_hexHoverOff);
    myHex.on('pointerdown', a_SettingsSelect);
    myHex.alpha = 0.7;
    app.stage.addChild(myHex);

}