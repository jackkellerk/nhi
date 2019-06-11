  
  //MODAL (popup window)

  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];


  //TEXT

  var style = {fontFamily: 'Georgia', fontSize: 22, fill: 0xD40902};



function startWindows(){

  // background

  var bgSprite = new PIXI.Sprite.fromImage('Images/sinteredMetal.png', true);
  app.stage.addChild(bgSprite);



  // Buttons for each activity

  var lowmag_btn = new RectButton(80, 100, 40, 330, 'Eddie Low Magnification Imaging', "Images/LowMag.jpg");
  let label1 = new PIXI.Text('Eddie Low Mag Imaging', style);
  label1.position.x = 98;
  label1.position.y = 108;
  bgSprite.addChild(label1);

  var multispec_btn = new RectButton(80, 170, 40, 330, 'Desai Multispectrum Interface', "Images/Multispectrum.jpg");
  let label2 = new PIXI.Text('Desai Multispectrum Interface', style);
  label2.position.x = 98;
  label2.position.y = 178;
  bgSprite.addChild(label2);

  var multiblock_btn = new RectButton(80, 240, 40, 330, 'Jack Multi-Block Analysis', "Images/Multiblock.jpg");
  let label3 = new PIXI.Text('Jack Multi-Block Analysi', style);
  label3.position.x = 98;
  label3.position.y = 248;
  bgSprite.addChild(label3);

  var lineintegral_btn = new RectButton(80, 310, 40, 330, 'Travis Line-Integral Analysis', "Images/LineIntegral.jpg");
  let label4 = new PIXI.Text('Travis Line-Integral Analysis', style);
  label4.position.x = 98;
  label4.position.y = 318;
  bgSprite.addChild(label4);

}

function RectButton(x_position, y_position, height, width, text, source){

  //instantiate PIXI JS Graphics library
  var graphics = new PIXI.Graphics();

  graphics.beginFill(0xFFFFFF, 1); // Color and opacity
  graphics.lineStyle(2, 0x2F4F4F/*0x414141*/, 1);
  graphics.drawRect(x_position, y_position, width, height);
  graphics.endFill();
  graphics.interactive = true;
  graphics.buttonMode = true;
  graphics.on('mouseover', onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
  .on('mouseout', onHoverOff)
  .on('pointerdown', onSelect);
  graphics.alpha = 0.5;
  graphics.source = source;

  //bgSprite.addChild(graphics);

}

function onHoverOver(event)
{
  this.data = event.data;
  this.alpha = 0.7;
}

function onHoverOff(event)
{
  this.data = event.data;
  this.alpha = 0.3;
}

function onSelect(event)
{
  this.data = event.data;
  modal.style.display = "block";
  modalImg.src = this.source;
}

span.onclick = function()
{ 
  modal.style.display = "none";
}