var w;
var h;
var box;
var s_textboxes = [];
var corner_x;
var corner_y;
var s_fieldCount;
var s_container = new PIXI.Container();

function createSettings(title="Settings", container, fieldCount)
{
    s_container = container;
    this.fieldCount = fieldCount;

    w = app.screen.width;
    h = app.screen.height;
    corner_x = (w - 0.9*h)/2;
    corner_y = (h-150-fieldCount*40)/2;

    // Settings Menu

    let settingsMenu = new PIXI.Graphics();
        settingsMenu.lineStyle(5, 0x787878, 3);
        settingsMenu.beginFill(0x7D7D7D);
        settingsMenu.drawRoundedRect(corner_x,corner_y, 0.9*h,160+fieldCount*40, 2);
        settingsMenu.endFill();
        settingsMenu.interactive = true;
    container.addChild(settingsMenu);

    let settTitle = new PIXI.Text(title, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
        settTitle.position.x = corner_x + 35;
        settTitle.position.y = corner_y + 20;
    container.addChild(settTitle);



    // close button

    var closeHighlight = new PIXI.Graphics();
        closeHighlight.beginFill(0xFFFFFF);
        closeHighlight.drawRoundedRect(corner_x+0.9*h-43,corner_y+10.5, 32,32, 1);
        closeHighlight.endFill();
        closeHighlight.buttonMode = true;
        closeHighlight.interactive = true;
        closeHighlight.on('mouseover', function(){ closeHighlight.alpha = 0.3; });
        closeHighlight.on('mouseout', function(){ closeHighlight.alpha = 0; });
        closeHighlight.on('pointerdown', function(){
            app.stage.removeChild(container);
            app.stage.removeChild(tintBg);
            unblurBg();
        });
        closeHighlight.alpha = 0;
    container.addChild(closeHighlight);

    var closeTexture = PIXI.Texture.from("Images/close-icon2.png");
    var closeIcon = new PIXI.Sprite(closeTexture);
        closeIcon.height = 26;
        closeIcon.width = 26;
        closeIcon.x = corner_x + 0.9*h - 40;
        closeIcon.y = corner_y + 14;
    container.addChild(closeIcon);




}

function s_addField(fieldName, fieldContent, fieldNo, iconType=1)
{
    let addUserMode = false;
    var editMode = false;
    //var myBox;
    var fieldTextbox;
    var myPlaceholder = fieldContent;
    var myFiller = fieldContent;
    var textbox_x = corner_x + 240;
    if (iconType == 3) {
        textbox_x = corner_x + 465;
        myPlaceholder = "Search User";
        myFiller = "";
    }

    let newField = new PIXI.Text(fieldName, {fill: "#FFFFFF", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 2});        
        newField.position.x = corner_x + 35;
        newField.position.y = corner_y + 60 + fieldNo*40;
    s_container.addChild(newField);

    if (iconType == 3) {
        userText = new PIXI.Text(fieldContent, {fill: "#FFFFFF", fontFamily: "Helvetica", fontSize: 16});
        userText.x = corner_x + 250;
        userText.y = newField.y;
        s_container.addChild(userText);
    }

    fieldTextbox = new PIXI.TextInput({
        input: {
            fontFamily: 'Helvetica',
            fontSize: '12pt',
            padding: '10px',
            width: '220px',
            color: '#FFFFFF'
        }, 
        box: s_textbox(textbox_x, newField.y-7)
    });
    fieldTextbox.x = textbox_x;
    fieldTextbox.y = newField.y-7;
    fieldTextbox.interactiveChildren = true;
    fieldTextbox.placeholder = myPlaceholder;
    fieldTextbox.text = myFiller;
    s_container.addChild(fieldTextbox);
    editMode = false;
    //s_container.removeChild(myBox);
    s_textbox(0, -1);

    if (iconType == 3) {
        s_container.removeChild(fieldTextbox);
    }

    let editIcon = new PIXI.Sprite.from("Images/edit-icon.png");
    if (iconType>1) { editIcon = new PIXI.Sprite.from("Images/add-icon.png"); }
    editIcon.width = 30;
    editIcon.height = 30;
    editIcon.x = corner_x + 465;
    editIcon.y = newField.y - 5;
    editIcon.buttonMode = true;
    editIcon.interactive = true;
    editIcon.on('mouseover', function(){ editIcon.alpha = 0.8; });
    editIcon.on('mouseout', function(){ editIcon.alpha = 0.4; });
    editIcon.on('pointerdown', function(){
        if(iconType<3) {
            if (!editMode) {
                s_textbox(-1, 0);
                fieldTextbox.select();
                editMode = true;
            }
            else if (editMode) {
                s_textbox(0, -1);
                fieldTextbox.blur();
                editMode = false;
            }
        } else if(iconType==3) {
            if(!addUserMode) {
                s_textbox(-1, 0);
                editIcon.x = corner_x + 690;
                s_container.addChild(fieldTextbox);
                addUserMode = true;
            } else if (addUserMode) {
                s_textbox(0, -1);
                s_container.removeChild(editIcon);
                s_container.removeChild(fieldTextbox);
                s_addField("", fieldTextbox.text+ " (request sent)", fieldNo+1, 3);
                addUserMode = false;
            }
        }
    });
    editIcon.alpha = 0.4;
    s_container.addChild(editIcon);


}

function s_textbox(myX, myY)
{   
    if(myX<0) {
        myBox.alpha = 1;
        return;
    } else if (myY<0) {
        myBox.alpha = 0;
        return;
    }
    myBox = new PIXI.Graphics();
    myBox.beginFill(0xA0A0A0);
    myBox.drawRoundedRect(myX,myY, 220,34, 2);
    myBox.alpha = 0;
    s_container.addChild(myBox);

}

function s_addLogoutButton()
{
    // log out button

    let signoutStyle = new PIXI.TextStyle({fill: "#000000", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 1.3});
    let signoutMetrics = PIXI.TextMetrics.measureText("Log Out", signoutStyle);
    let settSignout = new PIXI.Text("Log Out", signoutStyle);
    settSignout.position.x = corner_x + 0.9*h - signoutMetrics.width - 40;
    settSignout.position.y = corner_y + 115 + this.fieldCount*40;

    let signoutButton = new PIXI.Graphics();
        signoutButton.beginFill(0xFFFFFF);
        signoutButton.drawRoundedRect(settSignout.x-20,settSignout.y-10, signoutMetrics.width+40,signoutMetrics.height+20, 2);
        signoutButton.endFill();
        signoutButton.buttonMode = true;
        signoutButton.interactive = true;
        signoutButton.on('mouseover', function(){ signoutButton.alpha = 0.5; });
        signoutButton.on('mouseout', function(){ signoutButton.alpha = 0; });
        signoutButton.on('pointerdown', function(){
            currentActivity = activityArray[0];
            updateActivity();
        });
        signoutButton.alpha = 0;
    s_container.addChild(signoutButton);
    s_container.addChild(settSignout);
}

function s_addSource()
{

}
