
// popup

var PopupContainer = new PIXI.Container();



//TEXT

var style = {fontFamily: 'Georgia', fontSize: 22, fill: 0x990902};





function startWindows(){

  
  // background

  var texture = PIXI.Texture.fromImage('ImagessinteredMetal.png', true);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  bgSprite = new PIXI.Sprite(texture);
  app.stage.addChild(bgSprite);



  // Buttons for each activity

  var lowmag_btn = new RectButton(80, 100, 40, 330, "Images/LowMag.jpg");
  let label1 = new PIXI.Text('Eddie Low Mag Imaging', style);
  label1.position.x = 98;
  label1.position.y = 108;
  bgSprite.addChild(label1);

  var multispec_btn = new RectButton(80, 170, 40, 330, "Images/Multispectrum.jpg");
  let label2 = new PIXI.Text('Desai Multispectrum Interface', style);
  label2.position.x = 98;
  label2.position.y = 178;
  bgSprite.addChild(label2);

  var multiblock_btn = new RectButton(80, 240, 40, 330, "Images/Multiblock.jpg");
  let label3 = new PIXI.Text('Jack Multi-Block Analysis', style);
  label3.position.x = 98;
  label3.position.y = 248;
  bgSprite.addChild(label3);

  var lineintegral_btn = new RectButton(80, 310, 40, 330, "Images/LineIntegral.jpg");
  let label4 = new PIXI.Text('Travis Line-Integral Analysis', style);
  label4.position.x = 98;
  label4.position.y = 318;
  bgSprite.addChild(label4);

  


  var bg = new PIXI.Graphics();
  bg.beginFill(0x000000, 1); // Color and opacity
  bg.drawRect(0, 0, app.screen.width, app.screen.height);
  bg.endFill();
  bg.alpha = 0.7;

  PopupContainer.addChild(bg);



  var closeTexture = PIXI.Texture.fromImage("Images/cancel_icon.png");
  var closeImage = new PIXI.Sprite(closeTexture);
    closeImage.height = 30;
    closeImage.width = 30;
    closeImage.x = app.screen.width - 50;
    closeImage.y = 30;
    closeImage.buttonMode = true;
    closeImage.interactive = true;
    closeImage.on('mouseover', hoverCloseButton);
    closeImage.on('mouseout', hoverCloseButtonOff);
    closeImage.on('mousedown', disablePopup);
    closeImage.alpha = 0.5;
  PopupContainer.addChild(closeImage);

    
}



function enablePopup(event) {

  bgSprite.addChild(PopupContainer);

}


function hoverCloseButton(event) {
  this.alpha = 1;
}

function hoverCloseButtonOff(event) {
  this.alpha = 0.5;
}

function disablePopup(event) {
  bgSprite.removeChild(PopupContainer);
}

