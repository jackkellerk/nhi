let a_titlestyle = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
let a_subtitlestyle = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 24, letterSpacing: 3});
const a_projecttitlestyle = new PIXI.TextStyle({fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 1.5});
const a_projectselectstyle = new PIXI.TextStyle({fill: "#000000", fontFamily: "Arial", fontWeight: "bold", fontSize: 14, letterSpacing:1.5});

var a_titleContainer = new PIXI.Container();
var a_settingsContainer = new PIXI.Container();
var a_settIconContainer = new PIXI.Container();
var a_p1Container = new PIXI.Container();
var a_p1InfoContainer = new PIXI.Container();
var maskContainer = new PIXI.Container();
var newProjectContainer = new PIXI.Container(); 
var a_searchContainer = new PIXI.Container();

var a_tintBg = new PIXI.Graphics();

// misc
var hexSize;
var p1_image;
var isTouch = false;

// user settings variable(s)
var userSettingsResponse; // valid uses of userSettingsResponse are: userSettingsResponse.legalName, userSettingsResponse.username, userSettingsResponse.passwordLength, userSettingsResponse.email, userSettingsResponse.profilePicture, userSettingsResponse.institution, and userSettingsResponse.id

function startAllProjects()
{
    gatherUserSettings();
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



    if ((app.screen.width)/(app.screen.height) > 5) // in case of multi touch screen in CITL
    {
        isTouch = true;
        hexSize = 27;

        a_p1Container.scale.x = a_p1Container.scale.y = 0.5;
        newProjectContainer.scale.x = newProjectContainer.scale.y = 0.5;
    }
    else
    {
        isTouch = false;
        hexSize = 80;
    }

    a_drawHexGrid(isTouch);


    // Title

    var spacing = 35; // spacing between title and subtitle
    if (isTouch) {
        a_titlestyle = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 16, letterSpacing: 2});
        a_subtitlestyle = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 12, letterSpacing: 2});
        spacing = 19;
    }

    let titletxt = "Select an Existing Project";
    let titleMetrics = PIXI.TextMetrics.measureText(titletxt, a_titlestyle);
    const title = new PIXI.Text(titletxt, a_titlestyle);
    title.position.x = (app.screen.width - titleMetrics.width)/2;
    title.position.y = app.screen.height/25;
    a_titleContainer.addChild(title);
  
    let subtitletxt = "or create a New Project to begin";
    let subtitleMetrics = PIXI.TextMetrics.measureText(subtitletxt, a_subtitlestyle);
    const subtitle = new PIXI.Text(subtitletxt, a_subtitlestyle);
          subtitle.position.x = (app.screen.width - subtitleMetrics.width)/2;
          subtitle.position.y = app.screen.height/25 + spacing;
    a_titleContainer.addChild(subtitle);
  
    app.stage.addChild(a_titleContainer);




    let w = window.innerWidth;
    let h = window.innerHeight;



    //Area where user types in their username    
    a_searchTextBox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '11pt',
            padding: '10px',
            width: '200px',
            color: '#FFFFFF',
            letterSpacing: 2
        }, 
        box: a_generateTextBox(w-250, 30, 220)
    });
    a_searchTextBox.x = w-250;
    a_searchTextBox.y = 27;
    a_searchTextBox.interactiveChildren = true;
    a_searchTextBox.placeholder = "Search Projects";
    a_searchContainer.addChild(a_searchTextBox);
    if (isTouch) {
        a_searchContainer.scale.x = a_searchContainer.scale.y = 0.7;
        a_searchContainer.x = a_searchContainer.x + 350;
    }
    app.stage.addChild(a_searchContainer);





    // User Settings

    let userSettingsCirlce = new PIXI.Graphics();
    userSettingsCirlce.beginFill(0xFFFFFF);
    userSettingsCirlce.drawCircle(57, 54, 22.5);
    userSettingsCirlce.endFill();
    userSettingsCirlce.alpha = 0.5;

    let userSettingsHex = new Hexagon({x:57, y:57}, 0, 37);
        userSettingsHex.graphics.lineStyle(1, 0xFFFFFF, 1);
        userSettingsHex.graphics.buttonMode = true;
        userSettingsHex.graphics.interactive = true;
        userSettingsHex.graphics.on('mouseover', function(){
            userSettingsCirlce.alpha = 0.7;
        });
        userSettingsHex.graphics.on('mouseout', function(){
            userSettingsCirlce.alpha = 0.5;
        });
        userSettingsHex.graphics.on('pointerdown', a_SettingsSelect);
    userSettingsHex.draw(0x000000);
    app.stage.removeChild(userSettingsHex.container);
    a_settIconContainer.addChild(userSettingsHex.container);

    a_settIconContainer.addChild(userSettingsCirlce);

    let userSettingsIcon = new PIXI.Sprite.fromImage("Images/profile-settings.png");
        userSettingsIcon.width = 47;
        userSettingsIcon.height = 47;
        userSettingsIcon.position.x = userSettingsHex.x-24;
        userSettingsIcon.position.y = userSettingsHex.y-26;
    a_settIconContainer.addChild(userSettingsIcon);

    if (isTouch) {
        a_settIconContainer.scale.x = a_settIconContainer.scale.y = 0.5;
    }
    app.stage.addChild(a_settIconContainer);



    // a_tintBg is a PIXI Graphic
    a_tintBg.beginFill(0x000000, 1); // Color and opacity
    a_tintBg.drawRect(0, 0, app.screen.width, app.screen.height);
    a_tintBg.endFill();
    a_tintBg.alpha = 0.7;
    a_tintBg.interactive = true;
    a_settingsContainer.addChild(a_tintBg);

    var passwordString = "";
    for(var i = 0; i < userSettingsResponse.password.length; i++)
    {
        passwordString += "*";
    }

    createSettings("User Settings", a_settingsContainer, 5);
    s_addField("Name", userSettingsResponse.legalname, 1);
    s_addField("Institution", userSettingsResponse.institution, 2, true);
    s_addField("Username", userSettingsResponse.username, 3);
    s_addField("Password", passwordString, 4);
    s_addField("Email", userSettingsResponse.email, 5);
    s_addLogoutButton();

    


    let project1 = new Project("AKT Ceramics", "Images/LineIntegral.jpg", 476.12, initialHex.getCenterLowerRight(0).y);
    // initial Hex is from a_drawHex.js
    project1.select.on('pointerdown', function(){
        currentActivity = activityArray[2];
        moveLeftProjectSelection();
        setTimeout('updateActivity()', 200); 
    });



    // New Project

    let newP = new Hexagon({x:project1.infoHex.getCenterUpperRight(279).x, y: project1.infoHex.getCenterUpperRight(0).y}, 0, 80);
        newP.graphics.lineStyle(3, 0x909090, 3);
        newP.graphics.buttonMode = true;
        newP.graphics.interactive = true;
        newP.graphics.on('mouseover', function(){ plusIcon.alpha = 0.8; });
        newP.graphics.on('mouseout', function(){ plusIcon.alpha = 0.6; });
        newP.graphics.on('pointerdown', a_newPSelect);
    newP.draw(0x909090, 0.8); // fill color + opacity/alpha
    app.stage.removeChild(newP.container);
    newProjectContainer.addChild(newP.container);

    let plusIcon = new PIXI.Sprite.from("Images/plus-icon.png");
    plusIcon.width = 65;
    plusIcon.height = 65;
    plusIcon.position.x = newP.x-33;
    plusIcon.position.y = newP.y-33;
    plusIcon.alpha = 0.6;
    newProjectContainer.addChild(plusIcon);

    if (isTouch) {
        newProjectContainer.scale.x = newProjectContainer.scale.y = 0.3375;
        newProjectContainer.x = newProjectContainer.x + 461;
        newProjectContainer.y = newProjectContainer.y + 86;
    }
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
    unblurBg();




}

