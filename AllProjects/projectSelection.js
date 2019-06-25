const a_style1 = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
const a_style2 = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 24, letterSpacing: 3});

var a_titleContainer = new PIXI.Container();
var a_settingsContainer = new PIXI.Container();
var a_project1Container = new PIXI.Container();
let maskContainer = new PIXI.Container();

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

    a_settingsCC = 0;

    let settings = new Hexagon({x:50, y:55}, 0, 37);
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




    // Settings Menu

    let w = window.innerWidth;
    let h = window.innerHeight;
    let settingsMenu = new PIXI.Graphics();
    settingsMenu.lineStyle(5, 0x707070, 3);
    settingsMenu.beginFill(0x7D7D7D);
    settingsMenu.drawPolygon([w/5,20, w-(w/5),20, w-(w/5),h-20, w/5,h-20]);
    settingsMenu.endFill();
    a_settingsContainer.addChild(settingsMenu);

    let settTitle = new PIXI.Text("Settings", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
    settTitle.position.x = (w/5)+35;
    settTitle.position.y = 40;
    a_settingsContainer.addChild(settTitle);

    let settUsername = new PIXI.Text("Username:             akt221", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
    settUsername.position.x = (w/5)+35;
    settUsername.position.y = 140;
    a_settingsContainer.addChild(settUsername);

    let settPassword = new PIXI.Text("Change Password:  ********", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
    settPassword.position.x = (w/5)+35;
    settPassword.position.y = 180;
    a_settingsContainer.addChild(settPassword);

    let settInstitution = new PIXI.Text("Institution:             Lehigh University", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
    settInstitution.position.x = (w/5)+35;
    settInstitution.position.y = 220;
    a_settingsContainer.addChild(settInstitution);





    // Project 1

    let p1_image = new PIXI.Sprite.fromImage("Images/sinteredMetal.png");
        p1_image.width = 700;
        p1_image.height = 700;
        p1_image.position.x = 150;
        p1_image.position.y = 120;
        p1_image.interactive = true;
        p1_image.on('mouseover', a_projectHoverOver);
        p1_image.on('mouseout', a_projectHoverOff);
        p1_image.on('pointerdown', a_project1Select);
        p1_image.alpha = 0.8;
    app.stage.addChild(p1_image);

    let p1A = new Hexagon({x:270, y:220}, 0, 80);
    p1A.graphics.lineStyle(3, 0xFFFFFF, 3);
    p1A.draw(0xFFFFFF);
    p1_image.mask = p1A.graphics;

    let p1B = new Hexagon({x:p1A.getCenterLowerRight(0).x, y:p1A.getCenterLowerRight(0).y}, 0,80);
    p1B.graphics.lineStyle(3, 0xFFFFFF, 3);
    p1B.draw(0xFFFFFF);
    //p1_image.mask = p1B.graphics;

    let p1C = new Hexagon({x:p1A.getCenterRight(0).x, y:p1A.getCenterRight(0).y}, 0,80);
    p1C.graphics.lineStyle(3, 0xFFFFFF, 3);
    p1C.draw(0xFFFFFF);
    //p1_image.mask = p1C.graphics;

    let p1D = new Hexagon({x:p1B.getCenterRight(0).x, y:p1B.getCenterRight(0).y}, 0,80);
    p1D.graphics.lineStyle(3, 0xFFFFFF, 3);
    p1D.draw(0xFFFFFF);



    // New Project

    let newP = new Hexagon({x:p1C.getCenterRight(130).x, y: p1C.getCenterRight(0).y}, 0,80);
    newP.graphics.lineStyle(3, 0xA9A9A9, 3);
    newP.interactive = true;
    newP.graphics.alpha = 0.7;
    p1_image.on('mouseover', a_projectHoverOver);
    p1_image.on('mouseout', a_projectHoverOff);
    p1_image.on('pointerdown', a_project1Select);
    newP.draw(Hexagon.getHexColor(909090));

    let plus = new PIXI.Text("+", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 100});
    plus.position.x = newP.x-30;
    plus.position.y = newP.y-70;
    app.stage.addChild(plus);








}

function a_hexHoverOver()
{
    this.alpha = 1;
}

function a_hexHoverOff()
{
    this.alpha = 0.8;
}

function a_SettingsSelect()
{
    if (a_settingsCC == 0)
    {
        app.stage.addChild(a_settingsContainer);
        a_settingsCC = 1;
    }
    else if (a_settingsCC == 1)
    {
        app.stage.removeChild(a_settingsContainer);
        a_settingsCC = 0;
    }
}

function a_projectHoverOver()
{
    this.alpha = 1;
}

function a_projectHoverOff()
{
    this.alpha = 0.8;
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
