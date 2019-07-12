
var renderer;

var w_menuCC; // main menu
var w_settingsCC; // settings menu
var w_hideCC;
var w_popup1CC;
var w_popup2CC;
var w_popup3CC;
var w_popup4CC;


var bg = new PIXI.Graphics();

var images = ["Images/LowMag.jpg", "Images/Multispectrum.jpg", "Images/Multiblock.jpg", "Images/LineIntegral.jpg"]; // array with images sources.. for now

var w_hexGridContainer = new PIXI.Container(); 
var w_titleContainer = new PIXI.Container(); // title container
var w_menuContainer = new PIXI.Container(); // menu container
var w_windowContainer = new PIXI.Container(); // for image selection
var w_settingsContainer = new PIXI.Container(); // for settings menu
var w_Popup1Container = new PIXI.Container(); // for popup window
var w_Popup2Container = new PIXI.Container(); // for popup window
var w_Popup3Container = new PIXI.Container(); // for popup window
var w_Popup4Container = new PIXI.Container(); // for popup window

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

  //dHexGrid(true); // parameter indicates with/without coordinates




  // for draggable windows

  renderer = PIXI.autoDetectRenderer(app.screen.width, app.screen.height);
	
	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);
	//renderer.view.style.position = "absolute";
	requestAnimationFrame( animate );


  
  // page title text

  const screenInfo = new PIXI.Text('Last Edit:     06/25/2019\n                   13:23', {fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 20, letterSpacing: 1.5});
  w_titleContainer.addChild(screenInfo);
  w_titleContainer.x = app.screen.width - 300;
  w_titleContainer.y = 30;
  app.stage.addChild(w_titleContainer);










  // menu button

  w_menuCC = 0;

  let menuButton = new Hexagon({x:50, y:55}, 0, 37);
      menuButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      menuButton.buttonMode = true;
      menuButton.graphics.interactive = true;
      menuButton.graphics.on('mouseover', w_hexHoverOver);
      menuButton.graphics.on('mouseout', w_hexHoverOff);
      menuButton.graphics.on('pointerdown', w_MenuSelect);
      menuButton.graphics.alpha = 0.8;
  menuButton.draw(0xFFFFFF);

  let menuIcon = new PIXI.Sprite.fromImage("Images/menu.png");
      menuIcon.width = 45;
      menuIcon.height = 37;
      menuIcon.position.x = 27.5;
      menuIcon.position.y = 38;
  app.stage.addChild(menuIcon);




  // save button

  var w_saveButton = new Hexagon({x:menuButton.getCenterRight(0).x, y:menuButton.getCenterRight(0).y}, 0, 37);
      w_saveButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      w_saveButton.graphics.interactive = true;
      w_saveButton.graphics.on('mouseover', w_hexHoverOver);
      w_saveButton.graphics.on('mouseout', w_hexHoverOff);
      w_saveButton.graphics.on('pointerdown', w_SaveSelect);
      w_saveButton.graphics.alpha = 0.95;
  w_saveButton.draw(0xFFFFFF);
  app.stage.removeChild(w_saveButton.container);
  w_menuContainer.addChild(w_saveButton.container);

  let w_saveIcon = new PIXI.Sprite.from("Images/save-icon.png");
      w_saveIcon.width = 40;
      w_saveIcon.height = 40;
      w_saveIcon.position.x = 94;
      w_saveIcon.position.y = 35;
  w_menuContainer.addChild(w_saveIcon);



  // settings button

  w_settingsCC = 0;

  var settingsButton = new Hexagon({x:w_saveButton.getCenterRight(0).x, y:w_saveButton.getCenterRight(0).y}, 0, 37);
      settingsButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      settingsButton.graphics.interactive = true;
      settingsButton.graphics.on('mouseover', w_hexHoverOver);
      settingsButton.graphics.on('mouseout', w_hexHoverOff);
      settingsButton.graphics.on('pointerdown', w_SettingsSelect);
      settingsButton.graphics.alpha = 0.95;
  settingsButton.draw(0xFFFFFF);
  app.stage.removeChild(settingsButton.container);
  w_menuContainer.addChild(settingsButton.container);
  
  const settingsIcon = new PIXI.Sprite.fromImage("Images/settings.png");
        settingsIcon.width = 68;
        settingsIcon.height = 68;
        settingsIcon.position.x = 144;
        settingsIcon.position.y = 21;
  w_menuContainer.addChild(settingsIcon);



  let w = app.screen.width;
  let h = app.screen.height;
  let w_settingsMenu = new PIXI.Graphics();
      w_settingsMenu.lineStyle(5, 0x707070, 3);
      w_settingsMenu.beginFill(0x7D7D7D);
      w_settingsMenu.drawPolygon([w/5,20, w-(w/5),20, w-(w/5),h-20, w/5,h-20]);
      w_settingsMenu.endFill();
      w_settingsMenu.interactive = true;
  w_settingsContainer.addChild(w_settingsMenu);

  let w_settTitle = new PIXI.Text("Project Settings", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 2});
      w_settTitle.position.x = (w/5)+35;
      w_settTitle.position.y = 40;
  w_settingsContainer.addChild(w_settTitle);

  let w_settUsername = new PIXI.Text("Project Name:          Ceramics 48032-23441", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 1.5});
      w_settUsername.position.x = (w/5)+35;
      w_settUsername.position.y = 140;
  w_settingsContainer.addChild(w_settUsername);

  let w_settPassword = new PIXI.Text("Microscope(s):         JEOL JEM-ARM200CF", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 1.5});
      w_settPassword.position.x = (w/5)+35;
      w_settPassword.position.y = 180;
  w_settingsContainer.addChild(w_settPassword);

  let w_settInstitution = new PIXI.Text("Institution:               Lehigh University", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 1.5});
      w_settInstitution.position.x = (w/5)+35;
      w_settInstitution.position.y = 220;
  w_settingsContainer.addChild(w_settInstitution);

  let w_settName = new PIXI.Text("Last Edited:             06/25/19  at  13:23", {fill: "#ffffff", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 1.5});
      w_settName.position.x = (w/5)+35;
      w_settName.position.y = 260;
  w_settingsContainer.addChild(w_settName);

  let w_editButton = new PIXI.Graphics();
      w_editButton.lineStyle(3, 0xA9A9A9, 3);
      w_editButton.beginFill(0xffffff);
      w_editButton.drawPolygon([(w/5)+35,h-100, w-(w/5+35),h-100, w-(w/5+35),h-70, (w/5)+35,h-70]);
      w_editButton.endFill();
  w_settingsContainer.addChild(w_editButton);

  let w_settEdit = new PIXI.Text("Edit", {fill: "#000000", fontFamily: "Helvetica", fontSize: 18, letterSpacing: 3});
      w_settEdit.position.x = w/2-30;
      w_settEdit.position.y = h-96;
  w_settingsContainer.addChild(w_settEdit);




  // Hide Menu Option

  w_hideCC = 0;

  var w_hideButton = new Hexagon({x:settingsButton.getCenterRight(0).x, y:settingsButton.getCenterRight(0).y}, 0, 37);
      w_hideButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      w_hideButton.graphics.interactive = true;
      w_hideButton.graphics.on('mouseover', w_hexHoverOver);
      w_hideButton.graphics.on('mouseout', w_hexHoverOff);
      w_hideButton.graphics.on('pointerdown', w_HideSelect);
      w_hideButton.graphics.alpha = 0.95;
      w_hideButton.draw(0xFFFFFF);
  app.stage.removeChild(w_hideButton.container);
  w_menuContainer.addChild(w_hideButton.container);

  let hideMenuLabel = new PIXI.Text("Hide\nMenu", {fontFamily: 'Arial', fontSize: 15, fill: 0x000000});
      hideMenuLabel.position.x = 224;
      hideMenuLabel.position.y = 36;
  w_menuContainer.addChild(hideMenuLabel);

  






  // Image Menu (Container)


  var window1 = new Hexagon({x:50, y:200}, 0, 37);
      window1.graphics.lineStyle(2, 0x7D7D7D, 3);
      window1.graphics.interactive = true;
      window1.graphics.on('mouseover', w_WindowHoverOver);
      window1.graphics.on('mouseout', w_WindowHoverOff);
      window1.graphics.on('pointerdown', w_WindowSelect);
      window1.graphics.alpha = 0.85;
      window1.cc = 0;
  window1.draw(0xFFFFFF);
  app.stage.removeChild(window1.container);

  let window1Label = new PIXI.Text("Window\n     1", w_style);
  window1Label.position.x = window1.x - 26;
  window1Label.position.y = window1.y - 15;


  var window2 = new Hexagon({x:window1.x, y:window1.getCenterLowerRight(0).y}, 0, 37);
      window2.graphics.lineStyle(2, 0x7D7D7D, 3);
      window2.graphics.interactive = true;
      window2.graphics.on('mouseover', w_WindowHoverOver);
      window2.graphics.on('mouseout', w_WindowHoverOff);
      window2.graphics.on('pointerdown', w_WindowSelect);
      window2.graphics.alpha = 0.85;
  window2.draw(0xFFFFFF);
  app.stage.removeChild(window2.container);
  
  let window2Label = new PIXI.Text("Window\n     2", w_style);
  window2Label.position.x = window2.x - 26;
  window2Label.position.y = window2.y - 15;



  var window3 = new Hexagon({x:window2.x, y:window2.getCenterLowerLeft(0).y}, 0, 37);
      window3.graphics.lineStyle(2, 0x7D7D7D, 3);
      window3.graphics.interactive = true;
      window3.graphics.on('mouseover', w_WindowHoverOver);
      window3.graphics.on('mouseout', w_WindowHoverOff);
      window3.graphics.on('pointerdown', w_WindowSelect);
      window3.graphics.alpha = 0.85;
  window3.draw(0xFFFFFF);
  app.stage.removeChild(window3.container);

  let window3Label = new PIXI.Text("Window\n     3", w_style);
  window3Label.position.x = window3.x - 26;
  window3Label.position.y = window3.y - 15;


  w_popup4CC = 0;

  var window4 = new Hexagon({x:window3.x, y:window3.getCenterLowerRight(0).y}, 0, 37);
      window4.graphics.lineStyle(2, 0x7D7D7D, 3);
      window4.graphics.interactive = true;
      window4.graphics.on('mouseover', w_WindowHoverOver);
      window4.graphics.on('mouseout', w_WindowHoverOff);
      window4.graphics.on('mousedown', w_WindowSelect);
      window4.graphics.alpha = 0.85;
  window4.draw(0xFFFFFF);
  app.stage.removeChild(window4.container);

  let window4Label = new PIXI.Text("Window\n     4", w_style);
  window4Label.position.x = window4.x - 26;
  window4Label.position.y = window4.y - 15;

  w_windowContainer.addChild(window4.container);
  w_windowContainer.addChild(window4Label);
  w_windowContainer.addChild(window3.container);
  w_windowContainer.addChild(window3Label);
  w_windowContainer.addChild(window2.container);
  w_windowContainer.addChild(window2Label);
  w_windowContainer.addChild(window1.container);
  w_windowContainer.addChild(window1Label);
  app.stage.addChild(w_windowContainer);


  
  // Popup

  w_popupCC = 0;
  
  // recall: w = app.screen.width; h = app.screen.height
  w = app.screen.width;
  h = app.screen.height

  let w_workWindow = new PIXI.Graphics();
      w_workWindow.lineStyle(5, 0x707070, 3);
      w_workWindow.beginFill(0x707070);
      w_workWindow.drawPolygon([0,-20, w*0.55,-20, w*0.55,w*0.3575, 0,w*0.3575]);
      w_workWindow.endFill();
      w_workWindow.beginFill(0x7F7F7F);
      w_workWindow.drawPolygon([0,0, w*0.55,0, w*0.55,w*0.3575, 0,w*0.3575]);
      w_workWindow.endFill();
      //w_workWindow.anchor.set(0.5);
      w_workWindow.position.x = w/4;
      w_workWindow.position.y = 20;
      w_workWindow.interactive = true;
      // events for drag start
      w_workWindow.on('mousedown', onDragStart);
      w_workWindow.on('touchstart', onDragStart)
      // events for drag end
      w_workWindow.on('mouseup', onDragEnd);
      w_workWindow.on('mouseupoutside', onDragEnd);
      w_workWindow.on('touchend', onDragEnd);
      w_workWindow.on('touchendoutside', onDragEnd);
      // events for drag move
      w_workWindow.on('mousemove', onDragMove);
      w_workWindow.on('touchmove', onDragMove);
  w_Popup1Container.addChild(w_workWindow);

  let w1_menuLabel = new PIXI.Text("Window 1",{fontFamily: 'Arial', fontSize: 15, fill: 0xffffff});
      w1_menuLabel.position.x = w_workWindow.x + 10;
      w1_menuLabel.position.y = w_workWindow.y - 19;
  w_Popup1Container.addChild(w1_menuLabel);

  let windowSettings = new PIXI.Sprite.fromImage('Images/window-settings.png');
      windowSettings.width = 28;
      windowSettings.height = 28;
      windowSettings.position.x = w*0.74;
      windowSettings.position.y = -3;
  w_Popup1Container.addChild(windowSettings);




  let w_activity1 = new PIXI.Graphics();
      w_activity1.lineStyle(5, 0x707070, 3);
      w_activity1.beginFill(0xdcdcdc);
      w_activity1.drawPolygon([w/4-70,20, w/4,20, w/4,90, w/4-70,90]);
      w_activity1.endFill();
      w_activity1.interactive = true;
      w_activity1.on('pointerdown', w_a1Select);
      w_activity1.alpha = 0.8;
  w_Popup1Container.addChild(w_activity1);

  let w_label1 = new PIXI.Text("Low\nMagnifi\ncation",{fontFamily: 'Arial', fontSize: 13, fill: 0x000000});
      w_label1.position.x = w/4-55;
      w_label1.position.y = 32;
  w_Popup1Container.addChild(w_label1);

  let w_activity2 = new PIXI.Graphics();
      w_activity2.lineStyle(5, 0x707070, 3);
      w_activity2.beginFill(0xdcdcdc);
      w_activity2.drawPolygon([w/4-70,90, w/4,90, w/4,160, w/4-70,160]);
      w_activity2.endFill();
      w_activity2.interactive = true;
      w_activity2.on('pointerdown', w_a2Select);
      w_activity2.alpha = 0.8;
  w_Popup1Container.addChild(w_activity2);

  let w_label2 = new PIXI.Text("Spectrum\n Imaging",{fontFamily: 'Arial', fontSize: 13, fill: 0x000000});
      w_label2.position.x = w/4-63;
      w_label2.position.y = 105;
  w_Popup1Container.addChild(w_label2);

  let w_activity3 = new PIXI.Graphics();
      w_activity3.lineStyle(5, 0x707070, 3);
      w_activity3.beginFill(0xdcdcdc);
      w_activity3.drawPolygon([w/4-70,160, w/4,160, w/4,230, w/4-70,230]);
      w_activity3.endFill();
      w_activity3.interactive = true;
      w_activity3.on('pointerdown', w_a3Select);
      w_activity3.alpha = 0.8;
  w_Popup1Container.addChild(w_activity3);

  let w_label3 = new PIXI.Text(" Grain\nBoundary",{fontFamily: 'Arial', fontSize: 13, fill: 0x000000});
      w_label3.position.x = w/4-63;
      w_label3.position.y = 175;
  w_Popup1Container.addChild(w_label3);

  let w_activity4 = new PIXI.Graphics();
      w_activity4.lineStyle(5, 0x707070, 3);
      w_activity4.beginFill(0xdcdcdc);
      w_activity4.drawPolygon([w/4-70,230, w/4,230, w/4,300, w/4-70,300]);
      w_activity4.endFill();
      w_activity4.interactive = true;
      w_activity4.on('pointerdown', w_a4Select);
      w_activity4.alpha = 0.8;
  w_Popup1Container.addChild(w_activity4);

  let w_label4 = new PIXI.Text(" Line\nIntegral",{fontFamily: 'Arial', fontSize: 13, fill: 0x000000});
      w_label4.position.x = w/4-60;
      w_label4.position.y = 245;
  w_Popup1Container.addChild(w_label4);

  app.stage.addChild(w_Popup1Container);






  // POPUP WINDOW 

  // fade/darken background

  //var bg = new PIXI.Graphics();
  bg.beginFill(0x000000, 1); // Color and opacity
  bg.drawRect(0, 0, app.screen.width, app.screen.height);
  bg.endFill();
  bg.alpha = 0.7;

  //w_Popup1Container.addChild(bg);


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
  //w_Popup1Container.addChild(closeImage);




}