function a_SettingsSelect()
{
    blurBg();
    app.stage.addChild(a_settingsContainer);
    /*
    blurTransform(a_titleContainer,1.0, 10)
    blurTransform(a_p1InfoContainer,1.0, 10)
    blurTransform(maskContainer,1.0, 10)
    blurTransform(p1_image,1.0, 10)
    */
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

function a_generateTextLine(x, y, w, lineWidth){
    let line = new PIXI.Graphics();
    line.lineStyle(lineWidth, 0xFFFFFF)
        .moveTo(x, y)
        .lineTo(x+w, y);
    a_searchContainer.addChild(line);
}

function a_generateTextBox(x, y, w)
{
    let box = new PIXI.Graphics();
    box.beginFill(0xFFFFFF);
    box.drawRoundedRect(x,y, w,34, 3);
    box.alpha = 0.2;

    let searchIcon = new PIXI.Sprite.from("Images/search-icon.png");
    searchIcon.height = 28;
    searchIcon.width = 28;
    searchIcon.x = x + w - 31;
    searchIcon.y = y + 2;
    box.addChild(searchIcon);

    a_searchContainer.addChild(box);
}


//Agustin: Edit to move some elements. Some hexagons are not being altered at the moment
function moveLeftProjectSelection(){
    positionTransform(-1000, a_titleContainer.y, a_titleContainer, 10)
    positionTransform(-1000, a_settingsContainer.y, a_settingsContainer, 10)
    //positionTransform(-1000, project1.container.y, project1.container, 10)
    //blurTransform(app.stage, 1.0, 10)
}
