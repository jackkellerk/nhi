
var clickcounter; // image menu click counter
var settingsCC; // settings menu
var saveCC;
var micCC;

var showTitle; // title disappears after first interaction

var w_titleContainer = new PIXI.Container(); // title container
var w_microscopeContainer = new PIXI.Container(); // miscroscope collection
var w_menuContainer = new PIXI.Container(); // for image selection
var w_settingsContainer = new PIXI.Container(); // for settings menu
var w_PopupContainer = new PIXI.Container(); // for popup window

// PIXI Text style
var w_style = {fontFamily: 'Helvetica', fontSize: 15, fill: 0xffffff};


function startWindows(){

  
  // background from gradient texture

  const gradTexture = createGradTexture();

  const sprite = new PIXI.Sprite(gradTexture);
  sprite.width = window.innerWidth;
  sprite.height = window.innerHeight;
  app.stage.addChild(sprite);



  // decorative hexagons

  var y = -8;
  for(var i=0; i<4; i++)
  {
    var deco_hex2 = new drawHexOutline(1.5, y+16, 4);
    var deco_hex1 = new drawHexOutline(11, y, 4);
    y = y+32;
  }


  
  // page title text

  const titleStyle = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
  const title = new PIXI.Text('Select an image to begin', titleStyle);
  title.position.x = window.innerWidth/3;
  title.position.y = 50;
  w_titleContainer.addChild(title);

  const subtitleStyle = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 24, letterSpacing: 3});
  const subtitle = new PIXI.Text('by clicking the microscope icon', subtitleStyle);
  subtitle.position.x = window.innerWidth/3 +40;
  subtitle.position.y = 92;
  w_titleContainer.addChild(subtitle);

  app.stage.addChild(w_titleContainer);



  // save button
  var saveButton = new makeHex(20, 8, 4, "transparent.png", 3);
  const saveIcon = new PIXI.Sprite.fromImage("Images/save-icon.png");
    saveIcon.width = 46;
    saveIcon.height = 46;
    saveIcon.position.x = 57;
    saveIcon.position.y = 49;
  app.stage.addChild(saveIcon);
  //var saveInfo = new drawInfoBox(25, 13, 10, "Save & Exit");


  // settings button
  var settingsButton = new makeSettingsHex(38.5, 8, 4);

  var settingsInfo = new drawInfoBox(155, 90, 4, "Project Settings");


  // Microscope Menu

  var micMenuHex = new makeHex(20, 40, 4, "Images/microscope.png", 1);



  // Image Menu (Container)

  var lowmag_btn = new makeImageHex(30, 56, 4, "Images/LowMag.jpg", "Low Mag\n Imaging");
  var multispec_btn = new makeImageHex(20.5, 72, 4, "Images/Multispectrum.jpg", "   Multi\nspectrum");
  var multiblock_btn = new makeImageHex(30, 88, 4, "Images/Multiblock.jpg", "   Multi\n   block");
  var lineintegral_btn = new makeImageHex(20.5, 104, 4, "Images/LineIntegral.jpg", "    Line\n Integral");




  


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


