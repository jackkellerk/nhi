var w_workWindow = new PIXI.Graphics();

var Acc; // window open counter
var w_menuCC; // main menu
var w_hideCC;

let w_tool1 = new PIXI.Graphics();
let w_tool2 = new PIXI.Graphics();
let w_tool3 = new PIXI.Graphics();
let w_tool4 = new PIXI.Graphics();

var window1Hex;
var window2Hex;
var window3Hex;
var window4Hex;

var tintBg = new PIXI.Graphics();

var w_titleContainer = new PIXI.Container(); // title container
var w_menuIconContainer = new PIXI.Container();
var w_menuContainer = new PIXI.Container(); // menu container
var w_windowContainer = new PIXI.Container(); // for image selection
var w_settingsContainer = new PIXI.Container(); // for settings menu
var w_Popup1Container = new PIXI.Container(); // for popup window
//var w_Popup2Container = new PIXI.Container(); // for popup window
//var w_Popup3Container = new PIXI.Container(); // for popup window
//var w_Popup4Container = new PIXI.Container(); // for popup window

// PIXI Text style
var w_style = {fontFamily: 'Arial', fontSize: 15, fill: 0x000000};


function startWindows(){

  var w = app.screen.width;
  var h = app.screen.height;

  
  // background from gradient texture

  const gradTexture = createGradTexture();

  const sprite = new PIXI.Sprite(gradTexture);
        sprite.width = app.screen.width;
        sprite.height = app.screen.height;
  app.stage.addChild(sprite);


  if (w/h > 5) // in case of multi touch screen in CITL
  {
    isTouch = true;
    hexSize = 27;
  } else {
    isTouch = false;
    hexSize = 80;
  }



  // fade/darken background

  // tintBg is a PIXI Graphic
  tintBg.beginFill(0x000000, 1); // Color and opacity
  tintBg.drawRect(0, 0, app.screen.width, app.screen.height);
  tintBg.endFill();
  tintBg.alpha = 0.7;
  tintBg.interactive = true;





  // menu button

  w_menuCC = 0;

  let menuButton = new Hexagon({x:57, y:57}, 0, 37);
      menuButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      menuButton.buttonMode = true;
  menuButton.draw(0xFFFFFF);
  app.stage.removeChild(menuButton.container);
  w_menuIconContainer.addChild(menuButton.container);

  let menuIcon = new PIXI.Sprite.from("Images/menu.png");
      menuIcon.width = 45;
      menuIcon.height = 37;
      menuIcon.buttonMode = true;
      menuIcon.position.x = 10;
      menuIcon.position.y = 20;
  menuButton.graphics.addChild(menuIcon);

  if (isTouch) {
    w_menuIconContainer.scale.x = w_menuIconContainer.scale.y = 0.5;
  }
  w_menuIconContainer.buttonMode = true;
  w_menuIconContainer.interactive = true;
  w_menuIconContainer.on('pointerdown', w_MenuSelect);
  app.stage.addChild(w_menuIconContainer);








  // save button

  // ask if user wants to exit project 

  let w_saveMenu = new PopupRect("Would you like to Save & Exit this Project? Would you? Would you?", "Save & Exit");
  w_saveMenu.graphics.lineStyle(5, 0xdddddd, 3);
  w_saveMenu.drawPopup();

  w_saveMenu.close.interactive = true;
  w_saveMenu.close.on('mouseover', function(){ w_saveMenu.close.alpha = 1; });
  w_saveMenu.close.on('mouseout', function(){ w_saveMenu.close.alpha = 0.8; });
  w_saveMenu.close.on('pointerdown', function(){
    app.stage.removeChild(w_saveMenu.container);
    w_menuCC = 1;
    w_MenuSelect();
  });

  w_saveMenu.leftButton.interactive = true;
  w_saveMenu.leftButton.on('mouseover', function(){ w_saveMenu.leftButton.alpha = 1; });
  w_saveMenu.leftButton.on('mouseout', function(){ w_saveMenu.leftButton.alpha = 0.7; });
  w_saveMenu.leftButton.on('pointerdown', function(){
    currentActivity = activityArray[1];
    alphaTransform(sprite, 0.0, 10);
    positionTransform(1000, -app.stage.y, app.stage, 12);
    updateActivity();
  });

  w_saveMenu.rightButton.interactive = true;
  w_saveMenu.rightButton.on('mouseover', function(){ w_saveMenu.rightButton.alpha = 1; });
  w_saveMenu.rightButton.on('mouseout', function(){ w_saveMenu.rightButton.alpha = 0.7; });
  w_saveMenu.rightButton.on('pointerdown', function(){
    app.stage.removeChild(w_saveMenu.container);
    w_menuCC = 1;
    w_MenuSelect();
  });

  w_saveMenu.container.cacheAsBitmap = true;
  //w_saveMenu.container.scale.set(0.5);

  if (isTouch) {
    w_saveMenu.container.scale.x = w_saveMenu.container.scale.y = 0.5;
    w_saveMenu.container.x = w_saveMenu.container.x + 300;
    w_saveMenu.container.y = w_saveMenu.container.y + 100;
  }

  var w_saveButton = new Hexagon({x:menuButton.getCenterRight(0).x, y:menuButton.getCenterRight(0).y}, 0, 37);
      w_saveButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      w_saveButton.graphics.buttonMode = true;
      w_saveButton.graphics.interactive = true;
      w_saveButton.graphics.on('mouseover', function(){ this.alpha = 1; });
      w_saveButton.graphics.on('mouseout', function(){ this.alpha = 0.8; });
      w_saveButton.graphics.on('pointerdown', function(){
        app.stage.addChild(tintBg);
        app.stage.addChild(w_saveMenu.container);
      });
  w_saveButton.draw(0xFFFFFF, 0.8);
  app.stage.removeChild(w_saveButton.container);

  let w_saveIcon = new PIXI.Sprite.from("Images/save-icon.png");
      w_saveIcon.width = 40;
      w_saveIcon.height = 40;
      w_saveIcon.position.x = 13;
      w_saveIcon.position.y = 17;
  w_saveButton.graphics.addChild(w_saveIcon);

  w_menuContainer.addChild(w_saveButton.container);

      



  // settings button

  var settingsButton = new Hexagon({x:w_saveButton.getCenterRight(0).x, y:w_saveButton.getCenterRight(0).y}, 0, 37);
      settingsButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      settingsButton.graphics.buttonMode = true;
      settingsButton.graphics.interactive = true;
      settingsButton.graphics.on('mouseover', function(){ this.alpha = 1; });
      settingsButton.graphics.on('mouseout', w_HoverOff);
      settingsButton.graphics.on('pointerdown', function(){
        app.stage.addChild(tintBg);
        app.stage.addChild(w_settingsContainer);
      });
  settingsButton.draw(0xFFFFFF, 0.8);
  app.stage.removeChild(settingsButton.container);
  
  const settingsIcon = new PIXI.Sprite.from("Images/settings.png");
        settingsIcon.width = 68;
        settingsIcon.height = 68;
        settingsIcon.position.x = -2;
        settingsIcon.position.y = 3;
  settingsButton.graphics.addChild(settingsIcon);

  w_menuContainer.addChild(settingsButton.container);





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

  // settings menu  close button 

  var settCloseImage = new PIXI.Sprite.from("Images/cancel_icon.png");
      settCloseImage.height = 30;
      settCloseImage.width = 30;
      settCloseImage.x = w-(w/5) - 40; //w_settingsMenu right side - 10
      settCloseImage.y = 30;
      settCloseImage.buttonMode = true;
      settCloseImage.interactive = true;
      settCloseImage.on('mouseover', w_HoverOver);
      settCloseImage.on('mouseout', w_HoverOff);
      settCloseImage.on('pointerdown', w_disableSettings);
      settCloseImage.alpha = 0.85;
  w_settingsContainer.addChild(settCloseImage);




  // Hide Menu Option

  w_hideCC = 0;

  var w_hideButton = new Hexagon({x:settingsButton.getCenterRight(0).x, y:settingsButton.getCenterRight(0).y}, 0, 37);
      w_hideButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      w_hideButton.graphics.buttonMode = true;
      w_hideButton.graphics.interactive = true;
      w_hideButton.graphics.on('mouseover', function(){ w_hideButton.graphics.alpha = 1; });
      w_hideButton.graphics.on('mouseout', w_HoverOff);
      w_hideButton.graphics.on('pointerdown', function(){
        app.stage.removeChild(w_windowContainer);
        w_menuCC = 0;
        app.stage.removeChild(w_menuContainer);
        w_hideCC = 1;
      });
      w_hideButton.draw(0xFFFFFF, 0.8);
  app.stage.removeChild(w_hideButton.container);

  let hideMenuLabel = new PIXI.Text("Hide\nMenu", {fontFamily: 'Arial', fontSize: 15, fill: 0x000000});
      hideMenuLabel.position.x = 14;
      hideMenuLabel.position.y = 19;
  w_hideButton.graphics.addChild(hideMenuLabel);

  w_menuContainer.addChild(w_hideButton.container);

  if (isTouch) {
    w_menuContainer.scale.x = w_menuContainer.scale.y = 0.5;
  }






  // Image Menu (Container)

  window1Hex = new Hexagon({x:50, y:200}, 0, 37);
      window1Hex.graphics.lineStyle(2, 0x7D7D7D, 3);
      window1Hex.graphics.buttonMode = true;
      window1Hex.graphics.interactive = true;
      window1Hex.graphics.on('mouseover', w_windowHoverOver);
      window1Hex.graphics.on('mouseout', w_windowHoverOff);
      window1Hex.graphics.on('pointerdown', w_WindowSelect);
      window1Hex.draw(0xFFFFFF);
  app.stage.removeChild(window1Hex.container);

  window1Label = new PIXI.Text("Window\n     1", w_style);
  window1Label.position.x = 6;
  window1Label.position.y = 22;
  window1Hex.graphics.addChild(window1Label);

  window2Hex = new Hexagon({x:window1Hex.x, y:window1Hex.getCenterLowerRight(0).y}, 0, 37);
    window2Hex.graphics.lineStyle(2, 0x7D7D7D, 3);
    window2Hex.graphics.buttonMode = true;
    window2Hex.graphics.interactive = true;
    window2Hex.graphics.on('mouseover', w_windowHoverOver);
    window2Hex.graphics.on('mouseout', w_windowHoverOff);
    window2Hex.graphics.on('pointerdown', w_WindowSelect);
  window2Hex.draw(0xFFFFFF);
  app.stage.removeChild(window2Hex.container);
  
  window2Label = new PIXI.Text("Window\n     2", w_style);
  window2Label.position.x = 6;
  window2Label.position.y = 22;
  window2Hex.graphics.addChild(window2Label);


  window3Hex = new Hexagon({x:window2Hex.x, y:window2Hex.getCenterLowerLeft(0).y}, 0, 37);
    window3Hex.graphics.lineStyle(2, 0x7D7D7D, 3);
    window3Hex.graphics.buttonMode = true;
    window3Hex.graphics.interactive = true;
    window3Hex.graphics.on('mouseover', w_windowHoverOver);
    window3Hex.graphics.on('mouseout', w_windowHoverOff);
    window3Hex.graphics.on('pointerdown', w_WindowSelect);
  window3Hex.draw(0xFFFFFF);
  app.stage.removeChild(window3Hex.container);

  window3Label = new PIXI.Text("Window\n     3", w_style);
  window3Label.position.x = 6;
  window3Label.position.y = 22;
  window3Hex.graphics.addChild(window3Label);


  window4Hex = new Hexagon({x:window3Hex.x, y:window3Hex.getCenterLowerRight(0).y}, 0, 37);
    window4Hex.graphics.lineStyle(2, 0x7D7D7D, 3);
    window4Hex.graphics.buttonMode = true;
    window4Hex.graphics.interactive = true;
    window4Hex.graphics.on('mouseover', w_windowHoverOver);
    window4Hex.graphics.on('mouseout', w_windowHoverOff);
    window4Hex.graphics.on('mousedown', w_WindowSelect);
    window4Hex.draw(0xFFFFFF);
  app.stage.removeChild(window4Hex.container);

  window4Label = new PIXI.Text("Window\n     4", w_style);
  window4Label.position.x = 6;
  window4Label.position.y = 22;
  window4Hex.graphics.addChild(window4Label);


  // add window icons in reverse order for descending overlapping

  w_windowContainer.addChild(window4Hex.container);
  w_windowContainer.addChild(window3Hex.container);
  w_windowContainer.addChild(window2Hex.container);
  //w_windowContainer.addChild(window1Hex.container);

  Acc = 1;
  if (isTouch) {
    w_windowContainer.scale.x = w_windowContainer.scale.y = 0.5;
  }
  app.stage.addChild(w_windowContainer);




  // Popup

  w_popupCC = 1;

  w = app.screen.width;
  h = app.screen.height;

  var createPositionX = (w*0.25-3);
  var createPositionY = 0;

  // set the initial coords for this window; these variables are in moveWindowAroundScreen.js
  xPositionWindow = createPositionX;
  yPositionWindow = createPositionY;

  // backdrop to tool buttons
  let a_backdrop = new PIXI.Graphics();
    a_backdrop.beginFill(0xdddddd);
    a_backdrop.drawRect(w/4-51,30, 62,188);
    a_backdrop.endFill();
  w_Popup1Container.addChild(a_backdrop);

  // w_tool1 is global var
    w_tool1.lineStyle(2, 0xdddddd, 2);
    w_tool1.beginFill(0xdcdcdc);
    w_tool1.drawRoundedRect(w/4-50,20, 60,50, 3);
    w_tool1.endFill();
    w_tool1.buttonMode = true;
    w_tool1.interactive = true;
    w_tool1.on('pointerdown', w_t1Select);
  w_Popup1Container.addChild(w_tool1);

  let zoomIcon = new PIXI.Sprite.from("Images/magnifying-glass.png");
    zoomIcon.width = 35;
    zoomIcon.height = 35;
    zoomIcon.position.x = w/4-43;
    zoomIcon.position.y = 28;
  w_tool1.addChild(zoomIcon);

  // w_tool2 is global var
    w_tool2.lineStyle(2, 0xdddddd, 2);
    w_tool2.beginFill(0xdcdcdc);
    w_tool2.drawRoundedRect(w/4-50,70, 60,50, 3);
    w_tool2.endFill();
    w_tool2.buttonMode = true;
    w_tool2.interactive = true;
    w_tool2.on('pointerdown', w_t2Select);
  w_Popup1Container.addChild(w_tool2);

  let spectrumIcon = new PIXI.Sprite.from("Images/color-wheel.png");
    spectrumIcon.width = 35;
    spectrumIcon.height = 35;
    spectrumIcon.position.x = w/4-43;
    spectrumIcon.position.y = 78;
  w_tool2.addChild(spectrumIcon);

  // w_tool3 is global var
    w_tool3.lineStyle(2, 0xdddddd, 2);
    w_tool3.beginFill(0xdcdcdc);
    w_tool3.drawRoundedRect(w/4-50,120, 60,50, 3);
    w_tool3.endFill();
    w_tool3.buttonMode = true;
    w_tool3.interactive = true;
    w_tool3.on('pointerdown', w_t3Select);
  w_Popup1Container.addChild(w_tool3);

  let multiblockIcon = new PIXI.Sprite.from("Images/multi-block-icon.png");
    multiblockIcon.width = 40;
    multiblockIcon.height = 40;
    multiblockIcon.position.x = w/4-46;
    multiblockIcon.position.y = 126;
  w_tool3.addChild(multiblockIcon);

  // w_tool4 is global var
    w_tool4.lineStyle(2, 0xdddddd, 2);
    w_tool4.beginFill(0xdcdcdc);
    w_tool4.drawRoundedRect(w/4-50,170, 60,50, 3);
    w_tool4.endFill();
    w_tool4.buttonMode = true;
    w_tool4.interactive = true;
    w_tool4.on('pointerdown', w_t4Select);
  w_Popup1Container.addChild(w_tool4);

  let lineintensityIcon = new PIXI.Sprite.from("Images/line-intensity.png");
      lineintensityIcon.width = 40;
      lineintensityIcon.height = 40;
      lineintensityIcon.position.x = w/4-44;
      lineintensityIcon.position.y = 175;
  w_tool4.addChild(lineintensityIcon);


  // This is the thing we click on to drag the window around the screen
  let windowBorder = new PIXI.Graphics();
      windowBorder.beginFill(0xdcdcdc);
      windowBorder.drawRoundedRect(createPositionX, createPositionY, w*0.70+10, w*0.4+25, 5);
      windowBorder.endFill();
      windowBorder.pivot.set(0,0);
      windowBorder.buttonMode = true;
      windowBorder.interactive = true;
      // events for drag start
      windowBorder.on('pointerdown', w_onDragStart)
                  .on('pointerdown', getMousePositionBeforeWindow) // This is in Multi-block coord system
                  .on('pointerup', w_onDragEnd)
                  .on('pointerup', getMousePositionAfterWindow)
                  .on('pointerupoutside', w_onDragEnd)
                  .on('pointermove', w_onDragMove)
                  .on('pointermove', updateMousePositionWindow);
  w_Popup1Container.addChild(windowBorder);



  let w_closeWindowMenu = new PopupRect("Would you like to Exit Window 1?", "Exit");
  w_closeWindowMenu.graphics.lineStyle(5, 0xdddddd, 3);
  w_closeWindowMenu.drawPopup(0x7f7f7f, 2);

  w_closeWindowMenu.close.interactive = true;
  w_closeWindowMenu.close.on('mouseover', function(){ w_closeWindowMenu.close.alpha = 0.7; });
  w_closeWindowMenu.close.on('mouseout', function(){ w_closeWindowMenu.close.alpha = 0.4; });
  w_closeWindowMenu.close.on('pointerdown', function(){
    app.stage.removeChild(w_closeWindowMenu.container);
  });

  w_closeWindowMenu.leftButton.interactive = true;
  w_closeWindowMenu.leftButton.on('mouseover', function(){ w_closeWindowMenu.leftButton.alpha = 1; });
  w_closeWindowMenu.leftButton.on('mouseout', function(){ w_closeWindowMenu.leftButton.alpha = 0.7; });
  w_closeWindowMenu.leftButton.on('pointerdown', function(){
    app.stage.removeChild(w_closeWindowMenu.container);
    app.stage.removeChild(w_Popup1Container);
    w_windowContainer.removeChild(window1Hex.container);
    Acc = 0;
  });

  w_closeWindowMenu.rightButton.interactive = true;
  w_closeWindowMenu.rightButton.on('mouseover', function(){ w_closeWindowMenu.rightButton.alpha = 1; });
  w_closeWindowMenu.rightButton.on('mouseout', function(){ w_closeWindowMenu.rightButton.alpha = 0.7; });
  w_closeWindowMenu.rightButton.on('pointerdown', function(){
    app.stage.removeChild(w_closeWindowMenu.container);
  });

  if (isTouch) {
    w_menuCloseContainer.scale.x = w_menuCloseContainer.scale.y = 0.5;
    w_menuCloseContainer.x = w_menuCloseContainer.x + 300;
    w_menuCloseContainer.y = w_menuCloseContainer.y + 100;
  }

   
  let w1_closeIcon = new PIXI.Sprite.from("Images/cancel-icon.png");
    w1_closeIcon.width = 24;
    w1_closeIcon.height = 24;
    w1_closeIcon.x = createPositionX + w*0.70 - 20;
    w1_closeIcon.y = createPositionY-2;
    w1_closeIcon.buttonMode = true;
    w1_closeIcon.interactive = true;
    w1_closeIcon.on('mouseover', function(){ w1_closeIcon.alpha = 1; });
    w1_closeIcon.on('mouseout', function(){ w1_closeIcon.alpha = 0.8; });
    w1_closeIcon.on('pointerdown', function(){
      app.stage.addChild(w_closeWindowMenu.container); 
    });
    w1_closeIcon.alpha = 0.8;
  w_Popup1Container.addChild(w1_closeIcon);
  
  let w1_minIcon = new PIXI.Sprite.from("Images/minimize-icon.png");
      w1_minIcon.width = 22;
      w1_minIcon.height = 20;
      w1_minIcon.x = createPositionX + w*0.70 - 47;
      w1_minIcon.y = createPositionY;
      w1_minIcon.buttonMode = true;
      w1_minIcon.interactive = true;
      w1_minIcon.on('mouseover', function(){ w1_minIcon.alpha = 1; });
      w1_minIcon.on('mouseout', function(){ w1_minIcon.alpha = 0.8; });
      w1_minIcon.on('pointerdown', w1_minimizeWindow);
      w1_minIcon.alpha = 0.8;
  w_Popup1Container.addChild(w1_minIcon);


  // w_workWindow is a PIXI Graphic
  w_workWindow.beginFill(0x000000);
  w_workWindow.drawPolygon([0,0, w*0.7-2,0, w*0.7-2,w*0.4-2, 0,w*0.4-2]);
  w_workWindow.endFill();
  //w_workWindow.anchor.set(0.5);
  w_workWindow.position.x = w*0.25;
  w_workWindow.position.y = 20;
  w_Popup1Container.addChild(w_workWindow);


  let w1_menuLabel = new PIXI.Text("Window 1",{fontFamily: 'Arial', fontSize: 15, fontType: 'bold', fill: 0x000000});
      w1_menuLabel.position.x = w_workWindow.x + 12;
      w1_menuLabel.position.y = w_workWindow.y - 19;
  w_Popup1Container.addChild(w1_menuLabel);

  if (isTouch) {
    w_Popup1Container.scale.x = w_Popup1Container.scale.y = 0.4;
  }

  app.stage.addChild(w_Popup1Container);











  blurTransform(app.stage, 0.5, 10);





  /* All tools are put into individual (labeled) global containers 
  upon their start function call. Then the containers are resized to fit the
  work window. (see below)
  The tool buttons attached to the work window add the specified container
  to the work window container upon click/touch. */

  // Low Spectrum Magnification Imaging
  LSMI();
  LSMIContainer.scale.x = LSMIContainer.scale.y = 0.7;
  LSMIContainer.position.x = app.screen.width*0.25;
  LSMIContainer.position.y = 20;

  // Multi-Spectrum Imaging
  startSpectrum()
  MSContainer.scale.x = MSContainer.scale.y = 0.9;
  MSContainer.position.x = app.screen.width*0.25;
  MSContainer.position.y = -93;

  // Multi-Block Analysis
  startMultiblock();
  //MBContainer.scale.x = MBContainer.scale.y = 0.72;
  //MBContainer.position.x = app.screen.width*0.25 - 5;
  //MBContainer.position.y = 20;

  // Line-Intensity Analysis
  LI_showAll(LIContainer);
  LIContainer.scale.x = LIContainer.scale.y = 0.75;
  LIContainer.position.x = app.screen.width*0.25;
  LIContainer.position.y = 20;


  // This is to set the position
  w_Popup1Container.position.set(0 - xPositionWindow, 0 - yPositionWindow);



  //manually triggers tool1 to be displayed from the start
  w_tool1.emit('pointerdown');

}