function w_hexHoverOver()
{
  this.alpha = 0.1;
}

function w_hexHoverOff()
{
  this.alpha = 1;
}


function w_MenuSelect()
{
  if(w_hideCC == 1)
  {
    app.stage.addChild(w_windowContainer);
    w_hideCC = 0;
  }

  if (w_menuCC == 0)
  {
    app.stage.addChild(w_menuContainer);
    w_menuCC = 1;
  }
  else if (w_menuCC == 1)
  {
    app.stage.removeChild(w_menuContainer);
    w_menuCC = 0;
  }
}


function w_SaveSelect()
{
  currentActivity = activityArray[1];
  updateActivity();
}

function w_SettingsSelect()
{
  if (w_settingsCC == 0)
  {
    app.stage.addChild(w_settingsContainer);
    w_settingsCC = 1;
  }
  else if (w_settingsCC == 1)
  {
    app.stage.removeChild(w_settingsContainer);
    w_settingsCC = 0;
  }
}

function w_HideSelect()
{
  app.stage.removeChild(w_windowContainer);
  w_menuCC = 0;
  app.stage.removeChild(w_menuContainer);
  w_hideCC = 1;
}




function w_WindowHoverOver()
{
  this.alpha = 1;
}

function w_WindowHoverOff()
{
  if (this.cc == 0)
  {
    this.alpha = 0.85;
  }
}

