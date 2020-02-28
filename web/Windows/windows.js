var menuButton;
var menuIcon;

var Acc; // window open counter
var w_menuCC; // main menu
var w_hideCC;

var tintBg = new PIXI.Graphics();
var w_menuIconContainer = new PIXI.Container();
var w_menuContainer = new PIXI.Container(); // menu container
var w_settingsContainer = new PIXI.Container(); // for settings menu
var windowHexes = new PIXI.Container(); 

// PIXI Text style
var w_style = {fontFamily: 'Arial', fontSize: 15, fill: 0xFFFFFF};

// starts window drawing process
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
  tintBg.beginFill(0x000000); // Color and opacity
  tintBg.drawRect(0, 0, app.screen.width, app.screen.height);
  tintBg.endFill();
  tintBg.alpha = 0.2;
  tintBg.interactive = true;
  tintBg.on('pointerdown', function(){
    w_menuCC = 1;
    w_MenuSelect();
  });






  // menu button

  w_menuCC = 0;

  menuButton = new Hexagon({x:55, y:55}, 0, 37);
      menuButton.graphics.lineStyle(1, 0xFFFFFF, 1);
      menuButton.graphics.buttonMode = true;
      menuButton.graphics.interactive = true;
      menuButton.graphics.on('pointerdown', w_MenuSelect);
  menuButton.draw(0x00000);

  menuIcon = new PIXI.Sprite.from("Images/menu.png");
  menuIcon.width = 48;
  menuIcon.height = 47;
  menuIcon.position.x = 8;
  menuIcon.position.y = 14;
  menuButton.container.addChild(menuIcon);

  app.stage.removeChild(menuButton.container); // add to stage after window container








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
    container = null;
    scene = null;
    camera = null;
    controls = null;
    renderer = null;
    angle = 0;
    radius = 500;
    canvas.remove();
    alphaTransform(sprite, 0.0, 10 )
    positionTransform(0, a_titleContainer.y, a_titleContainer, 10)
    positionTransform(0, a_settingsContainer.y, a_settingsContainer, 10)
    positionTransform(0, a_p1InfoContainer.y, a_p1InfoContainer, 10)
    positionTransform(0, maskContainer.y, maskContainer, 10)
    positionTransform(0, a_p1Container.y, a_p1Container, 10)
    positionTransform(-1000, app.stage.y, app.stage, 12)
    updateActivity();
  });

  w_saveMenu.rightButton.interactive = true;
  w_saveMenu.rightButton.on('mouseover', function(){ w_saveMenu.rightButton.alpha = 1; });
  w_saveMenu.rightButton.on('mouseout', function(){ w_saveMenu.rightButton.alpha = 0.7; });
  w_saveMenu.rightButton.on('pointerdown', function(){
    app.stage.removeChild(w_saveMenu.container);
    app.stage.removeChild(tintBg);
  });

  w_saveMenu.container.cacheAsBitmap = true;
  //w_saveMenu.container.scale.set(0.5);

  if (isTouch) {
    w_saveMenu.container.scale.x = w_saveMenu.container.scale.y = 0.5;
    w_saveMenu.container.x = w_saveMenu.container.x + 300;
    w_saveMenu.container.y = w_saveMenu.container.y + 100;
  }

  var w_saveButton = new Hexagon({x:menuButton.getCenterRight(3).x, y:menuButton.getCenterRight(3).y}, 0, 37);
      w_saveButton.graphics.buttonMode = true;
      w_saveButton.graphics.interactive = true;
      w_saveButton.graphics.on('mouseover', function(){ this.alpha = 1; });
      w_saveButton.graphics.on('mouseout', function(){ this.alpha = 0.9; });
      w_saveButton.graphics.on('pointerdown', function(){
        w_menuCC = 1;
        w_MenuSelect();
        app.stage.addChild(tintBg);
        app.stage.addChild(w_saveMenu.container);
      });
  w_saveButton.draw(0xFFFFFF, 0.9);
  app.stage.removeChild(w_saveButton.container);

  let w_saveIcon = new PIXI.Sprite.from("Images/save-icon.png");
      w_saveIcon.width = 40;
      w_saveIcon.height = 40;
      w_saveIcon.position.x = 13;
      w_saveIcon.position.y = 17;
  w_saveButton.graphics.addChild(w_saveIcon);

  w_menuContainer.addChild(w_saveButton.container);

      



  // settings button

  var settingsButton = new Hexagon({x:w_saveButton.getCenterRight(3).x, y:w_saveButton.getCenterRight(3).y}, 0, 37);
      settingsButton.graphics.buttonMode = true;
      settingsButton.graphics.interactive = true;
      settingsButton.graphics.on('mouseover', function(){ this.alpha = 1; });
      settingsButton.graphics.on('mouseout', function(){ this.alpha = 0.9; });
      settingsButton.graphics.on('pointerdown', function(){
        w_menuCC = 1;
        w_MenuSelect();
        blurBg();
        app.stage.addChild(tintBg);
        app.stage.addChild(w_settingsContainer);
      });
  settingsButton.draw(0xFFFFFF, 0.9);
  app.stage.removeChild(settingsButton.container);
  
  const settingsIcon = new PIXI.Sprite.from("Images/settings.png");
        settingsIcon.width = 68;
        settingsIcon.height = 68;
        settingsIcon.position.x = -2;
        settingsIcon.position.y = 3;
  settingsButton.graphics.addChild(settingsIcon);
  w_menuContainer.addChild(settingsButton.container);

  createSettings("Project Settings", w_settingsContainer, 5, 1);
  s_addField("Project Name", "Ceramics 48032-23441", 1, 1);
  s_addField("Microscope(s)", "JEOL JEM-ARM200CF", 2, 2);
  s_addField("Institution(s)", "Lehigh University", 3, 2);
  s_addField("Last Edited", "06/25/19  at  13:23", 4, 1);
  s_addField("Participants", "demo demo", 5, 3);




  // Hide Menu Option

  w_hideCC = 0;

  var w_hideButton = new Hexagon({x:settingsButton.getCenterRight(3).x, y:settingsButton.getCenterRight(3).y}, 0, 37);
      w_hideButton.graphics.buttonMode = true;
      w_hideButton.graphics.interactive = true;
      w_hideButton.graphics.on('mouseover', function(){ w_hideButton.graphics.alpha = 1; });
      w_hideButton.graphics.on('mouseout', function(){ w_hideButton.graphics.alpha = 0.9; });
      w_hideButton.graphics.on('pointerdown', function(){
        app.stage.removeChild(windowHexes);
        w_menuCC = 0;
        app.stage.removeChild(w_menuContainer);
        app.stage.removeChild(tintBg);
        w_hideCC = 1;
        menuButton.container.y = -52;
        unblurBg();
      });
      w_hideButton.draw(0xFFFFFF, 0.9);
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

  window1Hex = new Hexagon({x:menuButton.x, y:100}, 0, 37);
      window1Hex.graphics.lineStyle(1, 0xFFFFFF, 1);
      window1Hex.graphics.buttonMode = true;
      window1Hex.graphics.interactive = true;
      window1Hex.graphics.on('mouseover', function(){ this.alpha = 1; });
      window1Hex.graphics.on('mouseout', function(){ this.alpha = 0.9; });
      //window1Hex.graphics.on('pointerdown', w_WindowSelect);
      window1Hex.draw(0x000000, 0.9);
  app.stage.removeChild(window1Hex.container);

  window1Label = new PIXI.Text("Window\n     1", w_style);
  window1Label.position.x = 6;
  window1Label.position.y = 27;
  window1Hex.graphics.addChild(window1Label);

  window2Hex = new Hexagon({x:menuButton.x, y:window1Hex.y+45}, 0, 37);
    window2Hex.graphics.lineStyle(1, 0xFFFFFF, 1);
    window2Hex.graphics.buttonMode = true;
    window2Hex.graphics.interactive = true;
    window2Hex.graphics.on('mouseover', function(){ this.alpha = 1; });
    window2Hex.graphics.on('mouseout', function(){ this.alpha = 0.9;  });
    //window2Hex.graphics.on('pointerdown', w_WindowSelect);
  window2Hex.draw(0x000000, 0.9);
  app.stage.removeChild(window2Hex.container);
  
  window2Label = new PIXI.Text("Window\n     2", w_style);
  window2Label.position.x = 6;
  window2Label.position.y = 27;
  window2Hex.graphics.addChild(window2Label);


  window3Hex = new Hexagon({x:menuButton.x, y:window2Hex.y+22}, 0, 37);
    window3Hex.graphics.lineStyle(1, 0xFFFFFF, 1);
    window3Hex.graphics.buttonMode = true;
    window3Hex.graphics.interactive = true;
    window3Hex.graphics.on('mouseover', function(){ this.y += 13; });
    window3Hex.graphics.on('mouseout', function(){ this.y -= 13; });
  window3Hex.draw(0x000000);
  app.stage.removeChild(window3Hex.container);

  window3Label = new PIXI.Text("Window\n     3", w_style);
  window3Label.position.x = 6;
  window3Label.position.y = 27;
  window3Hex.graphics.addChild(window3Label);


  window4Hex = new Hexagon({x:menuButton.x, y:window3Hex.y+22}, 0, 37);
    window4Hex.graphics.lineStyle(1, 0xFFFFFF, 1);
    window4Hex.graphics.buttonMode = true;
    window4Hex.graphics.interactive = true;
    window4Hex.graphics.on('mouseover', function(){ this.y += 13; });
    window4Hex.graphics.on('mouseout', function(){ this.y -= 13; });
    window4Hex.draw(0x000000);
  app.stage.removeChild(window4Hex.container);

  window4Label = new PIXI.Text("Window\n     4", w_style);
  window4Label.position.x = 6;
  window4Label.position.y = 27;
  window4Hex.graphics.addChild(window4Label);


  // add window icons in reverse order for descending overlapping

  //windowHexes.addChild(window4Hex.container);
  //windowHexes.addChild(window3Hex.container);
  windowHexes.addChild(window2Hex.container);
  windowHexes.addChild(window1Hex.container);

  window2Hex.visible = false;
  window1Hex.visible = false;

  Acc = 1;
  if (isTouch) {
    windowHexes.scale.x = windowHexes.scale.y = 0.5;
  }
  app.stage.addChild(windowHexes);
  app.stage.addChild(menuButton.container);



  // blurTransform(app.stage, 0.5, 10);



  // ------------------------------------- Window 1 -----------------------------------------
  var window1 = new WorkWindow("Window 1", 0, 0, "Images/sinteredMetal.png");

  window1.container.interactive = true;
  window1.container.on('pointerdown', function(){
    if (!window1.inFront) {
      app.stage.removeChild(window1.container);
      app.stage.addChild(window1.container);
      window1.inFront = true;
      window2.inFront = false;
    }});
  window1.drawWindow(0xDCDCDC, "Images/sinteredMetal.png");
  window1.windowBorder.interactive = true;
  window1.windowBorder.on('pointerdown', onDragStart)
    .on('pointerdown', getMousePositionBeforeWindow) // This is in Multi-block coord system
    .on('pointerup', onDragEnd)
    .on('pointerup', getMousePositionAfterWindow)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
    .on('pointermove', updateMousePositionWindow);

  window1.tool1.interactive = true;
  window1.tool1.on('pointerdown', function(){
    window1.clearWindow(window1);
    window1.multiBlockObject.UIBool(true); // Enable Multi-Block UI
    window1.spectrumObject.UIBool(false); // Disable Multispectrum
    window1.zoomObject.UIBool(false);
    window1.lineObject.UIBool(false);
    //window1.threeJS.UIBool(false); // Disable ThreeJS
    window1.tool1.x += 5;
  });


  window1.tool2.interactive = true;
  window1.tool2.on('pointerdown', function(){
    window1.clearWindow(window1);
    window1.multiBlockObject.UIBool(false); // Disable Multi-Block UI
    window1.spectrumObject.UIBool(true); // Enable Multispectrum
    window1.zoomObject.UIBool(false);
    window1.lineObject.UIBool(false);
    //window1.threeJS.UIBool(false); // Disable ThreeJS
    window1.tool2.x += 5;
  });
  

  window1.tool3.interactive = true;
  window1.tool3.on('pointerdown', function(){
    window1.clearWindow(window1);
    window1.multiBlockObject.UIBool(false);
    window1.spectrumObject.UIBool(false);
    window1.zoomObject.UIBool(true);
    window1.lineObject.UIBool(false);
    //window1.container.addChild(window1.MBContainer);
    //MBContainer.mask = window1.windowRect;
    window1.tool3.x += 5;
  });

  window1.tool4.interactive = true;
  window1.tool4.on('pointerdown', function(){
    window1.clearWindow(window1);
    window1.multiBlockObject.UIBool(false);
    window1.spectrumObject.UIBool(false);
    window1.zoomObject.UIBool(false);
    window1.lineObject.UIBool(true);
    // window1.container.addChild(window1.LIContainer);
    // window1.LIContainer.mask = window1.windowRect;
    window1.tool4.x += 5;
  });

  window1.closeWindowMenu.close.interactive = true;
  window1.closeWindowMenu.close.on('mouseover', function(){ window1.closeWindowMenu.close.alpha = 0.7; });
  window1.closeWindowMenu.close.on('mouseout', function(){ window1.closeWindowMenu.close.alpha = 0.4; });
  window1.closeWindowMenu.close.on('pointerdown', function(){
    app.stage.removeChild(window1.closeWindowMenu.container);
  });

  window1.closeWindowMenu.leftButton.interactive = true;
  window1.closeWindowMenu.leftButton.on('mouseover', function(){ window1.closeWindowMenu.leftButton.alpha = 1; });
  window1.closeWindowMenu.leftButton.on('mouseout', function(){ window1.closeWindowMenu.leftButton.alpha = 0.7; });
  window1.closeWindowMenu.leftButton.on('pointerdown', function(){
    app.stage.removeChild(window1.closeWindowMenu.container);
    app.stage.removeChild(window1.container);
    windowHexes.removeChild(window1Hex.container);
    Acc = 0;
  });

  window1.closeWindowMenu.rightButton.interactive = true;
  window1.closeWindowMenu.rightButton.on('mouseover', function(){ window1.closeWindowMenu.rightButton.alpha = 1; });
  window1.closeWindowMenu.rightButton.on('mouseout', function(){ window1.closeWindowMenu.rightButton.alpha = 0.7; });
  window1.closeWindowMenu.rightButton.on('pointerdown', function(){
    app.stage.removeChild(window1.closeWindowMenu.container);
  });

  window1.closeIcon.interactive = true;
  window1.closeIcon.on('mouseover', function(){ window1.closeIcon.alpha = 1; });
  window1.closeIcon.on('mouseout', function(){ window1.closeIcon.alpha = 0.8; });
  window1.closeIcon.on('pointerdown', function(){
    app.stage.addChild(window1.closeWindowMenu.container); 
  });

  window1.minIcon.interactive = true;
  window1.minIcon.on('mouseover', function(){ window1.minIcon.alpha = 1; });
  window1.minIcon.on('mouseout', function(){ window1.minIcon.alpha = 0.8; });
  window1.minIcon.on('pointerdown', function(){
    window1.isOpen = false;
    app.stage.removeChild(window1.container);
    app.stage.removeChild(tintBg); 
    window1Hex.visible = true;
    app.stage.addChild(menuButton.container);
  });

  //manually triggers tool1 to be displayed from the start
  window1.tool1.emit('pointerdown');

  window1Hex.graphics.on('pointerdown', function(){
    window1.isOpen = true;
    app.stage.addChild(window1.container);
    window1Hex.visible = false;
  });

  window1.multiBlockObject.UIBool(false); // Disable Multi-Block UI initially so that ThreeJS is infront right now
}