function w_HoverOver(event)
{
  data = event.data;
  this.alpha = 1;
}

function w_HoverOff(event)
{
  data = event.data;
  this.alpha = 0.80;
}

function w_disableSettings()
{
  app.stage.removeChild(tintBg);
  app.stage.removeChild(w_settingsContainer);
  w_menuCC = 1;
  w_MenuSelect();
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
    app.stage.addChild(tintBg);
    app.stage.removeChild(w_menuIconContainer);
    app.stage.addChild(w_menuIconContainer);
    app.stage.addChild(w_menuContainer);
    w_menuCC = 1;
  }
  else if (w_menuCC == 1)
  {
    app.stage.removeChild(tintBg);
    app.stage.removeChild(w_menuContainer);
    w_menuCC = 0;
  }
}

function w_windowHoverOver()
{
  this.x = this.x + 10;
}

function w_windowHoverOff()
{
  this.x = this.x - 10;
}

function w_WindowSelect()
{
  if (Acc == 0) {
    app.stage.addChild(w_Popup1Container);
    Acc = 1;
  }
  else if (Acc == 1)
  {
    app.stage.removeChild(w_Popup1Container);
    Acc = 0;
  }
}


function w_clearWindow()
{
  w_Popup1Container.removeChild(LSMIContainer);
  w_Popup1Container.removeChild(MSContainer);
  w_Popup1Container.removeChild(MBContainer);
  w_Popup1Container.removeChild(LIContainer);

  if (w_tool1.position.x < w_tool2.position.x) { 
    w_tool1.position.x = w_tool1.position.x + 5;
  } else if (w_tool2.position.x < w_tool3.position.x) {
    w_tool2.position.x = w_tool2.position.x + 5;
  } else if (w_tool3.position.x < w_tool4.position.x) {
    w_tool3.position.x = w_tool3.position.x + 5;
  } else if (w_tool4.position.x < w_tool1.position.x) {
    w_tool4.position.x = w_tool4.position.x + 5;
  }
}

