var w;
var h;
var box;
var textboxes = [];
var menu_x;
var menu_y;
var w_fieldCount;

function createProjectSettings(fc)
{
    w = app.screen.width;
    h = app.screen.height;
    menu_x = (w - 0.9*h)/2;
    menu_y = (h-150-fc*40)/2;

    // Settings Menu

    let settingsMenu = new PIXI.Graphics();
        settingsMenu.lineStyle(5, 0x787878, 3);
        settingsMenu.beginFill(0x7D7D7D);
        settingsMenu.drawRoundedRect(menu_x,menu_y, 0.9*h,150+fc*40, 2);
        settingsMenu.endFill();
        settingsMenu.interactive = true;
    w_settingsContainer.addChild(settingsMenu);

    let settTitle = new PIXI.Text("Project Settings", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
        settTitle.position.x = menu_x + 35;
        settTitle.position.y = menu_y + 20;
    w_settingsContainer.addChild(settTitle);

    w_addField("Project Name", "Ceramics 48032-23441", 1, false);
    w_addField("Microscope(s)", "JEOL JEM-ARM200CF", 2, true);
    w_addField("Institution(s)", "Lehigh University", 3, true);
    w_addField("Last Edited", "06/25/19  at  13:23", 4, false);




    // close button

    var closeHighlight = new PIXI.Graphics();
        closeHighlight.beginFill(0xFFFFFF);
        closeHighlight.drawRoundedRect(menu_x+0.9*h-43,menu_y+10.5, 32,32, 1);
        closeHighlight.endFill();
        closeHighlight.buttonMode = true;
        closeHighlight.interactive = true;
        closeHighlight.on('mouseover', function(){ closeHighlight.alpha = 0.3; });
        closeHighlight.on('mouseout', function(){ closeHighlight.alpha = 0; });
        closeHighlight.on('pointerdown', function(){
            app.stage.removeChild(w_settingsContainer);
            app.stage.removeChild(tintBg);
            unblurBg();
        });
        closeHighlight.alpha = 0;
    w_settingsContainer.addChild(closeHighlight);

    var closeTexture = PIXI.Texture.from("Images/close-icon2.png");
    var closeIcon = new PIXI.Sprite(closeTexture);
        closeIcon.height = 26;
        closeIcon.width = 26;
        closeIcon.x = menu_x + 0.9*h - 40; //w_settingsMenu right side - 10
        closeIcon.y = menu_y + 14;
    w_settingsContainer.addChild(closeIcon);




}

function w_addField(fieldName, fieldContent, fieldNo, addIcon)
{
    let newField = new PIXI.Text(fieldName, {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 2});        
    newField.position.x = menu_x + 35;
    newField.position.y = menu_y + 60 + fieldNo*40;
    w_settingsContainer.addChild(newField);

    let fieldtxt = new PIXI.Text(fieldContent, {fill: "#FFFFFF", fontFamily: "Helvetica", fontSize: 16});
        fieldtxt.x = menu_x + 250;
        fieldtxt.y = newField.y;
    w_settingsContainer.addChild(fieldtxt);

    let editIcon = new PIXI.Sprite.from("Images/edit-icon.png");
    if (addIcon) { editIcon = new PIXI.Sprite.from("Images/add-icon.png"); }
        editIcon.width = 30;
        editIcon.height = 30;
        editIcon.x = menu_x + 465;
        editIcon.y = newField.y - 5;
        editIcon.buttonMode = true;
        editIcon.interactive = true;
        editIcon.on('mouseover', function(){ editIcon.alpha = 0.8; });
        editIcon.on('mouseout', function(){ editIcon.alpha = 0.4; });
        editIcon.on('pointerdown', function(){
            w_settingsContainer.removeChild(fieldtxt);
            editMode(menu_x+240, newField.y-7, fieldContent);
        });
        editIcon.alpha = 0.4;
    w_settingsContainer.addChild(editIcon);


}

function editMode(myX, myY, myText)
{
    let fieldTextbox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '11pt',
            padding: '10px',
            width: '220px',
            color: '#000000'
        }, 
        box: w_textbox(myX, myY)
    });
    fieldTextbox.x = myX;
    fieldTextbox.y = myY;
    fieldTextbox.interactiveChildren = true;
    fieldTextbox.placeholder = myText;
    //fieldTextbox.on("keydown",keyDown);
    w_settingsContainer.addChild(fieldTextbox);
}

function w_textbox(myX, myY, myWidth)
{
    box = new PIXI.Graphics();
    box.beginFill(0xFFFFFF);
    box.drawRoundedRect(myX,myY, 220,34, 0);
    //box.alpha = 0.1;
    w_settingsContainer.addChild(box);
}

function w_addSource()
{

}