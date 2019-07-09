
var renderer;

var w_workWindow = new PIXI.Graphics();
var LISprite = new PIXI.Sprite();

var Acc;
var w_menuCC; // main menu
var w_hideCC;

var window1Label = new PIXI.Text();
var window2Label = new PIXI.Text();
var window3Label = new PIXI.Text();
var window4Label = new PIXI.Text();

var tintBg = new PIXI.Graphics();

var w_titleContainer = new PIXI.Container(); // title container
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

  
  // background from gradient texture

  const gradTexture = createGradTexture();

  const sprite = new PIXI.Sprite(gradTexture);
        sprite.width = app.screen.width;
        sprite.height = app.screen.height;
  app.stage.addChild(sprite);



  //  hexagon grid

  //dHexGrid(true); // parameter indicates with/without coordinates



  // for draggable windows

  //renderer = PIXI.autoDetectRenderer(app.screen.width, app.screen.height);

  // add the renderer view element to the DOM
  //document.body.appendChild(renderer.view);
  //renderer.view.style.position = "absolute";
  //requestAnimationFrame( w_animate );


  
  // page title text

  const screenInfo = new PIXI.Text('Last Edit:     06/25/2019\n                   13:23', {fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 20, letterSpacing: 1.5});
  w_titleContainer.addChild(screenInfo);
  w_titleContainer.x = app.screen.width - 300;
  w_titleContainer.y = 30;
  //app.stage.addChild(w_titleContainer);










  // menu button

  w_menuCC = 0;

  let menuButton = new Hexagon({x:50, y:55}, 0, 37);
      menuButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      menuButton.buttonMode = true;
      menuButton.graphics.interactive = true;
      menuButton.graphics.on('pointerdown', w_MenuSelect);
  menuButton.draw(0xFFFFFF);

  let menuIcon = new PIXI.Sprite.from("Images/menu.png");
      menuIcon.width = 45;
      menuIcon.height = 37;
      menuIcon.buttonMode = true;
      menuIcon.position.x = 27.5;
      menuIcon.position.y = 38;
  app.stage.addChild(menuIcon);



  // save button

  var w_saveButton = new Hexagon({x:menuButton.getCenterRight(0).x, y:menuButton.getCenterRight(0).y}, 0, 37);
      w_saveButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      w_saveButton.buttonMode = true;
      w_saveButton.graphics.interactive = true;
      w_saveButton.graphics.on('mouseover', function(){ this.alpha = 1; });
      w_saveButton.graphics.on('mouseout', function(){ this.alpha = 0.8; });
      w_saveButton.graphics.on('pointerdown', function(){ 
        currentActivity = activityArray[1];
        updateActivity();
      });
      w_saveButton.graphics.alpha = 0.80;
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

  var settingsButton = new Hexagon({x:w_saveButton.getCenterRight(0).x, y:w_saveButton.getCenterRight(0).y}, 0, 37);
      settingsButton.graphics.lineStyle(2, 0x7D7D7D, 3);
      settingsButton.graphics.interactive = true;
      settingsButton.graphics.on('mouseover', function(){ this.alpha = 1; });
      settingsButton.graphics.on('mouseout', w_HoverOff);
      settingsButton.graphics.on('pointerdown', function(){
        app.stage.addChild(tintBg);
        app.stage.addChild(w_settingsContainer);
      });
      settingsButton.graphics.alpha = 0.80;
  settingsButton.draw(0xFFFFFF);
  app.stage.removeChild(settingsButton.container);
  w_menuContainer.addChild(settingsButton.container);
  
  const settingsIcon = new PIXI.Sprite.from("Images/settings.png");
        settingsIcon.width = 68;
        settingsIcon.height = 68;
        settingsIcon.position.x = 144;
        settingsIcon.position.y = 21;
  w_menuContainer.addChild(settingsIcon);



  var w = app.screen.width;
  var h = app.screen.height;

  

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
      w_hideButton.graphics.on('mouseover', function(){ w_hideButton.graphics.alpha = 1; });
      w_hideButton.graphics.on('mouseout', w_HoverOff);
      w_hideButton.graphics.on('pointerdown', function(){
        app.stage.removeChild(w_windowContainer);
        w_menuCC = 0;
        app.stage.removeChild(w_menuContainer);
        w_hideCC = 1;
      });
      w_hideButton.graphics.alpha = 0.80;
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
      window1.graphics.on('mouseover', w_windowHoverOver);
      window1.graphics.on('mouseout', w_windowHoverOff);
      window1.graphics.on('pointerdown', w_WindowSelect);
      window1.graphics.alpha = 0.80;
  window1.draw(0xFFFFFF);
  app.stage.removeChild(window1.container);

  window1Label = new PIXI.Text("Window\n     1", w_style);
  window1Label.position.x = window1.x - 26;
  window1Label.position.y = window1.y - 15;


  var window2 = new Hexagon({x:window1.x, y:window1.getCenterLowerRight(0).y}, 0, 37);
      window2.graphics.lineStyle(2, 0x7D7D7D, 3);
      window2.graphics.interactive = true;
      window2.graphics.on('mouseover', w_windowHoverOver);
      window2.graphics.on('mouseout', w_windowHoverOff);
      window2.graphics.on('pointerdown', w_WindowSelect);
      window2.graphics.alpha = 0.80;
  window2.draw(0xFFFFFF);
  app.stage.removeChild(window2.container);
  
  window2Label = new PIXI.Text("Window\n     2", w_style);
  window2Label.position.x = window2.x - 26;
  window2Label.position.y = window2.y - 15;



  var window3 = new Hexagon({x:window2.x, y:window2.getCenterLowerLeft(0).y}, 0, 37);
      window3.graphics.lineStyle(2, 0x7D7D7D, 3);
      window3.graphics.interactive = true;
      window3.graphics.on('mouseover', w_windowHoverOver);
      window3.graphics.on('mouseout', w_windowHoverOff);
      window3.graphics.on('pointerdown', w_WindowSelect);
      window3.graphics.alpha = 0.80;
  window3.draw(0xFFFFFF);
  app.stage.removeChild(window3.container);

  window3Label = new PIXI.Text("Window\n     3", w_style);
  window3Label.position.x = window3.x - 26;
  window3Label.position.y = window3.y - 15;



  var window4 = new Hexagon({x:window3.x, y:window3.getCenterLowerRight(0).y}, 0, 37);
      window4.graphics.lineStyle(2, 0x7D7D7D, 3);
      window4.graphics.interactive = true;
      window4.graphics.on('mouseover', w_windowHoverOver);
      window4.graphics.on('mouseout', w_windowHoverOff);
      window4.graphics.on('mousedown', w_WindowSelect);
      window4.graphics.alpha = 0.80;
      window4.graphics.i = 4;
  window4.draw(0xFFFFFF);
  app.stage.removeChild(window4.container);

  window4Label = new PIXI.Text("Window\n     4", w_style);
  window4Label.position.x = window4.x - 26;
  window4Label.position.y = window4.y - 15;


  // add window icons in reverse order for descending overlapping

  w_windowContainer.addChild(window4.container);
  w_windowContainer.addChild(window4Label);
  w_windowContainer.addChild(window3.container);
  w_windowContainer.addChild(window3Label);
  w_windowContainer.addChild(window2.container);
  w_windowContainer.addChild(window2Label);
  w_windowContainer.addChild(window1.container);
  w_windowContainer.addChild(window1Label);

  Acc = 1;
  app.stage.addChild(w_windowContainer);




  // Popup

  w_popupCC = 1;

  w = app.screen.width;
  h = app.screen.height;

  let windowHeader = new PIXI.Graphics();
      windowHeader.beginFill(0xdcdcdc);
      windowHeader.drawRoundedRect(w*0.25-3, 0, w*0.70+10, w*0.4+25, 5);
      windowHeader.endFill();
      windowHeader.buttonMode = true;
      windowHeader.interactive = true;
      // events for drag start
      windowHeader.on('mousedown', w_onDragStart);
      windowHeader.on('touchstart', w_onDragStart)
      // events for drag end
      windowHeader.on('mouseup', w_onDragEnd);
      windowHeader.on('mouseupoutside', w_onDragEnd);
      windowHeader.on('touchend', w_onDragEnd);
      windowHeader.on('touchendoutside', w_onDragEnd);
      // events for drag move
      windowHeader.on('mousemove', w_onDragMove);
      windowHeader.on('touchmove', w_onDragMove);
  w_Popup1Container.addChild(windowHeader);


  // let w_workWindow = new PIXI.Graphics();
  w_workWindow.beginFill(0x707070);
  w_workWindow.drawPolygon([3.5,0, w*0.7-2,0, w*0.7-2,w*0.4-2, 5,w*0.4-2]);
  w_workWindow.endFill();
  //w_workWindow.anchor.set(0.5);
  w_workWindow.position.x = w*0.25;
  w_workWindow.position.y = 20;
  w_Popup1Container.addChild(w_workWindow);




  let w1_menuLabel = new PIXI.Text("Window 1",{fontFamily: 'Arial', fontSize: 15, fontType: 'bold', fill: 0x000000});
      w1_menuLabel.position.x = w_workWindow.x + 10;
      w1_menuLabel.position.y = w_workWindow.y - 19;
  w_Popup1Container.addChild(w1_menuLabel);



  let w_activity1 = new PIXI.Graphics();
      w_activity1.lineStyle(4, 0xffffff, 3);
      w_activity1.beginFill(0xdcdcdc);
      w_activity1.drawRoundedRect(w/4-50,20, 50,50, 3);
      w_activity1.endFill();
      w_activity1.interactive = true;
      w_activity1.on('pointerdown', w_a1Select);
      w_activity1.alpha = 0.8;
  w_Popup1Container.addChild(w_activity1);

  const zoomIcon = new PIXI.Sprite.from("Images/magnifying-glass.png");
        zoomIcon.width = 35;
        zoomIcon.height = 35;
        zoomIcon.position.x = w/4-43;
        zoomIcon.position.y = 28;
  w_Popup1Container.addChild(zoomIcon);


  let w_activity2 = new PIXI.Graphics();
      w_activity2.lineStyle(4, 0xffffff, 3);
      w_activity2.beginFill(0xdcdcdc);
      w_activity2.drawRoundedRect(w/4-50,70, 50,50, 3);
      w_activity2.endFill();
      w_activity2.interactive = true;
      w_activity2.on('pointerdown', w_a2Select);
      w_activity2.alpha = 0.8;
  w_Popup1Container.addChild(w_activity2);

  const spectrumIcon = new PIXI.Sprite.from("Images/color-wheel.png");
        spectrumIcon.width = 35;
        spectrumIcon.height = 35;
        spectrumIcon.position.x = w/4-43;
        spectrumIcon.position.y = 78;
  w_Popup1Container.addChild(spectrumIcon);

  let w_activity3 = new PIXI.Graphics();
      w_activity3.lineStyle(4, 0xffffff, 3);
      w_activity3.beginFill(0xdcdcdc);
      w_activity3.drawRoundedRect(w/4-50,120, 50,50, 3);
      w_activity3.endFill();
      w_activity3.interactive = true;
      w_activity3.on('pointerdown', w_a3Select);
      w_activity3.alpha = 0.8;
  w_Popup1Container.addChild(w_activity3);

  /*
  let w_label3 = new PIXI.Text(" Grain\nBoundary",{fontFamily: 'Arial', fontSize: 13, fill: 0x000000});
      w_label3.position.x = w/4-63;
      w_label3.position.y = 175;
  w_Popup1Container.addChild(w_label3);
  */
  const multiblockIcon = new PIXI.Sprite.from("Images/multi-block-icon.png");
        multiblockIcon.width = 40;
        multiblockIcon.height = 40;
        multiblockIcon.position.x = w/4-46;
        multiblockIcon.position.y = 126;
  w_Popup1Container.addChild(multiblockIcon);



  let w_activity4 = new PIXI.Graphics();
      w_activity4.lineStyle(4, 0xffffff, 3);
      w_activity4.beginFill(0xdcdcdc);
      w_activity4.drawRoundedRect(w/4-50,170, 50,50, 3);
      w_activity4.endFill();
      w_activity4.interactive = true;
      w_activity4.on('pointerdown', w_a4Select);
      w_activity4.alpha = 0.8;
  w_Popup1Container.addChild(w_activity4);

  /*
  let w_label4 = new PIXI.Text(" Line\nIntegral",{fontFamily: 'Arial', fontSize: 13, fill: 0x000000});
      w_label4.position.x = w/4-60;
      w_label4.position.y = 245;
  w_Popup1Container.addChild(w_label4);
  */
  const lineintensityIcon = new PIXI.Sprite.from("Images/line-intensity.png");
        lineintensityIcon.width = 40;
        lineintensityIcon.height = 40;
        lineintensityIcon.position.x = w/4-44;
        lineintensityIcon.position.y = 175;
  w_Popup1Container.addChild(lineintensityIcon);

  w_Popup1Container.x = -20;
  w_Popup1Container.y = 20;
  //w_Popup1Container.scale.x = w_Popup1Container.scale.y = 1;

  app.stage.addChild(w_Popup1Container);







  // fade/darken background

  //var tintBg = new PIXI.Graphics();
  tintBg.beginFill(0x000000, 1); // Color and opacity
  tintBg.drawRect(0, 0, app.screen.width, app.screen.height);
  tintBg.endFill();
  tintBg.alpha = 0.7;



  // POPUP WINDOW 


  // close button

  var closeTexture = PIXI.Texture.from("Images/cancel_icon.png");
  var closeImage = new PIXI.Sprite(closeTexture);
  closeImage.height = 30;
  closeImage.width = 30;
  closeImage.x = w-(w/5) - 40; //w_settingsMenu right side - 10
  closeImage.y = 30;
  closeImage.buttonMode = true;
  closeImage.interactive = true;
  closeImage.on('mouseover', w_HoverOver);
  closeImage.on('mouseout', w_HoverOff);
  closeImage.on('pointerdown', w_disableSettings);
  closeImage.alpha = 0.85;
  w_settingsContainer.addChild(closeImage);


  blurTransform(app.stage, 0.5, 10);








  LSMI();
  LSMIContainer.scale.x = LSMIContainer.scale.y = 0.7;
  LSMIContainer.position.x = app.screen.width/4;
  LSMIContainer.position.y = 20;

  startSpectrum()
  MSContainer.scale.x = MSContainer.scale.y = 0.9;
  MSContainer.position.x = app.screen.width*0.25;
  MSContainer.position.y = -93;

  startMultiblock();
  MBContainer.scale.x = MBContainer.scale.y = 0.7;
  MBContainer.position.x = app.screen.width*0.25 - 5;
  MBContainer.position.y = 30;

  LISprite = new PIXI.Sprite.from("Images/LineIntensity.jpg");
  LISprite.width = w_workWindow.width;
  LISprite.height = w_workWindow.height;
  LISprite.x = app.screen.width*0.25 + 3;
  LISprite.y = 23;


}


