// for image selection container
var w_menuContainer = new PIXI.Container();

// title container
var w_titleContainer = new PIXI.Container();


// for popup window
var w_PopupContainer = new PIXI.Container();

// PIXI Text style
var w_style = {fontFamily: 'Helvetica', fontSize: 22, fill: 0xffffff};


function startWindows(){

  
  // background from gradient texture

  const gradTexture = createGradTexture();

  const sprite = new PIXI.Sprite(gradTexture);
  sprite.width = window.innerWidth;
  sprite.height = window.innerHeight;
  app.stage.addChild(sprite);

  
  // page title text

  const titleStyle = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 32, letterSpacing: 3});
  const title = new PIXI.Text('Select an image to begin', titleStyle);
  title.position.x = 50;
  title.position.y = 50;
  w_titleContainer.addChild(title);

  const subtitleStyle = new PIXI.TextStyle({fill: "#d3d3d3", fontFamily: "Helvetica", fontSize: 24, letterSpacing: 3});
  const subtitle = new PIXI.Text('by clicking the image icon', subtitleStyle);
  subtitle.position.x = 105;
  subtitle.position.y = 92;
  w_titleContainer.addChild(subtitle);

  app.stage.addChild(w_titleContainer);




  // Image Menu (Container)
/*
  const menuGraphics = new PIXI.Graphics();
    menuGraphics.beginFill(0xFFFFFF, 1.5); // Color and opacity
    menuraphics.lineStyle(2, 0x414141, 2);
    menuGraphics.drawRoundedRect(0, 10, 320, 200, 2);
    menuGraphics.endFill();
    menuGraphics.alpha = 0.05;
  w_imageMenuContainer.addChild(menuGraphics);
*/

  var img_btn = new makeMenuButton(10, 0.3*window.innerHeight-26, 55, 55);

  const imgIcon = new PIXI.Sprite.fromImage("Images/picture-icon.png");
  imgIcon.width = 50;
  imgIcon.height = 50;
  imgIcon.position.x = 11;
  imgIcon.position.y = 0.3*window.innerHeight-24;
  app.stage.addChild(imgIcon);

  


  var lowmag_btn = new makeRectButton(0, 0.3*window.innerHeight, 40, 250, "Images/LowMag.jpg");
  let label1 = new PIXI.Text('Low Mag Imaging', w_style);
  label1.position.x = 10;
  label1.position.y = 0.3*window.innerHeight + 7;
  w_menuContainer.addChild(label1);

  var multispec_btn = new makeRectButton(0, 0.3*window.innerHeight +70, 40, 250, "Images/Multispectrum.jpg");
  let label2 = new PIXI.Text('Multispectrum Interface', w_style);
  label2.position.x = 10;
  label2.position.y = 0.3*window.innerHeight +77;
  w_menuContainer.addChild(label2);

  var multiblock_btn = new makeRectButton(0, 0.3*window.innerHeight +140, 40, 250, "Images/Multiblock.jpg");
  let label3 = new PIXI.Text('Multi-Block Analysis', w_style);
  label3.position.x = 10;
  label3.position.y = 0.3*window.innerHeight +147;
  w_menuContainer.addChild(label3);

  var lineintegral_btn = new makeRectButton(0, 0.3*window.innerHeight + 210, 40, 250, "Images/LineIntegral.jpg");
  let label4 = new PIXI.Text('Line-Integral Analysis', w_style);
  label4.position.x = 10;
  label4.position.y = 0.3*window.innerHeight +217;
  w_menuContainer.addChild(label4);

  //app.stage.addChild(w_menuContainer);



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

function createGradTexture() {
  // adjust it if somehow you need better quality for very very big images
  const quality = 256;
  const canvas = document.createElement('canvas');
  canvas.width = quality;
  canvas.height = 1;

  const ctx = canvas.getContext('2d');

  // use canvas2d API to create gradient
  const grd = ctx.createLinearGradient(0, 0, quality, 0);
  grd.addColorStop(0, 'rgba(0, 0, 0, 1)');
  grd.addColorStop(1, 'rgba(47, 79, 79, 1)');

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, quality, 1);

  return PIXI.Texture.from(canvas);
}


function w_hoverCloseButton(event) {
  this.alpha = 1;
}

function w_hoverCloseButtonOff(event) {
  this.alpha = 0.5;
}

function w_disablePopup(event) {
  app.stage.removeChild(w_PopupContainer);
}

