const a_style1 = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
const a_style2 = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 24, letterSpacing: 3});

var a_titleContainer = new PIXI.Container();
var a_settingsContainer = new PIXI.Container();
var a_settIconContainer = new PIXI.Container();
var a_p1Container = new PIXI.Container();
var a_p1InfoContainer = new PIXI.Container();
var maskContainer = new PIXI.Container();
var newProjectContainer = new PIXI.Container(); 

// misc
var hexSize;
var screenScale;
var a_settingsCC; // settings button counter (open/closed)
var p1_image;

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
    if ((app.screen.width)/(app.screen.height) > 5) // in case of multi touch screen in CITL
    {
        screenScale = 0.5;

        hexSize = (app.screen.height)/4; 
        a_settIconHexSize = (app.screen.height)/4;
        a_titleContainer.scale.x = a_titleContainer.scale.y = screenScale;
        bgHexContainer.scale.x = bgHexContainer.scale.y = screenScale;
        a_p1Container.scale.x = a_p1Container.scale.y = screenScale;
        newProjectContainer.scale.x = newProjectContainer.scale.y = screenScale;
    }
    else
    {
        screenScale = 1;
        hexSize = 80;
        a_settIconHexSize = 37;
    }

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

    a_drawHexGrid(); // false -> without coordinates


    // Title

    const title = new PIXI.Text('Select an Existing Project', a_style1);
    a_titleContainer.addChild(title);
  
    const subtitle = new PIXI.Text('or create a New Project to begin', a_style2);
          subtitle.position.y = 42;
    a_titleContainer.addChild(subtitle);
  
    a_titleContainer.x = app.screen.width/2 - a_titleContainer.width/2;
    a_titleContainer.y = 15;
  
    app.stage.addChild(a_titleContainer);



    // User Settings

    a_settingsCC = 0;

    let userSettingsHex = new Hexagon({x:57*screenScale, y:57*screenScale}, 0, a_settIconHexSize);
        userSettingsHex.graphics.lineStyle(2, 0x7D7D7D, 3);
        userSettingsHex.graphics.buttonMode = true;
        userSettingsHex.graphics.interactive = true;
        userSettingsHex.graphics.on('mouseover', a_hexHoverOver);
        userSettingsHex.graphics.on('mouseout', a_hexHoverOff);
        userSettingsHex.graphics.on('pointerdown', a_SettingsSelect);
        userSettingsHex.graphics.alpha = 0.7;
    userSettingsHex.draw(0xFFFFFF);

    let userSettingsIcon = new PIXI.Sprite.fromImage("Images/profilesettings.png");
        userSettingsIcon.width = 65*screenScale;
        userSettingsIcon.height = 60*screenScale;
        userSettingsIcon.position.x = (userSettingsHex.x-32)*screenScale;
        userSettingsIcon.position.y = (userSettingsHex.y-29)*screenScale;
    app.stage.addChild(userSettingsIcon);

    //app.stage.addChild(a_settIconContainer);




    // Settings Menu

    let w = window.innerWidth;
    let h = window.innerHeight;
    let settingsMenu = new PIXI.Graphics();
        settingsMenu.lineStyle(5, 0x787878, 3);
        settingsMenu.beginFill(0x7D7D7D);
        settingsMenu.drawRoundedRect(0.2*w,20, 0.6*w,h-40, 2);
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

    let settPassword = new PIXI.Text("Password:             " + userSettingsResponse.passwordLength /* Maybe with the length create a for loop that creates that many '*'s in a string for this field */, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
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

    let settEmail = new PIXI.Text("Email:                   jjk322@lehigh.edu", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
        settEmail.position.x = (w/5)+35;
        settEmail.position.y = 300;
    a_settingsContainer.addChild(settEmail);

    let signoutButton = new PIXI.Graphics();
        signoutButton.lineStyle(3, 0xA9A9A9, 3);
        signoutButton.beginFill(0xf0f0f0);
        signoutButton.drawRoundedRect(0.6*w,h-100, 0.15*w,30, 2);
        signoutButton.endFill();
        signoutButton.buttonMode = true;
        signoutButton.interactive = true;
        signoutButton.on('mouseover', a_SignOutHoverOver);
        signoutButton.on('mouseout', a_SignOutHoverOff);
        signoutButton.on('pointerdown', a_toLogin);
        signoutButton.alpha = 0.8;
    a_settingsContainer.addChild(signoutButton);

    let settSignout = new PIXI.Text("SIGN OUT", {fill: "#606060", fontFamily: "Helvetica", fontSize: 16, letterSpacing: 1.5});
        settSignout.position.x = w-(2*(w/5)) + 30;
        settSignout.position.y = h-95;
    a_settingsContainer.addChild(settSignout);

      // close button

    var closeTexture = PIXI.Texture.from("Images/cancel_icon.png");
    var closeIcon = new PIXI.Sprite(closeTexture);
        closeIcon.height = 30;
        closeIcon.width = 30;
        closeIcon.x = w-(w/5) - 40; //w_settingsMenu right side - 10
        closeIcon.y = 30;
        closeIcon.buttonMode = true;
        closeIcon.interactive = true;
        closeIcon.on('mouseover', a_hexHoverOver);
        closeIcon.on('mouseout', a_hexHoverOff);
        closeIcon.on('pointerdown', a_SettingsSelect);
        closeIcon.alpha = 0.60;
    a_settingsContainer.addChild(closeIcon);




    // Project 1

    p1_image = new PIXI.Sprite.fromImage("Images/LineIntegral.jpg");
    p1_image.width = 700;
    p1_image.height = 500;
    p1_image.position.x = 90;
    p1_image.position.y = 20;
    a_p1Container.addChild(p1_image);

    let p1A = new Hexagon({x: 476.12, y: initialHex.getCenterLowerRight(0).y}, 0,hexSize);
        p1A.graphics.alpha = 0.8;
        p1A.draw(0x909090);
    app.stage.removeChild(p1A.container);
    a_p1Container.addChild(p1A.container);

    var p1Hex = new PIXI.Graphics();
        p1Hex.beginFill(0x000000);
        p1Hex.drawPolygon([69.282,0, 138.564,40, 207.846,0, 277.128,40, 277.128,120, 207.846,160, 207.846,240, 138.564,280, 69.282,240, 69.282,160, 0,120, 0,40]);
        p1Hex.endFill();
        p1Hex.x = 198;
        p1Hex.y = p1A.y - 200;
    p1_image.mask = p1Hex;
    a_p1Container.addChild(p1Hex);

    let p1Info = new PIXI.Graphics();
        p1Info.beginFill(0x000000);
        p1Info.drawPolygon([69.282,0, 138.564,40, 207.846,0, 277.128,40, 277.128,120, 207.846,160, 207.846,240, 138.564,280, 69.282,240, 69.282,160, 0,120, 0,40]);
        p1Info.endFill();
        p1Info.x = p1Hex.x;
        p1Info.y = p1Hex.y;
        p1Info.alpha = 0.5;
    a_p1InfoContainer.addChild(p1Info);

    var p1HexOutline = new PIXI.Graphics();
        p1HexOutline.lineStyle(1.5, 0x909090, 1.5);
        p1HexOutline.drawPolygon([69.282,0, 138.564,40, 207.846,0, 277.128,40, 277.128,120, 346.41,160, 346.41,240, 277.128,280, 207.846,240, 138.564,280, 69.282,240, 69.282,160, 0,120, 0,40]);
        p1HexOutline.x = p1Hex.x;
        p1HexOutline.y = p1Hex.y;
    a_p1InfoContainer.addChild(p1HexOutline);

    let details = "Last Edited\n\n         Whitaker Laboratory\n         Lehigh University\n         06/25/19\n         13:23"
    let p1Details = new PIXI.Text(details, {fill: "#ffffff", fontFamily: "Arial", fontWeight: "bold", fontSize: 14, lineHeight: 20});
        p1Details.position.x = p1Hex.x + 50;
        p1Details.position.y = p1Hex.y + 60;
    a_p1InfoContainer.addChild(p1Details);

    let p1Title = new PIXI.Text("Project 1", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 1.5});
        p1Title.position.x = p1A.x - 42;
        p1Title.position.y = p1A.y - 32;
    a_p1Container.addChild(p1Title);

    let p1Select = new PIXI.Graphics();
        p1Select.beginFill(0xffffff);
        p1Select.drawRoundedRect(p1A.x-46,p1A.y+10, 92,22, 2);
        p1Select.endFill();
        p1Select.alpha = 0.75;
        p1Select.buttonMode = true;
        p1Select.interactive = true;
        p1Select.on('mouseover', a_p1SelectHoverOver);
        p1Select.on('mouseout', a_p1SelectHoverOff);
        p1Select.on('pointerdown', a_project1Select);
    //app.stage.addChild(p1Select);

    let p1SelectTitle = new PIXI.Text("Open", {fill: "#606060", fontFamily: "Arial", fontWeight: "bold", fontSize: 14, letterSpacing:1.5});
        p1SelectTitle.position.x = p1A.x-22;
        p1SelectTitle.position.y = p1A.y+11;
    p1Select.addChild(p1SelectTitle);

    app.stage.addChild(a_p1Container);
    a_p1Container.alpha = 0.8;
    a_p1Container.interactive = true;
    a_p1Container.on('mouseover', a_projectHoverOver);
    a_p1Container.on('mouseout', a_projectHoverOff);

    a_p1Container.addChild(p1Select);





    // New Project

    let newP = new Hexagon({x:p1A.getCenterUpperRight(279).x, y: p1A.getCenterUpperRight(0).y}, 0,hexSize);
        newP.graphics.lineStyle(3, 0xA9A9A9, 3);
        newP.graphics.buttonMode = true;
        newP.graphics.interactive = true;
        newP.graphics.on('mouseover', a_hexHoverOver);
        newP.graphics.on('mouseout', a_hexHoverOff);
        newP.graphics.on('pointerdown', a_newPSelect);
        newP.graphics.alpha = 0.8;
    newP.draw(0x909090);
    app.stage.removeChild(newP.container);
    newProjectContainer.addChild(newP.container);

    let plusIcon = new PIXI.Sprite.from("Images/plus-icon.png");
        plusIcon.width = 65;
        plusIcon.height = 65;
        plusIcon.position.x = newP.x-33;
        plusIcon.position.y = newP.y-33;
    newProjectContainer.addChild(plusIcon);

    app.stage.addChild(newProjectContainer);






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
        blurTransform(a_p1InfoContainer,1.0, 10)
        blurTransform(maskContainer,1.0, 10)
        blurTransform(p1_image,1.0, 10)
        blurTransform(bgHexContainer, 1.0, 5)
        a_settingsCC = 1;
    }
    else if (a_settingsCC == 1)
    {
        app.stage.removeChild(a_settingsContainer);
        blurTransform(a_titleContainer, 0.5 , 10)
        blurTransform(a_p1InfoContainer, 0.5, 10)
        blurTransform(maskContainer, 0.5, 10)
        blurTransform(p1_image, 0.5, 10)
        blurTransform(bgHexContainer, 0.5, 10)
        a_settingsCC = 0;
    }
}

function a_SignOutHoverOver()
{
    this.alpha = 1;
}

function a_SignOutHoverOff()
{
    this.alpha = 0.8;
}

function a_toLogin()
{
    currentActivity = activityArray[0];
}



function a_p1SelectHoverOver()
{
    this.alpha = 1;
    app.stage.addChild(a_p1InfoContainer);
}

function a_p1SelectHoverOff()
{
    this.alpha = 0.75;
}

function a_projectHoverOver()
{
    app.stage.addChild(a_p1InfoContainer);
}

function a_projectHoverOff()
{
    app.stage.removeChild(a_p1InfoContainer);
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
    positionTransform(-1000, a_p1InfoContainer.y, a_p1InfoContainer, 10)
    positionTransform(-1000, maskContainer.y, maskContainer, 10)
    positionTransform(-1000, a_p1Container.y, a_p1Container, 10)
    blurTransform(app.stage, 1.0, 10)
}
