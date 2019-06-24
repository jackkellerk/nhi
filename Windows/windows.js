
var menuCC; // main menu
var clickcounter; // image menu click counter
var settingsCC; // settings menu
var saveCC;

var showTitle; // title disappears after first interaction

var images = ["Images/LowMag.jpg", "Images/Multispectrum.jpg", "Images/Multiblock.jpg", "Images/LineIntegral.jpg"]; // array with images sources.. for now

var w_hexGridContainer = new PIXI.Container(); 
var w_titleContainer = new PIXI.Container(); // title container
var w_menuContainer = new PIXI.Container(); // menu container
var w_imageContainer = new PIXI.Container(); // for image selection
var w_settingsContainer = new PIXI.Container(); // for settings menu
var w_PopupContainer = new PIXI.Container(); // for popup window

// PIXI Text style
var w_style = {fontFamily: 'Helvetica', fontSize: 15, fill: 0xffffff};


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





  // menu button

  let myHex = new Hexagon({x: 300, y: 100}, null, 20);
  myHex.graphics.interactive = true;
  myHex.draw(0xFFFFFF);

/*

  let h = app.screen.height; // window height
  let rad = h * 0.7 / 3.5; // radius
  let hexWidth = rad / 2 * Math.sqrt(3);
  let center0 = {x: 0.3 * h + hexWidth, y: 0.2 * h + rad};
  let HexList = [];
  for (let i = 0; i < 3; i++) {
    HexList.push(new Hexagon(center0, null, rad));
    HexList[i * 2].draw(Hexagon.getHexColor("white"));
    HexList.push(new Hexagon(HexList[i*2].getCenterLowerRight(0.005 * h), null, rad));
    HexList[i * 2 + 1].draw(Hexagon.getHexColor("white"));
    center0 = HexList[i * 2].getCenterRight(0.005 * h);
  }


  var menuButton = new makeTaskHex(36.8, 8, "menu");
  const menuIcon = new PIXI.Sprite.fromImage("Images/menu.png");
    menuIcon.width = 44;
    menuIcon.height = 37;
    menuIcon.position.x = 15;
    menuIcon.position.y = 31;
  app.stage.addChild(menuIcon);




  // save button

  var saveButton = new makeTaskHex(110.8, 8, "save");
  const saveIcon = new PIXI.Sprite.fromImage("Images/save-icon.png");
    saveIcon.width = 46;
    saveIcon.height = 46;
    saveIcon.position.x = 88;
    saveIcon.position.y = 23;
  w_menuContainer.addChildAt(saveIcon, w_menuContainer.children.length-2);


  // settings button
  var settingsButton = new makeTaskHex(184.8, 8, "settings");
  const settingsIcon = new PIXI.Sprite.fromImage("Images/settings.png");
    settingsIcon.width = 80;
    settingsIcon.height = 80;
    settingsIcon.position.x = 145;
    settingsIcon.position.y = 8;
  w_menuContainer.addChildAt(settingsIcon, w_menuContainer.children.length-2);

  

  // Hide Menu Option

  var HideButton = new makeTaskHex(258.8, 8, "Hide Menu");
  let label1 = new PIXI.Text("Hide\nMenu", w_style);
    label1.position.x = 260;
    label1.position.y = 18;
  w_menuContainer.addChild(label1);

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



  // Image Menu (Container)

  var images = ["Images/LowMag.jpg", "Images/Multispectrum.jpg", "Images/Multiblock.jpg", "Images/LineIntegral.jpg"];

  var lowmag_btn = new makeTaskHex(36.8, 136, "image1");
  let label5 = new PIXI.Text("Low Mag\nImaging", w_style);
    label5.position.x = 9;
    label5.position.y = 156;
  w_imageContainer.addChild(label5);
  var multispec_btn = new makeTaskHex(74, 200, "image2");
  let label2 = new PIXI.Text("   Multi\nspectrum", w_style);
    label2.position.x = 44;
    label2.position.y = 220;
  w_imageContainer.addChild(label2);
  var multiblock_btn = new makeTaskHex(36.8, 264, "image3");
  let label3 = new PIXI.Text("Multi\nblock", w_style);
    label3.position.x = 18;
    label3.position.y = 284;
  w_imageContainer.addChild(label3);
  var lineintegral_btn = new makeTaskHex(74, 328, "image4");
  let label4 = new PIXI.Text("  Line\nIntegral", w_style);
    label4.position.x = 47;
    label4.position.y = 346;
  w_imageContainer.addChild(label4);

  app.stage.addChild(w_imageContainer);

  


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

*/
}