// menu select function. different functionality based on "hide menu" value etc. darkens bg with tingBg sprite
function w_MenuSelect()
{
  if(w_hideCC == 1)
  {
    app.stage.addChild(window2Hex.container);
    unblurBg();
    w_hideCC = 0;
    menuButton.container.y = 18;
  }

  if (w_menuCC == 0)
  {
    app.stage.removeChild(menuButton.container);
    blurBg();
    app.stage.addChild(tintBg);
    app.stage.addChild(menuButton.container);
    app.stage.addChild(w_menuContainer);
    w_menuCC = 1;
  }
  else if (w_menuCC == 1)
  {
    app.stage.removeChild(tintBg);
    app.stage.removeChild(w_menuContainer);
    w_menuCC = 0;
    unblurBg();
  }
}

// function called when window hex is selected. opens specified window
function w_WindowSelect(window, windowHex)
{
  app.stage.addChild(window.container);
  window.isOpen = true;
  windowHexes.removeChild(windowHex.container);
}


function blurBg()
{
  for (var i=0; i<app.stage.children.length; i++){
    //blurTransform(app.stage.getChildAt(i), 1.0, 10);
  }
}

function unblurBg()
{
  for (var i=0; i<app.stage.children.length; i++){
    //blurTransform(app.stage.getChildAt(i), 0.5, 10);
  }
}
