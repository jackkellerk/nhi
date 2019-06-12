
// for popup window
var w_PopupContainer = new PIXI.Container();

// PIXI Text style
var w_style = {fontFamily: 'Georgia', fontSize: 22, fill: 0x990902};


function startWindows(){

  
  // background

  var texture = PIXI.Texture.fromImage('Images/sinteredMetal.png', true);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  bgSprite = new PIXI.Sprite(texture);
  app.stage.addChild(bgSprite);



  // Buttons for each activity

  var lowmag_btn = new makeRectButton(80, 100, 40, 330, "Images/LowMag.jpg");
  let label1 = new PIXI.Text('Eddie Low Mag Imaging', w_style);
  label1.position.x = 98;
  label1.position.y = 108;
  bgSprite.addChild(label1);

  var multispec_btn = new makeRectButton(80, 170, 40, 330, "Images/Multispectrum.jpg");
  let label2 = new PIXI.Text('Desai Multispectrum Interface', w_style);
  label2.position.x = 98;
  label2.position.y = 178;
  bgSprite.addChild(label2);

  var multiblock_btn = new makeRectButton(80, 240, 40, 330, "Images/Multiblock.jpg");
  let label3 = new PIXI.Text('Jack Multi-Block Analysis', w_style);
  label3.position.x = 98;
  label3.position.y = 248;
  bgSprite.addChild(label3);

  var lineintegral_btn = new makeRectButton(80, 310, 40, 330, "Images/LineIntegral.jpg");
  let label4 = new PIXI.Text('Travis Line-Integral Analysis', w_style);
  label4.position.x = 98;
  label4.position.y = 318;
  bgSprite.addChild(label4);

  


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


function w_hoverCloseButton(event) {
  this.alpha = 1;
}

function w_hoverCloseButtonOff(event) {
  this.alpha = 0.5;
}

function w_disablePopup(event) {
  bgSprite.removeChild(w_PopupContainer);
}

