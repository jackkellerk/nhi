const a_style1 = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
const a_style2 = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 24, letterSpacing: 3});

var a_titleContainer = new PIXI.Container();
var a_settingsContainer = new PIXI.Container();
var a_project1Container = new PIXI.Container();
let maskContainer = new PIXI.Container();

var p1_image;
var p1Hex;
var p1Hover;

var a_settingsCC; // settings button counter (open/closed)

// user settings variable(s)
var userSettingsResponse; // valid uses of userSettingsResponse are: userSettingsResponse.legalName, userSettingsResponse.username, userSettingsResponse.passwordLength, userSettingsResponse.email, userSettingsResponse.profilePicture, userSettingsResponse.institution, and userSettingsResponse.id

function startAllProjects()
{
    // This loads the information about the userSettings
    var username = "jjk322"; // This will probably be global and accessable from the login screen files, but for now it is here
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"username": username}),
        url: 'http://localhost:4567/usersettings', // You can change the port to 8080 if this doesnt work
        dataType: 'json',
        crossDomain: 'true',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            userSettingsResponse = data;
            createUIProjects();
        },
        error: function(xhr, status, error) {
            alert("Error loading user settings!");
        }
    });

    // eventually create more functions that wait for database information and create the UI last
}

function createUIProjects()
{
    // background from gradient texture

    const gradTexture = createGradTexture();
    
    //Agustin: alpaha transform to 0.0 on the login background image. Setting stage to 0.0 alpha
    app.stage.x = app.width;
    positionTransform(0, app.stage.y, app.stage, 12)
    alphaTransform(LI_backgroundImage, 0.0, 10);
    app.stage.alpha = 0.0;

    const sprite = new PIXI.Sprite(gradTexture);
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;
    app.stage.addChild(sprite);


    // hex background grid

    a_drawHexGrid(false); // false -> without coordinates


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
        settingsMenu.interactive = true;
    a_settingsContainer.addChild(settingsMenu);

    let settTitle = new PIXI.Text("Profile Settings", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
    settTitle.position.x = (w/5)+35;
    settTitle.position.y = 40;
    a_settingsContainer.addChild(settTitle);

    let settUsername = new PIXI.Text("Username:             " + userSettingsResponse.username, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
    settUsername.position.x = (w/5)+35;
    settUsername.position.y = 140;
    a_settingsContainer.addChild(settUsername);

    let settPassword = new PIXI.Text("Change Password:  " + userSettingsResponse.passwordLength /* Maybe with the length create a for loop that creates that many '*'s in a string for this field */, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
    settPassword.position.x = (w/5)+35;
    settPassword.position.y = 180;
    a_settingsContainer.addChild(settPassword);

    let settInstitution = new PIXI.Text("Institution:             " + userSettingsResponse.institution, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
    settInstitution.position.x = (w/5)+35;
    settInstitution.position.y = 220;
    a_settingsContainer.addChild(settInstitution);

    let settName = new PIXI.Text("Name:                   " + userSettingsResponse.legalName, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
    settName.position.x = (w/5)+35;
    settName.position.y = 260;
    a_settingsContainer.addChild(settName);

    let signoutButton = new PIXI.Graphics();
    signoutButton.lineStyle(3, 0xA9A9A9, 3);
    signoutButton.beginFill(0xffffff);
    signoutButton.drawPolygon([(w/5)+35,h-100, w-(w/5+35),h-100, w-(w/5+35),h-70, (w/5)+35,h-70]);
    signoutButton.endFill();
    a_settingsContainer.addChild(signoutButton);

    let settSignout = new PIXI.Text("SIGN OUT", {fill: "#000000", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 4});
    settSignout.position.x = w/2-60;
    settSignout.position.y = h-96;
    a_settingsContainer.addChild(settSignout);




    // Project 1

    p1Hover = false;

    p1_image = new PIXI.Sprite.fromImage("Images/LineIntegral.jpg");
    p1_image.width = 700;
    p1_image.height = 500;
    p1_image.position.x = 90;
    p1_image.position.y = 90;
    app.stage.addChild(p1_image);


    p1Hex = new PIXI.Graphics();
    p1Hex.beginFill(0x000000);
    p1Hex.drawPolygon([339.282,140, 408.564,180, 477.846,140, 547.128,180, 547.128,260, 477.846,300, 477.846,380, 408.564,420, 339.282,380, 339.282,300, 270,260, 270,180]);
    p1Hex.endFill();
    p1Hex.position.x = -71;
    app.stage.addChild(p1Hex);
    p1_image.mask = p1Hex;


    let p1Info = new PIXI.Graphics();
        p1Info.beginFill(0x000000);
        p1Info.drawPolygon([339.282,140, 408.564,180, 477.846,140, 547.128,180, 547.128,260, 477.846,300, 477.846,380, 408.564,420, 339.282,380, 339.282,300, 270,260, 270,180]);
        p1Info.endFill();
        p1Info.alpha = 0.5;
        p1Info.position.x = -71;
    a_project1Container.addChild(p1Info);


    let p1A = new Hexagon({x: 476.12, y: 340}, 0,80);
        p1A.graphics.interactive = true;
        //p1A.graphics.on('mouseover', a_projectHoverOver);
        //p1A.graphics.on('mouseout', a_projectHoverOff);
        p1A.graphics.alpha = 0.8;
    p1A.draw(0xf0f0f0);


    let details = "Last Edited\n\n         Whitaker Laboratory\n         Lehigh University\n         06/25/19\n         13:23"
    let p1Details = new PIXI.Text(details, {fill: "#ffffff", fontFamily: "Arial", fontWeight: "bold", fontSize: 14, lineHeight: 20});
        p1Details.position.x = 253;
        p1Details.position.y = 193;
    a_project1Container.addChild(p1Details);



    let p1Title = new PIXI.Text("Project 1", {fill: "#000000", fontFamily: "Helvetica", fontWeight: "bold", fontSize: 18, letterSpacing: 2, dropShadow: true, dropShadowAlpha: 0.2, dropShadowAngle: 0.05, dropShadowColor: "white",dropShadowDistance: 2});
        p1Title.position.x = p1A.x - 46;
        p1Title.position.y = p1A.y - 35;
    app.stage.addChild(p1Title);

    let p1Select = new PIXI.Graphics();
        p1Select.lineStyle(3, 0xf5f5f5, 3);
        p1Select.beginFill(0xffffff);
        p1Select.drawPolygon([p1A.x-46,p1A.y+10, p1A.x+46,p1A.y+10, p1A.x+46,p1A.y+30, p1A.x-46,p1A.y+30]);
        p1Select.endFill();
        p1Select.interactive = true;
        p1Select.on('mouseover', a_projectHoverOver);
        p1Select.on('mouseout', a_projectHoverOff);
        p1Select.on('pointerdown', a_project1Select);
        p1Select.alpha = 0.8;
    app.stage.addChild(p1Select);

    let p1SelectTitle = new PIXI.Text("Open", {fill: "#606060", fontFamily: "Arial", fontWeight: "bold", fontSize: 14, letterSpacing:1.5});
    p1SelectTitle.position.x = p1A.x-22;
    p1SelectTitle.position.y = p1A.y+11;
    app.stage.addChild(p1SelectTitle);






    // New Project

    let newP = new Hexagon({x:p1A.getCenterUpperRight(279).x, y: p1A.getCenterUpperRight(0).y}, 0,80);
    newP.graphics.lineStyle(3, 0xA9A9A9, 3);
    newP.graphics.interactive = true;
    newP.graphics.on('mouseover', a_hexHoverOver);
    newP.graphics.on('mouseout', a_hexHoverOff);
    newP.graphics.on('pointerdown', a_newPSelect);
    newP.graphics.alpha = 0.8;
    newP.draw(0x909090);

    let plus = new PIXI.Text("+", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 100});
    plus.position.x = newP.x-30;
    plus.position.y = newP.y-70;
    app.stage.addChild(plus);






    // inside Hexagon.draw();
    /* 
    let str = (this.x+this.hwidth) + ", " + (this.y-this.radius) + "\n" + (this.x+this.hwidth*2) + ", " + (this.y-this.radius+this.radius/2) + "\n" + (this.x+this.hwidth*2) + ", " + (this.y-this.radius+this.radius*3/2) + "\n" + (this.x+this.hwidth) + ", " + (this.y-this.radius+this.radius*2) + "\n" + this.x + ", " + (this.y-this.radius+this.radius*3/2) + "\n" + this.x + ", " + (this.y-this.radius+this.radius/2);

    let text = new PIXI.Text(str, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 10});
    text.position.x = this.x -50;
    text.position.y = this.y + 200;
    app.stage.addChild(text);
    */

    //Agustin: alpha transform on app.stage
    alphaTransform(app.stage, 1.0, 20);
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
        blurTransform(a_titleContainer,1.0, 10)
        blurTransform(a_project1Container,1.0, 10)
        blurTransform(maskContainer,1.0, 10)
        blurTransform(p1_image,1.0, 10)
        a_settingsCC = 1;
    }
    else if (a_settingsCC == 1)
    {
        app.stage.removeChild(a_settingsContainer);
        blurTransform(a_titleContainer, 0.5 , 10)
        blurTransform(a_project1Container, 0.5, 10)
        blurTransform(maskContainer, 0.5, 10)
        blurTransform(p1_image, 0.5, 10)
        a_settingsCC = 0;
    }
}

function a_projectHoverOver()
{
    //app.stage.removeChild(a_titleContainer);
    this.alpha = 0.9;
    app.stage.addChild(a_project1Container);
}

function a_projectHoverOff()
{
    this.alpha = 0.8;
    app.stage.removeChild(a_project1Container);
}

//Agustin: edits to a_project1Select() and a_newPSelect() for small transformations
function a_project1Select()
{
    currentActivity = activityArray[2];
    moveLeftProjectSelection();
    setTimeout('updateActivity()', 200); 
}

function a_newPSelect()
{
    currentActivity = activityArray[3];
    moveLeftProjectSelection()
    setTimeout('updateActivity()', 200); 
}

//Agustin: Edit to move some elements. Some hexagons are not being altered at the moment
function moveLeftProjectSelection(){
    positionTransform(-1000, a_titleContainer.y, a_titleContainer, 10)
    positionTransform(-1000, a_settingsContainer.y, a_settingsContainer, 10)
    positionTransform(-1000, a_project1Container.y, a_project1Container, 10)
    positionTransform(-1000, maskContainer.y, maskContainer, 10)
    positionTransform(-1000, p1Hex.y, p1Hex, 10)
    positionTransform(-1000, p1_image.y, p1_image, 10)
    blurTransform(app.stage, 1.0, 10)
}
