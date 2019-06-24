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



    // Settings Hex

    a_settingsCC = 1;

    let settings = new Hexagon({x:50, y:55}, 32, 37);
    settings.graphics.lineStyle(2, 0x7D7D7D, 3);
    settings.graphics.interactive = true;
    settings.graphics.on('mouseover', a_hexHoverOver);
    settings.graphics.on('mouseout', a_hexHoverOff);
    settings.graphics.on('pointerdown', a_SettingsSelect);
    settings.graphics.alpha = 0.7;
    settings.draw(0xFFFFFF);

    let profilesettings = new PIXI.Sprite.fromImage("Images/profilesettings.png");
        profilesettings.width = 65;
        profilesettings.height = 60;
        profilesettings.position.x = 17.5;
        profilesettings.position.y = 26;
    app.stage.addChild(profilesettings);



    // Project 1

    let p1_image = new PIXI.Sprite.fromImage("Images/sinteredMetal.png");
        p1_image.width = 500;
        p1_image.height = 500;
        p1_image.position.x = 150;
        p1_image.position.y = 140;
    a_project1Container.addChild(p1_image);
    app.stage.addChild(a_project1Container);

    let maskHexes = [];
    maskHexes.push(drawMaskHex(270, 220, 70, 80));
    maskHexes.push(drawMaskHex(345, 350, 70, 80));
    a_project1Container.mask = maskHexes[0];

    let project1 = new Hexagon({x:270, y:220}, 70, 80);
    project1.graphics.lineStyle(3, 0xFFFFFF, 3);
    project1.graphics.interactive = true;
    project1.graphics.on('mouseover', a_projectHoverOver);
    project1.graphics.on('mouseout', a_projectHoverOff);
    project1.graphics.on('pointerdown', a_project1Select);
    project1.graphics.alpha = 0;
    project1.draw(0xFFFFFF);


/*
    let tempHex1 = new PIXI.Graphics();
        tempHex1.beginFill(0xFFFFFF);
        tempHex1.lineStyle(2, 0x7D7D7D, 3);
        tempHex1.drawPolygon([ 270,140, 340,180, 340,260, 270,300, 200,260, 200,180 ]);
        tempHex1.endFill();
    app.stage.addChild(tempHex1);
    a_project1Container.mask = tempHex1;

     let tempHex2 = new PIXI.Graphics();
        tempHex2.beginFill(0xFFFFFF);
        tempHex2.lineStyle(2, 0x7D7D7D, 3);
        tempHex2.drawPolygon([ 270,140, 340,180, 340,260, 270,300, 200,260, 200,180 ]);
        tempHex2.endFill();

*/





}

function a_hexHoverOver()
{
    this.alpha = 1;
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

function a_projectHoverOver()
{
    this.alpha = 0.1;
}

function a_projectHoverOff()
{
    this.alpha = 0;
}

function a_project1Select()
{
    app.stage.removeChild(a_titleContainer);
}




function drawMaskHex(x, y, hwidth, radius)
{
    let maskHex = new PIXI.Graphics;
        maskHex.beginFill(0x000000);
        maskHex.drawPolygon([ x,y-radius, x+hwidth,y-radius/2, x+hwidth,y+radius/2, x,y+radius, x-hwidth,y+radius/2, x-hwidth,y-radius/2 ]);
        maskHex.endFill();
    app.stage.addChild(maskHex);
    return maskHex;
}
