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
        settingsMenu.drawRoundedRect(corner_x,corner_y, 0.9*h,150+fieldCount*40, 2);
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

function s_addField(fieldName, fieldContent, fieldNo, addIcon=false)
{
    let newField = new PIXI.Text(fieldName, {fill: "#FFFFFF", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 2});        
    newField.position.x = corner_x + 35;
    newField.position.y = corner_y + 60 + fieldNo*40;
    s_container.addChild(newField);

    let fieldtxt = new PIXI.Text(fieldContent, {fill: "#FFFFFF", fontFamily: "Helvetica", fontSize: 16});
        fieldtxt.x = corner_x + 250;
        fieldtxt.y = newField.y;
    s_container.addChild(fieldtxt);

    let editIcon = new PIXI.Sprite.from("Images/edit-icon.png");
    if (addIcon) { editIcon = new PIXI.Sprite.from("Images/add-icon.png"); }
        editIcon.width = 30;
        editIcon.height = 30;
        editIcon.x = corner_x + 465;
        editIcon.y = newField.y - 5;
        editIcon.buttonMode = true;
        editIcon.interactive = true;
        editIcon.on('mouseover', function(){ editIcon.alpha = 0.8; });
        editIcon.on('mouseout', function(){ editIcon.alpha = 0.4; });
        editIcon.on('pointerdown', function(){
            s_container.removeChild(fieldtxt);
            s_editMode(corner_x+240, newField.y-7, fieldContent);
        });
        editIcon.alpha = 0.4;
    s_container.addChild(editIcon);


}

function s_editMode(myX, myY, myText)
{
    let fieldTextbox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '11pt',
            padding: '10px',
            width: '220px',
            color: '#000000'
        }, 
        box: s_textbox(myX, myY)
    });
    fieldTextbox.x = myX;
    fieldTextbox.y = myY;
    fieldTextbox.interactiveChildren = true;
    fieldTextbox.placeholder = myText;
    //fieldTextbox.on("keydown",keyDown);
    s_container.addChild(fieldTextbox);
}

function s_textbox(myX, myY)
{
    box = new PIXI.Graphics();
    box.beginFill(0xFFFFFF);
    box.drawRoundedRect(myX,myY, 220,34, 0);
    //box.alpha = 0.1;
    s_container.addChild(box);
}

function s_addLogoutButton()
{
    // log out button

    let signoutStyle = new PIXI.TextStyle({fill: "#000000", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 1.3});
    let signoutMetrics = PIXI.TextMetrics.measureText("Log Out", signoutStyle);
    let settSignout = new PIXI.Text("Log Out", signoutStyle);
    settSignout.position.x = corner_x + 0.9*h - signoutMetrics.width - 40;
    settSignout.position.y = corner_y + 100 + this.fieldCount*40;

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
    s_container.addChild(signoutButton);
    s_container.addChild(settSignout);
}

function s_addSource()
{

}