function w_WindowSelect()
{
  if (w_popupCC == 0) {
    app.stage.addChild(w_Popup1Container);
    w_popupCC = 1;
    this.cc = 1;
    this.alpha = 1;
  }
  else if (w_popupCC == 1)
  {
    app.stage.removeChild(w_Popup1Container);
    w_popupCC = 0;
    this.cc = 0;
    //this.alpha = 0.85;
  }
}




function w_a1Select()
{
  this.alpha = 1;

  var PopupSprite = new PIXI.Sprite.fromImage(images[0]);
      PopupSprite.width = app.screen.width * 0.545;
      PopupSprite.height = PopupSprite.width * 0.645;
      PopupSprite.x = app.screen.width/4 + 3;
      PopupSprite.y = 23;
  w_Popup1Container.addChild(PopupSprite);
}

function w_a2Select()
{
  this.alpha = 1;

  var PopupSprite = new PIXI.Sprite.fromImage(images[1]);
      PopupSprite.width = app.screen.width * 0.545;
      PopupSprite.height = PopupSprite.width * 0.645;
      PopupSprite.x = app.screen.width/4 + 3;
      PopupSprite.y = 23;
  w_Popup1Container.addChild(PopupSprite);
}

function w_a3Select()
{
  this.alpha = 1;

  var PopupSprite = new PIXI.Sprite.fromImage(images[2]);
      PopupSprite.width = app.screen.width * 0.545;
      PopupSprite.height = PopupSprite.width * 0.645;
      PopupSprite.x = app.screen.width/4 + 3;
      PopupSprite.y = 23;
  w_Popup1Container.addChild(PopupSprite);
}

