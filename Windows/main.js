function startWindows(){

  // background image/color

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: false,
    resolution: devicePixelRatio,
    autoResize: true,
    backgroundColor: 0xC9D5DA
  });
  document.body.appendChild(app.view);


  // Buttons for each activity

  var buttonContainer = new PIXI.Container();

  var lowmag_btn = new RectButton(80, 100, 40, 315, 'Eddie Low Magnification Imaging', "LowMag.jpg");
  var multispec_btn = new RectButton(80, 170, 40, 315, 'Desai Multispectrum Interface', "Multispectrum.jpg");
  var multiblock_btn = new RectButton(80, 240, 40, 315, 'Jack Multi-Block Analysis', "Multiblock.jpg");
  var lineintegral_btn = new RectButton(80, 310, 40, 315, 'Travis Line-Integral Analysis', "LineIntegral.jpg");

  app.stage.addChild(buttonContainer);


  //Modal (popup window)

  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
}

function RectButton(x_position, y_position, height, width, text, source){

  //instantiate PIXI JS Graphics library
  var graphics = new PIXI.Graphics();

  graphics.beginFill(0xFFFFFF, 1); // Color and opacity
  graphics.lineStyle(2, 0x414141, 1);
  graphics.drawRect(x_position, y_position, width, height);
  graphics.endFill();
  graphics.interactive = true;
  graphics.on('mouseover', onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
  .on('mouseout', onHoverOff)
  .on('pointerdown', onSelect);
  graphics.alpha = 0.7;
  graphics.source = source;

  buttonContainer.addChild(graphics);

  const label = new PIXI.Text(text, {fontFamily: "Georgia", fontSize: 18, fill: 0x2F4F4F});
  label.position.x = x_position + 18;
  label.position.y = y_position + 10;
  buttonContainer.addChild(label);
}

function onHoverOver(event){
  this.data = event.data;
  this.alpha = 1;
}

function onHoverOff(event){
  this.data = event.data;
  this.alpha = 0.5;
}

function onSelect(event) {
  this.data = event.data;
  modal.style.display = "block";
  modalImg.src = this.source;
}

span.onclick = function() { 
  modal.style.display = "none";
}