var w;
var h;
var textboxes = [];
var editIcons = [];
var menu_x;
var menu_y;

function createUserSettings()
{
    w = app.screen.width;
    h = app.screen.height;
    menu_x = (w/2)-(0.5*h);
    menu_y = h/4;

    // Settings Menu

    let settingsMenu = new PIXI.Graphics();
        settingsMenu.lineStyle(5, 0x787878, 3);
        settingsMenu.beginFill(0x7D7D7D);
        settingsMenu.drawRoundedRect(menu_x,menu_y, h,h/2, 2);
        settingsMenu.endFill();
        settingsMenu.interactive = true;
    a_settingsContainer.addChild(settingsMenu);

    let settTitle = new PIXI.Text("Profile Settings", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
        settTitle.position.x = menu_x + 35;
        settTitle.position.y = menu_y + 20;
    a_settingsContainer.addChild(settTitle);
    

    var passwordString = "";
    for(var i = 0; i < userSettingsResponse.passwordLength; i++)
    {
        passwordString += "*";
    }

    a_addField("Name", userSettingsResponse.legalName, 1);
    a_addField("Institution", userSettingsResponse.institution, 2);
    a_addField("Username", userSettingsResponse.username, 3);
    a_addField("Password", passwordString, 4);
    a_addField("Email", userSettingsResponse.email, 5);



    // sign out button

    let signoutStyle = new PIXI.TextStyle({fill: "#000000", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 1.3});
    let signoutMetrics = PIXI.TextMetrics.measureText("Log Out", signoutStyle);
    let settSignout = new PIXI.Text("Log Out", signoutStyle);
    settSignout.position.x = menu_x + h - signoutMetrics.width - 40;
    settSignout.position.y = menu_y + h/2 - 50;

    let signoutButton = new PIXI.Graphics();
        signoutButton.beginFill(0xFFFFFF);
        signoutButton.drawRoundedRect(settSignout.x-20,settSignout.y-10, signoutMetrics.width+40,signoutMetrics.height+20, 2);
        signoutButton.endFill();
        signoutButton.buttonMode = true;
        signoutButton.interactive = true;
        signoutButton.on('mouseover', function(){ signoutButton.alpha = 0.3; });
        signoutButton.on('mouseout', function(){ signoutButton.alpha = 0; });
        signoutButton.on('pointerdown', function(){
            currentActivity = activityArray[0];
            updateActivity();
        });
        signoutButton.alpha = 0;
    a_settingsContainer.addChild(signoutButton);
    a_settingsContainer.addChild(settSignout);



    // close button

    var closeHighlight = new PIXI.Graphics();
        closeHighlight.beginFill(0xFFFFFF);
        closeHighlight.drawRoundedRect(menu_x+h-43,menu_y+10.5, 32,32, 1);
        closeHighlight.endFill();
        closeHighlight.buttonMode = true;
        closeHighlight.interactive = true;
        closeHighlight.on('mouseover', function(){ closeHighlight.alpha = 0.3; });
        closeHighlight.on('mouseout', function(){ closeHighlight.alpha = 0; });
        closeHighlight.on('pointerdown', function(){
            app.stage.removeChild(a_settingsContainer);
            blurTransform(a_titleContainer, 0.5 , 10)
            blurTransform(a_p1InfoContainer, 0.5, 10)
            blurTransform(maskContainer, 0.5, 10)
            blurTransform(p1_image, 0.5, 10)
            blurTransform(bgHexContainer, 0.5, 10)
        });
        closeHighlight.alpha = 0;
    a_settingsContainer.addChild(closeHighlight);

    var closeTexture = PIXI.Texture.from("Images/close-icon2.png");
    var closeIcon = new PIXI.Sprite(closeTexture);
        closeIcon.height = 26;
        closeIcon.width = 26;
        closeIcon.x = menu_x + h - 40; //w_settingsMenu right side - 10
        closeIcon.y = menu_y + 14;
    a_settingsContainer.addChild(closeIcon);




}

function a_addField(fieldName, fieldContent, fieldNo)
{
    let newField = new PIXI.Text(fieldName, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 2});        
    newField.position.x = menu_x + 35;
    newField.position.y = menu_y + 60 + fieldNo*40;
    a_settingsContainer.addChild(newField);

    let box = new PIXI.Graphics();
    box.beginFill(0xFFFFFF);
    box.drawRoundedRect(menu_x+220,newField.y-7, 220,34, 3);
    box.alpha = 0.2;
    a_settingsContainer.addChild(box);
    textboxes[fieldNo-1] = box;

    let fieldtxt = new PIXI.Text(fieldContent, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 16});
    fieldtxt.x = menu_x + 230;
    fieldtxt.y = newField.y;
    a_settingsContainer.addChild(fieldtxt);

    let editHighlight = new PIXI.Graphics();
    editHighlight.beginFill(0xFFFFFF);
    editHighlight.drawCircle(menu_x+462, newField.y+10, 15);
    editHighlight.endFill();
    editHighlight.alpha = 0;
    a_settingsContainer.addChild(editHighlight);

    let editIcon = new PIXI.Sprite.from("Images/edit-icon.png");
        editIcon.width = 30;
        editIcon.height = 30;
        editIcon.x = menu_x + 447;
        editIcon.y = newField.y - 5;
        editIcon.buttonMode = true;
        editIcon.interactive = true;
        editIcon.on('mouseover', function(){ editHighlight.alpha = 0.8; });
        editIcon.on('mouseout', function(){ editHighlight.alpha = 0; });
        editIcon.on('pointerdown', function(){ box.alpha = 0.2; });
    a_settingsContainer.addChild(editIcon);

    /*
    let fieldTextbox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '11pt',
            padding: '10px',
            width: '100px',
            color: '#FFFFFF',
            letterSpacing: 2
        }, 
        box: a_fieldTextbox(menu_x+200, newField.y, 220)
    });
    a_searchTextBox.x = menu_x + 205;
    a_searchTextBox.y = newField.y;
    a_searchTextBox.interactiveChildren = true;
    a_searchTextBox.placeholder = fieldContent;
    a_settingsContainer.addChild(fieldTextbox);
    */

}