function w_HoverOver(event)
{
  data = event.data;
  app.stage.addChild(w_titleContainer);
  this.alpha = 1;
}

function w_HoverOff(event)
{
  data = event.data;
  app.stage.removeChild(w_titleContainer);
  this.alpha = 0.80;
}

function w_disableSettings()
{
  app.stage.removeChild(tintBg);
  app.stage.removeChild(w_settingsContainer);
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

function w_windowHoverOver()
{
  this.alpha = 1;
  this.x = this.x + 10;

  let i = 1;
  if (i == 1) { window1Label.position.x = window1Label.position.x + 10; }
  else if (i == 2) { window2Label.position.x = window2Label.position.x + 10; }
  else if (i == 3) { window3Label.position.x = window3Label.position.x + 10; }
  else if (i == 4) { window4Label.position.x = window4Label.position.x + 10; }

}

function w_windowHoverOff()
{
  this.alpha = 0.80;
  this.x = this.x - 10;
  
  var i = 1;
  if (i == 1) { window1Label.position.x = window1Label.position.x - 10; }
  else if (i == 2) { window2Label.position.x = window2Label.position.x - 10; }
  else if (i == 3) { window3Label.position.x = window3Label.position.x - 10; }
  else if (i == 4) { window4Label.position.x = window4Label.position.x - 10; }
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
  w_Popup1Container.removeChild(LISprite);
}



function w_a1Select()
{
  w_clearWindow();
  w_Popup1Container.addChild(LSMIContainer);
  LSMIContainer.mask = w_workWindow;
}

function w_a2Select()
{
  w_clearWindow();
  w_Popup1Container.addChild(MSContainer);
  MSContainer.mask = w_workWindow;
}

function w_a3Select()
{
  w_clearWindow();
  w_Popup1Container.addChild(MBContainer);
  MBContainer.mask = w_workWindow;
}

function w_a4Select()
{
  w_clearWindow();
  w_Popup1Container.addChild(LISprite);
  LISprite.mask = w_workWindow;
}

/*
function w_animate()
{
  requestAnimationFrame(w_animate);
  renderer.render(app.stage); // render the stage
}
*/

function w_onDragStart(event)
{
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function w_onDragEnd()
{
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function w_onDragMove()
{
  if (this.dragging)
  {
    var newPosition = this.data.getLocalPosition(this.parent);
    this.parent.x = newPosition.x;
    this.parent.y = newPosition.y;
  }
}