function w_a4Select()
{
  this.alpha = 1;

  var PopupSprite = new PIXI.Sprite.fromImage(images[3]);
      PopupSprite.width = app.screen.width * 0.545;
      PopupSprite.height = PopupSprite.width * 0.645;
      PopupSprite.x = app.screen.width/4 + 3;
      PopupSprite.y = 23;
  w_Popup1Container.addChild(PopupSprite);

}


function animate() {

  requestAnimationFrame( animate );

  // render the stage
  renderer.render(app.stage);
}

function onDragStart(event)
{
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;

  this.sx = this.data.getLocalPosition(w_Popup1Container).x;
  this.sy = this.data.getLocalPosition(w_Popup1Container).y;

}

function onDragEnd()
{
  this.alpha = 1;

  this.dragging = false;

  // set the interaction data to null
  this.data = null;
}

function onDragMove()
{

  if (this.dragging)
  {
    var newPosition = this.data.getLocalPosition(this.parent);
    w_Popup1Container.position.x = newPosition.x - this.sx;
    w_Popup1Container.position.y = newPosition.y - this.sy;
  }
/*
  if (this.dragging)
  {
    var newPosition = this.data.getLocalPosition(this.parent);
    w_Popup1Container.position.x = newPosition.x;
    w_Popup1Container.position.y = newPosition.y;
  }
*/
}

