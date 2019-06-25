
var menuCC; // main menu
var clickcounter; // image menu click counter
var settingsCC; // settings menu
var saveCC;

var showTitle; // title disappears after first interaction

var images = ["Images/LowMag.jpg", "Images/Multispectrum.jpg", "Images/Multiblock.jpg", "Images/LineIntegral.jpg"]; // array with images sources.. for now

var w_hexGridContainer = new PIXI.Container(); 
var w_titleContainer = new PIXI.Container(); // title container
var w_menuContainer = new PIXI.Container(); // menu container
var w_windowContainer = new PIXI.Container(); // for image selection
var w_settingsContainer = new PIXI.Container(); // for settings menu
var w_PopupContainer = new PIXI.Container(); // for popup window

// PIXI Text style
var w_style = {fontFamily: 'Arial', fontSize: 15, fill: 0x000000};


function startWindows(){

  
  // background from gradient texture

  const gradTexture = createGradTexture();

  const sprite = new PIXI.Sprite(gradTexture);
        sprite.width = app.screen.width;
        sprite.height = app.screen.height;
  app.stage.addChild(sprite);



  //  hexagon grid

  //drawHexGrid(true); // parameter indicates with/without coordinates


  
  // page title text

  const screenInfo = new PIXI.Text('Last Edit:     06/25/2019\n                   13:23', {fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 20, letterSpacing: 1.5});
  w_titleContainer.addChild(screenInfo);
  w_titleContainer.x = window.innerWidth - 300;
  w_titleContainer.y = 30;
  app.stage.addChild(w_titleContainer);





  // menu button

  menuCC == 0

  let menuButton = new Hexagon({x:50, y:55}, 0, 37);
    menuButton.graphics.lineStyle(2, 0x7D7D7D, 3);
    menuButton.graphics.interactive = true;
    menuButton.graphics.on('mouseover', a_hexHoverOver);
    menuButton.graphics.on('mouseout', a_hexHoverOff);
    menuButton.graphics.on('pointerdown', w_MenuSelect);
    menuButton.graphics.alpha = 0.8;
  menuButton.draw(0xFFFFFF);

  const menuIcon = new PIXI.Sprite.fromImage("Images/menu.png");
    menuIcon.width = 45;
    menuIcon.height = 37;
    menuIcon.position.x = 27.5;
    menuIcon.position.y = 38;
  app.stage.addChild(menuIcon);




  // save button

  var saveButton = new Hexagon({x:menuButton.getCenterRight(0).x, y:menuButton.getCenterRight(0).y}, 0, 37);
      saveButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      saveButton.graphics.interactive = true;
      saveButton.graphics.on('mouseover', a_hexHoverOver);
      saveButton.graphics.on('mouseout', a_hexHoverOff);
      saveButton.graphics.on('pointerdown', w_SaveSelect);
      saveButton.graphics.alpha = 0.8;
  saveButton.draw(0xFFFFFF);
  //app.stage.removeChild(saveButton.container);
  //w_menuContainer.addChild(saveButton.container);

  const saveIcon = new PIXI.Sprite.fromImage("Images/save-icon.png");
    saveIcon.width = 40;
    saveIcon.height = 40;
    saveIcon.position.x = 94;
    saveIcon.position.y = 35;
  app.stage.addChild(saveIcon);
  w_menuContainer.addChild(saveIcon);



  // settings button

  var settingsButton = new Hexagon({x:saveButton.getCenterRight(0).x, y:saveButton.getCenterRight(0).y}, 0, 37);
      settingsButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      settingsButton.graphics.interactive = true;
      settingsButton.graphics.on('mouseover', a_hexHoverOver);
      settingsButton.graphics.on('mouseout', a_hexHoverOff);
      settingsButton.graphics.on('pointerdown', w_SettingsSelect);
      settingsButton.graphics.alpha = 0.8;
  settingsButton.draw(0xFFFFFF);
  app.stage.removeChild(settingsButton.container);
  w_menuContainer.addChild(settingsButton.container);
  
  const settingsIcon = new PIXI.Sprite.fromImage("Images/settings.png");
    settingsIcon.width = 68;
    settingsIcon.height = 68;
    settingsIcon.position.x = 144;
    settingsIcon.position.y = 21;
  w_menuContainer.addChild(settingsIcon);

  let w = window.innerWidth;
  let h = window.innerHeight;
  let settingsMenu = new PIXI.Graphics();
  settingsMenu.lineStyle(5, 0x707070, 3);
  settingsMenu.beginFill(0x7D7D7D);
  settingsMenu.drawPolygon([w/5,20, w-(w/5),20, w-(w/5),h-20, w/5,h-20]);
  settingsMenu.endFill();
  w_settingsContainer.addChild(settingsMenu);

  let settTitle = new PIXI.Text("Project Settings", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
  settTitle.position.x = (w/5)+35;
  settTitle.position.y = 40;
  w_settingsContainer.addChild(settTitle);

  let settUsername = new PIXI.Text("Project Name:          Ceramics 48032-23441", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
  settUsername.position.x = (w/5)+35;
  settUsername.position.y = 140;
  w_settingsContainer.addChild(settUsername);

  let settPassword = new PIXI.Text("Microscope(s):      JEOL JEM-ARM200CF", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
  settPassword.position.x = (w/5)+35;
  settPassword.position.y = 180;
  w_settingsContainer.addChild(settPassword);

  let settInstitution = new PIXI.Text("Institution:             Lehigh University", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
  settInstitution.position.x = (w/5)+35;
  settInstitution.position.y = 220;
  w_settingsContainer.addChild(settInstitution);

  let settName = new PIXI.Text("Last Edited:               06/25/19 at 13:23", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
  settName.position.x = (w/5)+35;
  settName.position.y = 260;
  w_settingsContainer.addChild(settName);

  let editButton = new PIXI.Graphics();
  editButton.lineStyle(3, 0xA9A9A9, 3);
  editButton.beginFill(0xffffff);
  editButton.drawPolygon([(w/5)+35,h-100, w-(w/5+35),h-100, w-(w/5+35),h-70, (w/5)+35,h-70]);
  editButton.endFill();
  w_settingsContainer.addChild(editButton);

  let settEdit = new PIXI.Text("Edit", {fill: "#000000", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 4});
  settEdit.position.x = w/2-60;
  settEdit.position.y = h-96;
  w_settingsContainer.addChild(settEdit);

  

  // Hide Menu Option

  var hideButton = new Hexagon({x:settingsButton.getCenterRight(0).x, y:settingsButton.getCenterRight(0).y}, 0, 37);
      hideButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      hideButton.graphics.interactive = true;
      hideButton.graphics.on('mouseover', a_hexHoverOver);
      hideButton.graphics.on('mouseout', a_hexHoverOff);
      hideButton.graphics.on('pointerdown', w_HideSelect);
      hideButton.graphics.alpha = 0.8;
  hideButton.draw(0xFFFFFF);
  app.stage.removeChild(hideButton.container);
  w_menuContainer.addChild(hideButton.container);

  let menuLabel = new PIXI.Text("Hide\nMenu", w_style);
    menuLabel.position.x = 224;
    menuLabel.position.y = 36;
  w_menuContainer.addChild(menuLabel);


/*

  // Microscope Menu

  var micMenuHex = new makeTaskHex(36, 136, "microscope");
  const hexImg = new PIXI.Sprite.fromImage("Images/microscope.png");
    hexImg.width = 54;
    hexImg.height = 54;
    hexImg.position.x = 20.4;
    hexImg.position.y = 144.8;
    hexImg.alpha = 0.5;
  app.stage.addChild(hexImg);
  const plusIcon = new PIXI.Sprite.fromImage("Images/plus.png");
    plusIcon.width = 46;
    plusIcon.height = 46;
    plusIcon.position.x = 11;
    plusIcon.position.y = 153;
    plusIcon.alpha = 0.5;
  w_menuContainer.addChild(plusIcon);
*/


  // Image Menu (Container)

  var images = ["Images/LowMag.jpg", "Images/Multispectrum.jpg", "Images/Multiblock.jpg", "Images/LineIntegral.jpg"];

  var window1 = new Hexagon({x:50, y:200}, 0, 37);
      window1.graphics.lineStyle(2, 0x7D7D7D, 3);
      window1.graphics.interactive = true;
      window1.graphics.on('mouseover', a_hexHoverOver);
      window1.graphics.on('mouseout', a_hexHoverOff);
      window1.graphics.on('pointerdown', w_ImageSelect);
      window1.graphics.alpha = 0.8;
  window1.draw(0xFFFFFF);
  app.stage.removeChild(window1.container);
  w_windowContainer.addChild(window1.container);

  let window1Label = new PIXI.Text("Image\n    1", w_style);
      window1Label.position.x = window1.x - 21;
      window1Label.position.y = window1.y - 17;
  w_windowContainer.addChild(window1Label);


  var window2 = new Hexagon({x:window1.getCenterLowerRight(0).x, y:window1.getCenterLowerRight(0).y}, 0, 37);
      window2.graphics.lineStyle(2, 0x7D7D7D, 3);
      window2.graphics.interactive = true;
      window2.graphics.on('mouseover', a_hexHoverOver);
      window2.graphics.on('mouseout', a_hexHoverOff);
      window2.graphics.on('pointerdown', w_ImageSelect);
      window2.graphics.alpha = 0.8;
  window2.draw(0xFFFFFF);
  app.stage.removeChild(window2.container);
  w_windowContainer.addChild(window2.container);
  
  let window2Label = new PIXI.Text("Image\n    2", w_style);
      window2Label.position.x = window2.x - 21;
      window2Label.position.y = window2.y - 17;
  w_windowContainer.addChild(window2Label);


  var window3 = new Hexagon({x:window2.getCenterLowerLeft(0).x, y:window2.getCenterLowerLeft(0).y}, 0, 37);
      window3.graphics.lineStyle(2, 0x7D7D7D, 3);
      window3.graphics.interactive = true;
      window3.graphics.on('mouseover', a_hexHoverOver);
      window3.graphics.on('mouseout', a_hexHoverOff);
      window3.graphics.on('pointerdown', w_ImageSelect);
      window3.graphics.alpha = 0.8;
  window3.draw(0xFFFFFF);
  app.stage.removeChild(window3.container);
  w_windowContainer.addChild(window3.container);

  let window3Label = new PIXI.Text("Image\n    3", w_style);
      window3Label.position.x = window3.x - 21;
      window3Label.position.y = window3.y - 17;
  w_windowContainer.addChild(window3Label);


  var window4 = new Hexagon({x:window3.getCenterLowerRight(0).x, y:window3.getCenterLowerRight(0).y}, 0, 37);
      window4.graphics.lineStyle(2, 0x7D7D7D, 3);
      window4.graphics.interactive = true;
      window4.graphics.on('mouseover', a_hexHoverOver);
      window4.graphics.on('mouseout', a_hexHoverOff);
      window4.graphics.on('pointerdown', w_ImageSelect);
      window4.graphics.alpha = 0.8;
  window4.draw(0xFFFFFF);
  app.stage.removeChild(window4.container);
  w_windowContainer.addChild(window4.container);

  let window4Label = new PIXI.Text("Image\n    4", w_style);
      window4Label.position.x = window4.x - 21;
      window4Label.position.y = window4.y - 17;
  w_windowContainer.addChild(window4Label);

  app.stage.addChild(w_windowContainer);

  


  // POPUP WINDOW 

  // fade/darken background

  var bg = new PIXI.Graphics();
  bg.beginFill(0x000000, 1); // Color and opacity
  bg.drawRect(0, 0, app.screen.width, app.screen.height);
  bg.endFill();
  bg.alpha = 0.7;

  w_PopupContainer.addChild(bg);


  // close button

  var closeTexture = PIXI.Texture.fromImage("Images/cancel_icon.png");
  var closeImage = new PIXI.Sprite(closeTexture);
      closeImage.height = 30;
      closeImage.width = 30;
      closeImage.x = app.screen.width - 50;
      closeImage.y = 30;
      closeImage.buttonMode = true;
      closeImage.interactive = true;
      closeImage.on('mouseover', w_hoverCloseButton);
      closeImage.on('mouseout', w_hoverCloseButtonOff);
      closeImage.on('mousedown', w_disablePopup);
      closeImage.alpha = 0.7;
  w_PopupContainer.addChild(closeImage);


}


function w_hexHoverOver()
{
    this.alpha = 0.8;
}

function w_hexHoverOff()
{
    this.alpha = 0.6;
}


function w_MenuSelect()
{
  if (menuCC == 0)
  {
    app.stage.addChild(w_menuContainer);
    menuCC = 1;
  }
  else if (menuCC == 1)
  {
    app.stage.removeChild(w_menuContainer);
    menuCC = 0;
  }
}


function w_MenuSelect()
{
  if (menuCC == 0)
  {
      app.stage.addChild(w_menuContainer);
      menuCC = 1;
  }
  else if (menuCC == 1)
  {
      app.stage.removeChild(w_menuContainer);
      menuCC = 0;
  }
}

function w_SaveSelect()
{
  currentActivity = activityArray[2];
  updateActivity();
}

function w_SettingsSelect()
{
  if (settingsCC == 0)
  {
      app.stage.addChild(w_settingsContainer);
      settingsCC = 1;
  }
  else if (settingsCC == 1)
  {
      app.stage.removeChild(w_settingsContainer);
      settingsCC = 0;
  }
}

function w_HideSelect()
{
  app.stage.removeChild(w_imageContainer);
  menuCC = 0;
  app.stage.removeChild(w_menuContainer);
}

function w_ImageSelect()
{
  app.stage.removeChild(w_titleContainer); //if not removed already

  var PopupSprite = new PIXI.Sprite.fromImage(images[0]);
    PopupSprite.scale.set(0.9, 0.9);
    PopupSprite.x = 20;
    PopupSprite.width = app.screen.width * 0.9;
  w_PopupContainer.addChild(PopupSprite);

  app.stage.addChild(w_PopupContainer);
}