function w1_minimizeWindow()
{
  app.stage.removeChild(w_Popup1Container);
  app.stage.removeChild(tintBg); 
  w_windowContainer.addChild(window1Hex.container);
  Acc = 0;
}


function w_t1Select()
{
  w_clearWindow();
  w_Popup1Container.addChild(LSMIContainer);
  LSMIContainer.mask = w_workWindow;

  w_tool1.position.x = w_tool1.position.x - 5;
  zoomIcon.position.x = zoomIcon.position.x - 5;
}

function w_t2Select()
{
  w_clearWindow();
  w_Popup1Container.addChild(MSContainer);
  MSContainer.mask = w_workWindow;

  w_tool2.position.x = w_tool2.position.x - 5;
  spectrumIcon.position.x = spectrumIcon.position.x - 5;
}

function w_t3Select()
{
  w_clearWindow();
  w_Popup1Container.addChild(MBContainer);
  MBContainer.mask = w_workWindow;

  w_tool3.position.x = w_tool4.position.x - 5;
  multiblockIcon.position.x = multiblockIcon.position.x -5;
}

function w_t4Select()
{
  w_clearWindow();
  w_Popup1Container.addChild(LIContainer);
  LIContainer.mask = w_workWindow;

  w_tool4.position.x = w_tool4.position.x - 5;
  lineintensityIcon.position.x = lineintensityIcon.position.x - 5;
}


function w_onDragStart(event)
{
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.parent.pivot.set(0,0);
  this.parent.position.set(0 - xPositionWindow, 0 - yPositionWindow);
  this.dragging = true;
}

function w_onDragEnd(event)
{
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function w_onDragMove(event)
{
  if (this.dragging)
  {
    /* var newPosition = this.data.getLocalPosition(this.parent);
    this.parent.x = newPosition.x;
    this.parent.y = newPosition.y; */

    // This ensures the image does not clip

    this.parent.x = 0 - xPositionWindow - deltaXWindow;

    this.parent.y = 0 - yPositionWindow - deltaYWindow;
  }
}